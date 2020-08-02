using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebAsesores.Models;
using WebAsesores.Models.EntityFramework;
using WebAsesores.Models.Repository;

namespace WebAsesores.Controllers
{
    public class StateRouteController : Controller
    {
        GenericRepository<FDV_Entities> db = new GenericRepository<FDV_Entities>();
        [HttpPost]
        public string GetListGeneral()
        {
            try
            {
                var generals = (from general in db.model.general
                                join route in db.model.route on general.rotCode equals route.rotCode
                                select new { rotCode = general.rotCode, rotName = route.rotName, gnlStatus = general.gnlStatus }).ToList();

                return ResponseResult.GetResponseJson(string.Empty, TypeResult.success, generals);
            }
            catch (Exception ex)
            {
                return ResponseResult.GetResponseJson(ex.Message, TypeResult.error, new { });
            }
        }


        [HttpPost]
        public string updateGeneralStatusRoute(string gnlStatus,string rotCode)
        {
            try
            {
                if (!string.IsNullOrEmpty(gnlStatus))
                {
                    general query = db.model.general.Where(x => x.rotCode == rotCode.Trim()).FirstOrDefault();
                    query.gnlStatus = Convert.ToByte(gnlStatus);
                    db.Modify<general>(query);
                    return ResponseResult.GetResponseJson("Modificado", TypeResult.success, new { });
                }
                else
                {
                    return ResponseResult.GetResponseJson(string.Empty, TypeResult.success, new { });
                }

            }
            catch (Exception ex)
            {
                return ResponseResult.GetResponseJson(ex.Message, TypeResult.error, new { });
            }
        }
    }
}