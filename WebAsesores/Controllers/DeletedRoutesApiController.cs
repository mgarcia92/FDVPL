using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAsesores.Models;
using WebAsesores.Models.EntityFramework;
using WebAsesores.Models.Repository;
using WebAsesores.Models.WebApiModels;

namespace WebAsesores.Controllers
{
    public class DeletedRoutesApiController : ApiController
    {

        GenericRepository<FDV_Entities> db = new GenericRepository<FDV_Entities>();
        [HttpGet]
        public ResponseResult getListDeletedRoutes()
        {

            try
            {
                List<object> data = new List<object>();

                string statusFalse = $"<div class='ui toggle checkbox deleted-route'><input type = 'checkbox' name ='public'><label></label></div>";
                string statusTrue = $"<div class='ui toggle checkbox checked deleted-route'><input type = 'checkbox' checked name ='public'><label></label></div>";
                var rutas = (from r in db.model.route
                             where r.C_deleted == true
                             select new { rotCode = r.rotCode, rotName = r.rotName, C_deleted = r.C_deleted == true ? statusTrue : statusFalse }).ToList();

                var login = (from r in db.model.login
                             where r.C_deleted == true && r.lgnOnlyServer  == false
                             select new { rotCode = r.lgnCode, rotName = r.lgnName, C_deleted = r.C_deleted == true ? statusTrue : statusFalse }).ToList();

                foreach (var ruta in rutas)
                {
                    data.Add(ruta);
                }

                foreach (var item in login)
                {
                    if (rutas.Where(x => x.rotCode.Trim() == item.rotCode.Trim()).ToList().Count <= 0)
                    {
                        data.Add(item);
                    }
                }

                return ResponseResult.GetResponse(string.Empty, TypeResult.success, data);

            }
            catch (Exception ex)
            {
                return ResponseResult.GetResponse(ex.Message, TypeResult.success, new object[0]);

            }
        }

        [HttpPost]
        public ResponseResult updateRouteDeleted([FromBody] UpdateRouteDeleted model)
        {
            try
            {
                string message = string.Empty;
                route route = db.model.route.Where(x => x.rotCode == model.rotCode).FirstOrDefault();
                if (route != null)
                {
                    route.C_deleted = Convert.ToBoolean(model.deleted);
                    db.model.Database.ExecuteSqlCommand($"UPDATE ROUTE SET _DELETED = '{route.C_deleted}' WHERE ROTCODE = '{route.rotCode}'");
                    message = $"Actualizado en Route";
                }
                login login = db.model.login.Where(x => x.lgnCode == model.rotCode).FirstOrDefault();
                if (login != null)
                {
                    login.C_deleted = Convert.ToBoolean(model.deleted);
                    db.model.Database.ExecuteSqlCommand($"UPDATE login SET _DELETED = '{login.C_deleted}' WHERE LGNCODE = '{login.lgnCode}'");
                    message = $"{message} / Actualizado en Login";
                }

                return ResponseResult.GetResponse(message == string.Empty ? "Ruta Activa" : message, TypeResult.success, new { });
            }
            catch (Exception ex)
            {
                return ResponseResult.GetResponse(ex.Message, TypeResult.success, new { });
            }
        }
    }
}