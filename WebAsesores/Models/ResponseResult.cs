using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAsesores.Models
{

   public enum TypeResult
    {
        success = 's',
        error = 'e',
        warning = 'w'

    }

    public class ResponseResult
    {
        public string message { get; set; }
        public TypeResult typeMessage { get; set; }
        public object Data { get; set; }

        public static string GetResponseJson(string message, TypeResult type, object data)
        {
            return JsonConvert.SerializeObject(new ResponseResult() { message = message, typeMessage = type, Data = data });
        }

        public static ResponseResult GetResponse(string message, TypeResult type, object data)
        {
            return new ResponseResult() { message = message, typeMessage = type, Data = data };
        }


    }
}