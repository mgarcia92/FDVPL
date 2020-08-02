using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAsesores.Models
{
    public class GeneralJourney
    {
        public string rotCode { get; set; }
        public byte? gnlStatus { get; set; }
        public DateTime? jrtStatusDate { get; set; }
        public DateTime? gnlDate { get; set; }
        public byte? gnlPartialStatus { get; set; }
        public DateTime? gnlPartialStatusDate { get; set; }
    }
}