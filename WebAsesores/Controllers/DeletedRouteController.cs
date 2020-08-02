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
    public class DeletedRouteController : Controller
    {
        GenericRepository<FDV_Entities> db = new GenericRepository<FDV_Entities>();


        [HttpPost]
        public string getListDeletedRoutes()
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
                                     where r.C_deleted == true
                                     select new { rotCode = r.lgnCode, rotName = r.lgnName, C_deleted = r.C_deleted == true ? statusTrue : statusFalse }).ToList();

                foreach (var ruta in rutas)
                {
                    data.Add(ruta);
                }

                foreach (var item in login)
                {
                    if (rutas.Where(x => x.rotCode == item.rotCode).ToList().Count <= 0)
                    {
                        data.Add(item);
                    }
                }


                return ResponseResult.GetResponseJson(string.Empty, TypeResult.success, data.Take(10));

            }
            catch (Exception ex)
            {
                return ResponseResult.GetResponseJson(ex.Message, TypeResult.success, new object[0]);

            }
        }



        [HttpPost]
        public string updateRouteDeleted(string rotCode,string deleted)
        {
            try
            {
                string message = string.Empty;
                route route = db.model.route.Where(x => x.rotCode == rotCode).FirstOrDefault();
                if(route != null)
                {
                    route.C_deleted = Convert.ToBoolean(deleted);
                    db.model.Database.ExecuteSqlCommand($"UPDATE ROUTE SET _DELETED = '{route.C_deleted}' WHERE ROTCODE = '{route.rotCode}'"); 
                    message = $"Actualizado en Route";
                }
                login login = db.model.login.Where(x => x.lgnCode == rotCode).FirstOrDefault();
                if (login != null)
                {
                    login.C_deleted = Convert.ToBoolean(deleted);
                    db.model.Database.ExecuteSqlCommand($"UPDATE login SET _DELETED = '{login.C_deleted}' WHERE LGNCODE = '{login.lgnCode}'");
                    message = $"{message} / Actualizado en Login";
                }

                return ResponseResult.GetResponseJson(message == string.Empty ? "Ruta Activa" : message, TypeResult.success, new { });
            }
            catch (Exception ex)
            {
                return ResponseResult.GetResponseJson(ex.Message, TypeResult.success, new { });
            }
        }
    }
}