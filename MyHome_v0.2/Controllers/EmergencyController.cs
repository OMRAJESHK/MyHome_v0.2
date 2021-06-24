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
    public class EmergencyController : ApiController
    {
        private readonly MyHomeDBEntities entities = new MyHomeDBEntities();

        [HttpGet]
         public HttpResponseMessage GetEmergencyContacts(int AssetName) {
            string[] empty= new string[0]; 
            var getValidData= entities.EmergencyContacts.Where(x => x.AssetName == AssetName).ToList();
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
         public HttpResponseMessage GetEmergencyContactsByProfession(int AssetName, int profession) {
            string[] empty = new string[0]; 
            var getValidData = entities.EmergencyContacts.Where(x => x.AssetName == AssetName && x.Profession == profession && x.IsVisible == 1).ToList();
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
         public HttpResponseMessage PostEmergency(EmergencyContact emergency) {
             try { 
                entities.EmergencyContacts.Add(emergency);
                entities.SaveChanges();
                var message=Request.CreateResponse(HttpStatusCode.Created, emergency);
                return message;
             }catch(Exception ex){
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
             } 
         }

        [HttpPut]
        public HttpResponseMessage PutEmergency(int id,[FromBody]EmergencyContact emergency) {
            try {
                var entity = entities.EmergencyContacts.FirstOrDefault(x => x.EmcyContactId == id);
                if (entity == null) {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, id.ToString());
                } else {
                    entity.AssetName = emergency.AssetName;
                    entity.ContactName = emergency.ContactName;
                    entity.ContactNumber = emergency.ContactNumber;
                    entity.Profession = emergency.Profession;
                    entity.IsVisible = emergency.IsVisible;
                    
                    entities.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.OK, entity);
                }
            } catch (Exception ex) {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [HttpDelete]
        public HttpResponseMessage DeleteEmergency(int id) {
            try {
                var entity = entities.EmergencyContacts.FirstOrDefault(x => x.EmcyContactId == id);
                if (entity == null) {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound,id.ToString()+" Not Found");
                } else { 
                    entities.EmergencyContacts.Remove(entity);
                    entities.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.OK, id.ToString());
                }
            } catch (Exception ex) {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }
    }
}
