//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace MyHomeDataAccess
{
    using System;
    using System.Collections.Generic;
    
    public partial class MailLog
    {
        public int MailId { get; set; }
        public int AssetName { get; set; }
        public string MailTo { get; set; }
        public System.DateTime MailDate { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
    }
}
