using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MyHomeDataAccess;


namespace MyHome_v0._2.Controllers
{
    [Authorize]
    public class MailLogsController : ApiController{
         private readonly MyHomeDBEntities entities = new MyHomeDBEntities();

        //[EnableCors(origins: "http://mywebclient.azurewebsites.net", headers: "*", methods: "*")]
         [HttpGet]
         public HttpResponseMessage GetMailLogs(int AssetName) {
            string[] empty= new string[0]; 
            var getValidData = entities.MailLogs.Where(x => x.AssetName == AssetName).ToList();
             try { 
                 if (getValidData == null){
                    return Request.CreateResponse(HttpStatusCode.NotFound, empty);
                 }
                 return Request.CreateResponse(HttpStatusCode.Created, getValidData);
             }catch(Exception ex){
                 return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
             } 
         }
        [HttpPost]
         public HttpResponseMessage PostMailLogs(MailLog maillog) {
             try { 
                entities.MailLogs.Add(maillog);
                entities.SaveChanges();
                var message=Request.CreateResponse(HttpStatusCode.Created, maillog);
                return message;
             }catch(Exception ex){
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
             } 
         }
        [HttpPut]
        public HttpResponseMessage PutMailLogs(int id,[FromBody]MailLog maillog) {
            try {
                var entity = entities.MailLogs.FirstOrDefault(x => x.AssetName == id);
                if (entity == null) {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, id.ToString());
                } else {
                    entity.AssetName = maillog.AssetName;
                    entity.MailTo = maillog.MailTo;
                    entity.MailDate = maillog.MailDate;
                    entity.Subject = maillog.Subject;
                    entity.Body = maillog.Body;
                    entities.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.OK, entity);
                }
            } catch (Exception ex) {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }
        [HttpDelete]
        public HttpResponseMessage DeleteMailLogs(int id) {
            try {
                var entity = entities.MailLogs.FirstOrDefault(x => x.MailId == id);
                if (entity == null) {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound,id.ToString()+" Not Found");
                } else { 
                    entities.MailLogs.Remove(entity);
                    entities.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.OK, id.ToString());
                }                
            } catch (Exception ex) {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }
    }
}
