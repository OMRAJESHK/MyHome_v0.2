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
    
    public partial class Document
    {
        public int ImgID { get; set; }
        public int ImgTitle { get; set; }
        public byte[] ImgEncode { get; set; }
        public string ImgDescription { get; set; }
        public System.DateTime ImgDate { get; set; }
        public Nullable<int> AssetName { get; set; }
        public bool isAdmin { get; set; }
    }
}
