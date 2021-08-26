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
using System.Threading.Tasks;

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
        //public JsonResult Sendmail(MailLog mailLog,string attachment){
        //    if (ModelState.IsValid) {
        //        string from = "omrajeshk1994@gmail.com"; 
        //        using (MailMessage mail = new MailMessage(from, mailLog.MailTo)) {
        //            mail.Subject = mailLog.Subject;
        //            mail.Body = mailLog.Body;
        //            Attachment data = new Attachment(Server.MapPath(attachment));
        //            mail.Attachments.Add(data);
        //            mail.IsBodyHtml = false;
        //            SmtpClient smtp = new SmtpClient();
        //            smtp.Host = "smtp.gmail.com";
        //            smtp.EnableSsl = true;
        //            NetworkCredential networkCredential = new NetworkCredential(from, "lakshminarasimha");
        //            smtp.UseDefaultCredentials = true;
        //            smtp.Credentials = networkCredential;
        //            smtp.Port = 587;
        //            smtp.Send(mail);
        //            return Json("Mail Success", JsonRequestBehavior.AllowGet);
        //        }
        //    } else { 
        //        return Json("Mail Failed", JsonRequestBehavior.AllowGet);
        //    }
        //}
        public JsonResult DeleteImg(string attachment){
            string path = Server.MapPath(attachment);
            FileInfo fi = new FileInfo(path);
            if (fi.Exists) { 
            fi.Delete();
                return Json("Positive", JsonRequestBehavior.AllowGet);
            }
            else
            return Json("negative", JsonRequestBehavior.DenyGet);
        }
        
        public async Task<JsonResult> Sendmail(FormCollection formCollection){
            if (Request.Form.Count > 0){
                var body = "<p>Dear Sir/Ma'am,</p><p>{0}</p>";
                var message = new MailMessage();
                message.From = new MailAddress("omrajeshk6021@gmail.com");  // replace with valid value
                message.Subject = formCollection["Subject"];
                message.Body = string.Format(body, formCollection["Message"]);
                message.IsBodyHtml = true;
                string[] To_MultiId = formCollection["To_Ids"].Split(',');
                string[] Cc_MultiId = formCollection["Cc_Ids"].Split(',');
                string[] Bcc_MultiId = formCollection["Bcc_Ids"].Split(',');
                if (To_MultiId != null && To_MultiId.Length != 0){
                    foreach (string ids in To_MultiId){
                        if (ids != "") { message.To.Add(new MailAddress(ids)); }  // adding multiple mail id 
                    }
                }
                if (Cc_MultiId != null && Cc_MultiId.Length != 0) { 
                    foreach (string ids in Cc_MultiId) {
                        if (ids != "") { message.CC.Add(new MailAddress(ids)); }  // adding multiple mail id 
                    }
                }
                if (Bcc_MultiId != null && Bcc_MultiId.Length != 0)               {
                    foreach (string ids in Bcc_MultiId)                   {
                        if (ids != "") { message.Bcc.Add(new MailAddress(ids)); }  // adding multiple mail id 
                    }
                }
                if (Request.Files.Count > 0){
                    var file = Request.Files[0];
                    if (file != null && file.ContentLength > 0){
                        Attachment att = new Attachment(file.InputStream, file.FileName);
                        message.Attachments.Add(att);
                    }
                }

                using (var smtp = new SmtpClient()) {
                    var credential = new NetworkCredential {
                        UserName = "omrajeshk6021@gmail.com",  // replace with valid value
                        Password = "lakshminarasimha"          // replace with valid value
                    };
                    smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                    smtp.Credentials = credential;
                    smtp.Host = formCollection["Host"];
                    smtp.Port = int.Parse(formCollection["PortNo"]);
                    smtp.EnableSsl = bool.Parse(formCollection["IsSSl"]);
                    await smtp.SendMailAsync(message);
                    return Json("Mail sended successfully");
                }

                //using (SmtpClient smtp = new SmtpClient("smtp.gmail.com", 587))
                //{
                //    smtp.Credentials = new NetworkCredential("omrajeshk6021@gmail.com", "lakshminarasimha");
                //    smtp.EnableSsl = true;
                //    smtp.Send(message);
                //}
            }
            return Json("", JsonRequestBehavior.AllowGet);
        }
    }
}
