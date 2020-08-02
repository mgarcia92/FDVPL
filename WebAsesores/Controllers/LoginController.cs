using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebAsesores.Models;
using WebAsesores.Utils;

namespace WebAsesores.Controllers
{
    public class LoginController : Controller
    {
        [HttpPost]
        public string LogonUser(string username, string password)
        {
            Ldap ldap = new Ldap();
            ldap.FindUser(username, password);

            if (!ldap.success)
            {
                //if (!ldap.FindMemberOfGroup(username, password, "gsg_grupo"))
                //{
                    var user = new User { username = username, validate = true, message = string.Empty };
                    Session["WebUser"] = user;
                    return JsonConvert.SerializeObject(user);
                //}
                //else
                //{
                //    return JsonConvert.SerializeObject(new User { username = username, validate = false, message = "No tiene acceso al grupo gsg_grupo" });
                //}
            }
            else
            {
                return JsonConvert.SerializeObject(new User { username = username, validate = false, message = "Usuario o Clave Invalida!" });
            }
        }

        [HttpPost]
        public string ValidateSession()
        {
            if (Session["WebUser"] != null)
            {
                return JsonConvert.SerializeObject(new { Session = true });
            }
            else
            {
                return JsonConvert.SerializeObject(new { Session = false });
            }
        }



        [HttpPost]
        public string Logout()
        {
            Session.Clear();
            Session.RemoveAll();
            return ResponseResult.GetResponseJson("", TypeResult.success, new { closeSession = true });
        }
    }
}