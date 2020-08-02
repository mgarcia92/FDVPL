using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAsesores.Models;
using WebAsesores.Models.EntityFramework;
using WebAsesores.Models.Repository;
using System.Configuration;
using System.Dynamic;
using WebAsesores.Models.WebApiModels;
using System.Data.SqlClient;
using System.Data;

namespace WebAsesores.Controllers
{
    public class DataGenerateApiController : ApiController
    {

        GenericRepository<FDV_Entities> db = new GenericRepository<FDV_Entities>();
        string ConnectionString = ConfigurationManager.AppSettings["ConnectionString"].ToString();
        string userSap = ConfigurationManager.AppSettings["userSap"].ToString();
        string passwordSap = ConfigurationManager.AppSettings["passwordSap"].ToString();
        com.plumrose.veccspra01.serverOpsRep client = new com.plumrose.veccspra01.serverOpsRep();
        com.plumrose.veccspra01Export.ExportXMLRep clientExport = new com.plumrose.veccspra01Export.ExportXMLRep();


        [HttpPost]
        public ResponseResult GenerateData([FromBody] GenerateRouteModel route)
        {
            try
            {
                List<object> response = new List<object>();
                /*Pasa los datos de REP a Server para garantizar*/
               // bool generalUpload = true;// GeneralUpload();
                object data;
                
                foreach (string rot in route.rotCode)
                {
                    dynamic res = new ExpandoObject();

                    res.statusRoute = getStatusRoute(rot);

                    if (res.statusRoute < 0)
                    {
                        res.message = $"No hay datos para la ruta {rot}";
                        continue;
                    }

                    res.rotCode = rot;
                    /*Borra la Ruta*/
                    res.ClearRoute = ClearRoute(rot);
                    /*Genera JOURNEY nuevo*/
                    if (!res.ClearRoute)
                    {
                        res.message = $"Error Limpiando la ruta => {rot}";
                        continue;
                    }
                    res.General = ExecuteGeneral(rot);
                    if (!res.General)
                    {
                        res.message = $"Error Generando General ruta => {rot}";
                        continue;
                    }
                    // /*Genera datos de Preventista*/
                    res.GeneralDownload = GeneralDownload(rot);
                    if (!res.GeneralDownload)
                    {
                        res.message = $"Error Generando Preventista ruta => {rot}";
                        continue;
                    }

                    if (res.General && res.ClearRoute && res.GeneralDownload)
                    {
                        res.message = $"Datos Generados Correctamente para ruta => {rot}";
                    }
                    else
                    {
                        res.message = $"Error Generando Datos para la ruta => {rot}";
                    }

                    response.Add(new { rotCode = rot, clearRoute = res.ClearRoute ? "OK!" : "FALLO", general = res.General ? "OK!" : "FALLO", GeneralDownload = res.GeneralDownload ? "OK!" : "FALLO" ,  res.message});
                }

                 data = new { responseRoutes = response };
                return ResponseResult.GetResponse("", TypeResult.success, data);
                
            }
            catch (Exception ex)
            {
                return ResponseResult.GetResponse(ex.Message, TypeResult.error, new { });
            }
        }
        [HttpGet]
        [Route("api/DataGenerateApi/GenerateMasterData")]
        public ResponseResult GenerateMasterData()
        {
            try
            {
                object response = null;
                //GENERAR DATOS MAESTROS
                if (MasterData())
                {
                    response = new { masterData = true, message = "Datos maestros generados con Exito" };
                    return ResponseResult.GetResponse("Datos maestros generados con Exito", TypeResult.success, response);

                }
                else
                {
                    response = new { masterData = false, message = "Error generando data maestra" };
                    return ResponseResult.GetResponse("Error generando data maestra", TypeResult.error, response);
                }

            }
            catch (Exception ex)
            {
                return ResponseResult.GetResponse(ex.Message, TypeResult.error, new { });
            }
        }
        [HttpGet]
        [Route("api/DataGenerateApi/UploadData")]
        public ResponseResult UploadData()
        {
            try
            {
                object response = null;
                //SUBIR DATOS A REP
                if (GeneralUpload())
                {
                    response = new { upload = true, message = "Datos Subidos correctamente" };
                    return ResponseResult.GetResponse("Datos transferidos a REP con Exito", TypeResult.success, response);

                }
                else
                {
                    response = new { upload = false, message = "Error subiendo datos" };
                    return ResponseResult.GetResponse("Error Transfiriendo datos a REP", TypeResult.error, response);
                }

            }
            catch (Exception ex)
            {
                return ResponseResult.GetResponse(ex.Message, TypeResult.error, new { });
            }
        }

        [HttpGet]
        [Route("api/DataGenerateApi/getListRoutes")]
        public ResponseResult getListRoutes()
        {
            try
            {
                List<object> data = new List<object>();
                com.plumrose.cgsapdb1.service client = new com.plumrose.cgsapdb1.service();
                NetworkCredential credentials = new NetworkCredential(userSap, passwordSap);
                client.Credentials = credentials;

                com.plumrose.cgsapdb1.Z_WEB_LIST_ASESORES_01 list = new com.plumrose.cgsapdb1.Z_WEB_LIST_ASESORES_01()
                {
                    I_USER_WEB = "FDV_COMBOASESOR",
                    RVKBUR = new com.plumrose.cgsapdb1.RANGE_C10[] { new com.plumrose.cgsapdb1.RANGE_C10 { SIGN = "I", OPTION = "BT", LOW = "0001", HIGH = "1210" } },
                    RPERSG = new com.plumrose.cgsapdb1.CCHRS_PERSG_RANGE[] { new com.plumrose.cgsapdb1.CCHRS_PERSG_RANGE() { SIGN = "I", OPTION = "BT", LOW = "1", HIGH = "8" } },
                    RPERSK = new com.plumrose.cgsapdb1.CCHRS_PERSK_RANGE[] { new com.plumrose.cgsapdb1.CCHRS_PERSK_RANGE() { SIGN = "I", OPTION = "BT", LOW = "AZ", HIGH = "EM" } }
                };


                com.plumrose.cgsapdb1.Z_WEB_LIST_ASESORES_01Response response = client.Z_WEB_LIST_ASESORES_01(list);


                var query = (from d in response.T_LISTDATOS
                            // let general = db.model.general.Where(x => x.rotCode == d.CODIGO).FirstOrDefault()                           
                             select new { codigo = d.CODIGO, sname = d.SNAME, vkbuR_T = d.VKBUR_T, gnlStatus = "", gnlStatusDate = "" , gnlDate = "", gnlPartialStatus = "", gnlPartialStatusDate = ""}).ToList();


                List<dynamic> dataFinal = new List<dynamic>();
                List<GeneralJourney> generalData = db.model.Database.SqlQuery<GeneralJourney>(@"select 
                                                                                                g.rotCode,
                                                                                                g.gnlStatus,
                                                                                                (select jrtStatusDate from journeytrace j
                                                                                                where j.rotcode = g.rotcode
                                                                                                and j.jrncode = g.jrncode and j.jrtStatus = 10) jrtStatusDate,
                                                                                                g.gnlDate,
                                                                                                g.gnlPartialStatus,
                                                                                                g.gnlPartialStatusDate
                                                                                                 from general g
                                                                                                 ").ToList();
                                                                                                                
                foreach (var item in query)
                {
                    dynamic obj = new ExpandoObject();
                    var general = (from g in generalData
                                   where g.rotCode == item.codigo
                                   select g).FirstOrDefault();
                    //si no consigue se salta la ejecucion para solo tener rutas activas.
                    if(general == null)
                    {
                        continue;
                    }
                        
                    // db.model.general.Where(x => x.rotCode == item.codigo).FirstOrDefault();
                    //if(general != null)
                    //{
                    //    DateTime? d = db.model.journeyTrace.Where(x => x.jrnCode == general.jrnCode && x.jrtStatus == 10)
                    //                                      .Select(x => x.jrtStatusDate).FirstOrDefault();
                    //    date = d.ToString();
                    //}
                   
                    obj.codigo = item.codigo;
                    obj.sname = item.sname;
                    obj.vkbuR_T = item.vkbuR_T;
                    obj.gnlStatus = general != null ? general.gnlStatus.ToString() : "<i class='ban icon'></i>";
                    obj.gnlStatusDate = general != null ? general.jrtStatusDate.ToString() : "";
                    obj.gnlDate = general != null ? general.gnlDate.ToString() : "";
                    obj.gnlPartialStatus = general == null ? "" : general.gnlPartialStatus != null ? "<i class='bell icon'></i>" : "<i class='bell slash icon'></i>";
                    obj.gnlPartialStatusDate = general != null ? general.gnlPartialStatusDate.ToString() : "";
                    dataFinal.Add(obj);
                }


                return ResponseResult.GetResponse("", TypeResult.success, dataFinal);

            }
            catch (Exception ex)
            {
                return ResponseResult.GetResponse($"error: SAP WEB SERVICE METHOD => Z_WEB_LIST_ASESORES_01 exeption :{ex.Message}", TypeResult.error, new object[] { new { codigo = "", sname = "", vkbuR_T = "", gnlStatus = "", gnlDate = "", gnlPartialStatus = "", gnlPartialStatusDate = "" } });
            }
        }

        private int getStatusRoute(string rotCode)
        {
            try
            {
                com.plumrose.veccspra01Export.StatusRoute[] response = clientExport.StatusRoute(ConnectionString,rotCode,"","");
                if(response.Length > 0)
                {
                    return response[0].status.Value;
                }
                else
                {
                    return -1;
                }
            }
            catch (Exception)
            {

                throw;
            }
        }
       
        private bool GeneralUpload()
        {
            try
            {
                object[] response = client.ExecRepUploadGeneral(ConnectionString);
                //int count = db.model.XSR_ITF_GeneralUpload();
                return Convert.ToBoolean(response[0]);      
            }
            catch (Exception)
            {
                throw;          
            }

        }

        private bool GeneralDownload(string rotCode)
        {
            try
            {
                object[] response = client.ExecRepDownloadGeneral(ConnectionString,rotCode,"");
                //int count = db.model.XSR_ITF_GeneralDownload(rotCode,string.Empty,true);
                return Convert.ToBoolean(response[0]);
            }
            catch (Exception)
            {
                throw;
            }
        }

        private bool ClearRoute(string rotCode)
        {
            try
            {
                int result = 1;
                SqlParameter[] parameters = new SqlParameter[] {
                             new SqlParameter("@rotCode", rotCode),
                             new SqlParameter("@return_value", SqlDbType.Int, 4) {Direction = ParameterDirection.ReturnValue }
                        };
                string count = db.model.Database.SqlQuery<string>(@"declare @return_value int
                                                                    exec @return_value = cnt.XSR_ITF_ClearRoute @rotCode", parameters).SingleOrDefault();
                            
                if(Convert.ToInt16(parameters[1].Value) == 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        private bool MasterData()
        {
            try
            {
               object[] response =  client.ExecMasterData(ConnectionString);
             
                //  int count = db.model.XSR_ITF_MasterData(null);
                return Convert.ToBoolean(response[0]);
            }
            catch (Exception)
            {
                throw;
            }
        }

        private bool ExecuteGeneral(string rotCode)
        {
            try
            {
               
                //string connectionString = "RGF0YSBTb3VyY2U9MTAuMTEuMTIuMjlcWFNBTEVTX1BSTzQ0X1M7SW5pdGlhbCBDYXRhbG9nPVhTYWxlc19TZXJ2ZXJfUGx1bXJvc2VfUFJPNDRfUztVc2VyIElkPXhzYWxlcztQYXNzd29yZD1Nb2JpbGUuMjAxNjs=";
                int day = Convert.ToInt16(DateTime.Now.ToString("dd"));
                int month = Convert.ToInt16(DateTime.Now.ToString("MM"));
                int year = Convert.ToInt16(DateTime.Now.ToString("yyyy"));
                object[] response = client.ExecRepGeneral(ConnectionString, rotCode, day,month,year,1,"","","");
                if (response.Length > 0)
                    return Convert.ToBoolean(response[0]);
                else
                   return false;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
