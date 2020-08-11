using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyHome_v0._2.Models {
    public class UploadImage {
         public HttpPostedFileWrapper UploadImg { get; set; }
        public HttpPostedFileBase Attachment { get; set; }
    }
}