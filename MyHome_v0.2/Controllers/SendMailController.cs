using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MyHomeDataAccess;
using MyHome_v0._2.Models;
using System.Net.Mail;
using System.Net;
using System.Net.Mime;

namespace MyHome_v0._2.Controllers
{
    public class SendMailController : Controller
    {
        // GET: SendMail
        public ActionResult Index()
        {
            return View();
        }

         public JsonResult ImageUpload(UploadImage imageFile) {
            var file = imageFile.UploadImg;
            if (file != null) {
                var fileName = Path.GetFileName(file.FileName);
                var extention = Path.GetExtension(file.FileName);
                var filenamewithoutextension = Path.GetFileNameWithoutExtension(file.FileName);
                file.SaveAs(Server.MapPath("~/Images/" + file.FileName));    
            }
            return Json(file.FileName, JsonRequestBehavior.AllowGet);
         }

        [HttpPost]
        public JsonResult Sendmail(MailLog mailLog,string attachment){
            if (ModelState.IsValid) {
                string from = "omrajeshk6021@gmail.com"; 
                using (MailMessage mail = new MailMessage(from, mailLog.MailTo)) {
                    mail.Subject = mailLog.Subject;
                    mail.Body = mailLog.Body;
                    Attachment data = new Attachment(Server.MapPath(attachment));
                    // deleteing File after upload
                    //string fullPath = Request.MapPath(attachment);
                    //if (System.IO.File.Exists(fullPath))
                    //{
                    //   System.IO.File.Delete(attachment);
                    //}
                   // System.IO.File.Delete(Server.MapPath(attachment));
                    mail.Attachments.Add(data);
                    mail.IsBodyHtml = false;
                    SmtpClient smtp = new SmtpClient();
                    smtp.Host = "smtp.gmail.com";
                    smtp.EnableSsl = true;
                    NetworkCredential networkCredential = new NetworkCredential(from, "lakshminarasimha");
                    smtp.UseDefaultCredentials = true;
                    smtp.Credentials = networkCredential;
                    smtp.Port = 587;
                    smtp.Send(mail);

                    

                    return Json(attachment, JsonRequestBehavior.AllowGet);
                }
            } else { 
                return Json(attachment, JsonRequestBehavior.AllowGet);
            }
        }
    }
    }
