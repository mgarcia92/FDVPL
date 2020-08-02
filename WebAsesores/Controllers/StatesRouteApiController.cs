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
    public class StatesRouteApiController : ApiController
    {
        GenericRepository<FDV_Entities> db = new GenericRepository<FDV_Entities>();
        [HttpGet]
        public ResponseResult GetListGeneral()
        {
            try
            {
                var generals = (from general in db.model.general
                                join route in db.model.route on general.rotCode equals route.rotCode
                                select new { rotCode = general.rotCode, rotName = route.rotName, gnlStatus = general.gnlStatus }).ToList();

                return ResponseResult.GetResponse(string.Empty, TypeResult.success, generals);
            }
            catch (Exception ex)
            {
                return ResponseResult.GetResponse(ex.Message, TypeResult.error, new object[0]);
            }
        }

        [HttpPost]
        public ResponseResult updateGeneralStatusRoute([FromBody] UpdateState state)
        {
            try
            {
                if (!string.IsNullOrEmpty(state.gnlStatus))
                {
                    general query = db.model.general.Where(x => x.rotCode == state.rotCode.Trim()).FirstOrDefault();
                    query.gnlStatus = Convert.ToByte(state.gnlStatus);
                    db.Modify<general>(query);
                    return ResponseResult.GetResponse("Modificado", TypeResult.success, new { });
                }
                else
                {
                    return ResponseResult.GetResponse(string.Empty, TypeResult.success, new { });
                }

            }
            catch (Exception ex)
            {
                return ResponseResult.GetResponse(ex.Message, TypeResult.error, new { });
            }
        }
    }
}