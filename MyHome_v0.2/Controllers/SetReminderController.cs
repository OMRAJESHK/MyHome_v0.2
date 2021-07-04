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
    public class SetReminderController : ApiController
    {
         private readonly MyHomeDBEntities entities = new MyHomeDBEntities();

         [HttpGet]
         public HttpResponseMessage GetReminders() {
            string[] empty= new string[0]; 
            var getValidData= entities.Reminders.ToList();
             try { 
                 if (getValidData == null){
                    return Request.CreateResponse(HttpStatusCode.NotFound, empty);
                 }
                 return Request.CreateResponse(HttpStatusCode.OK, getValidData);
             }catch(Exception ex){
                 return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
             } 
         }
        [HttpGet]
         public HttpResponseMessage GetRemindersByRole(int RoleId) {
            string[] empty= new string[0]; 
            var getValidData= entities.Reminders.Where(x => x.RoleId == RoleId).ToList();
             try { 
                 if (getValidData == null){
                    return Request.CreateResponse(HttpStatusCode.NotFound, empty);
                 }
                 return Request.CreateResponse(HttpStatusCode.OK, getValidData);
             }catch(Exception ex){
                 return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
             } 
         }
        [HttpPost]
         public HttpResponseMessage PostReminders(Reminder reminder) {
             try { 
                entities.Reminders.Add(reminder);
                entities.SaveChanges();
                var message=Request.CreateResponse(HttpStatusCode.Created, reminder);
                return message;
             }catch(Exception ex){
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
             } 
         }
        [HttpPut]
        public HttpResponseMessage PutReminders(int id,[FromBody]Reminder reminder) {
            try {
                var entity = entities.Reminders.FirstOrDefault(x => x.ReminderId == id);
                if (entity == null) {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, id.ToString());
                } else {
                    entity.AssetName = reminder.AssetName;
                    entity.Description = reminder.Description;        
                    entity.SetReminder = reminder.SetReminder;
                    entity.CreatedDate = reminder.CreatedDate;
                    entity.RoleId = reminder.RoleId;
                    entity.Type = reminder.Type;
                    entities.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.OK, entity);
                }
            } catch (Exception ex) {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [HttpDelete]
        public HttpResponseMessage DeleteReminders(int id) {
            try {
                var entity = entities.Reminders.FirstOrDefault(x => x.ReminderId == id);
                if (entity == null) {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound,id.ToString()+" Not Found");
                } else { 
                    entities.Reminders.Remove(entity);
                    entities.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.OK, id.ToString());
                }
            } catch (Exception ex) {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }
    }
}
