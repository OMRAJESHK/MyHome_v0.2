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
    
    public partial class Transaction
    {
        public int TransactionId { get; set; }
        public string AssetName { get; set; }
        public string Description { get; set; }
        public int TransactionType { get; set; }
        public int Amount { get; set; }
        public System.DateTime Date { get; set; }
        public int TransactionMode { get; set; }
        public string PaidBy { get; set; }
        public string PaidTo { get; set; }
        public int Status { get; set; }
        public string Remarks { get; set; }
    }
}