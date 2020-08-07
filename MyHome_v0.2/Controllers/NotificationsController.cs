using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MyHomeDataAccess;

namespace MyHome_v0._2.Controllers
{
    public class NotificationsController : ApiController
    {
        private MyHomeDBEntities entities = new MyHomeDBEntities();
         
        [HttpGet]
         public HttpResponseMessage GetNotification(int AssetName) {
            var getValidData = entities.Notifications.Where(x => x.AssetName == AssetName).ToList();
             try { 
                 if (getValidData == null){
                    return Request.CreateResponse(HttpStatusCode.NotFound, getValidData);
                 }
                 return Request.CreateResponse(HttpStatusCode.Created, getValidData);
             }catch(Exception ex){
                 return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
             } 
         }

        [HttpPost]
         public HttpResponseMessage PostNotification(Notification notification) {
             try { 
                entities.Notifications.Add(notification);
                entities.SaveChanges();
                var message=Request.CreateResponse(HttpStatusCode.Created, notification);
                return message;
             }catch(Exception ex){
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
             } 
         }
        [HttpPut]
        public HttpResponseMessage PutNotification(int id,[FromBody]Notification notification) {
            try {
                var entity = entities.Notifications.FirstOrDefault(x => x.NotificationId == id);
                if (entity == null) {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, id.ToString());
                } else {
                    entity.AssetName = notification.AssetName;
                    entity.NotificationType = notification.NotificationType;
                    entity.Description = notification.Description;
                    entity.NotificationDate = notification.NotificationDate;
                    entity.Status = notification.Status;
                    entities.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.OK, entity);
                }
            } catch (Exception ex) {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }
        [HttpDelete]
        public HttpResponseMessage DeleteNotification(int id) {
            try {
                var entity = entities.Notifications.FirstOrDefault(x => x.NotificationId == id);
                if (entity == null) {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound,id.ToString()+" Not Found");
                } else { 
                    entities.Notifications.Remove(entity);
                    entities.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.OK, id.ToString());
                }                
            } catch (Exception ex) {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

    }
}
