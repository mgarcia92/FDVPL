//------------------------------------------------------------------------------
// <auto-generated>
//     Este código se generó a partir de una plantilla.
//
//     Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//     Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace WebAsesores.Models.EntityFramework
{
    using System;
    using System.Collections.Generic;
    
    public partial class login
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public login()
        {
            this.route = new HashSet<route>();
        }
    
        public string lgnCode { get; set; }
        public string citCode { get; set; }
        public string zipCode { get; set; }
        public string brcCode { get; set; }
        public string titCode { get; set; }
        public string lgnName { get; set; }
        public string lgnPassword { get; set; }
        public bool lgnForAllLogins { get; set; }
        public bool lgnOnlyServer { get; set; }
        public string lgnDummy1 { get; set; }
        public string lgnDummy2 { get; set; }
        public string lgnID { get; set; }
        public Nullable<System.DateTime> lgnEnrollmentDate { get; set; }
        public bool lgnEmployee { get; set; }
        public Nullable<System.DateTime> lgnCreatedOn { get; set; }
        public string lgnPhone { get; set; }
        public string lgnStreet1 { get; set; }
        public string lgnStreet2 { get; set; }
        public string lgnStreet3 { get; set; }
        public string lgnBackEndCode { get; set; }
        public bool C_deleted { get; set; }
        public int C_stamp { get; set; }
        public string srgCode { get; set; }
        public string lgnPassword1 { get; set; }
        public string lgnPassword2 { get; set; }
        public string lgnPassword3 { get; set; }
        public string lgnPassword4 { get; set; }
        public Nullable<System.DateTime> lgnPasswordDate { get; set; }
        public Nullable<short> lgnPasswordRetries { get; set; }
        public string lgnSignature { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<route> route { get; set; }
    }
}
