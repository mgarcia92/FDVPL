using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAsesores.Models;
using WebAsesores.Models.WebApiModels;
using WebAsesores.Utils;

namespace WebAsesores.Controllers
{
    public class LoginApiController : ApiController
    {
        [HttpPost]
        public ResponseResult LogonUser([FromBody] LoginAuth userAuth)
        {
            Ldap ldap = new Ldap();
            ldap.FindUser(userAuth.username, userAuth.password);
            string groupName = ConfigurationManager.AppSettings["grupoAD"].ToString();
            if (ldap.success)
            {
                if (ldap.FindMemberOfGroup(userAuth.username, userAuth.password, groupName))
                {
                    var user = new User { username = userAuth.username, validate = true, message = string.Empty };
                    //Session["WebUser"] = user;
                    return ResponseResult.GetResponse("", TypeResult.success, user); 
                }
                else
                {
                    var user =  new User { username = userAuth.username, validate = false, message = $"No tiene acceso al grupo {groupName} de Active Directory Contacte al Administrador" };
                    return ResponseResult.GetResponse("", TypeResult.warning, user);
                }
        }
            else
            {
                var user =  new User { username = userAuth.username, validate = false, message = "Usuario o Clave Invalida!" };
                return ResponseResult.GetResponse("", TypeResult.warning, user);
            }
        }

      
    }
}