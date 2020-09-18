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
    public class RequestController : ApiController
    {
        private MyHomeDBEntities entities = new MyHomeDBEntities();

        [HttpGet]
         public HttpResponseMessage GetRequests() {
             var getValidData = entities.TenentRequests.ToList();
             try { 
                 if (getValidData == null){
                    return Request.CreateResponse(HttpStatusCode.NotFound, getValidData);
                 }
                 return Request.CreateResponse(HttpStatusCode.Created, getValidData);
             }catch(Exception ex){
                 return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
             } 
         }

        [HttpGet]
        public HttpResponseMessage GetRequestsByID(int AssetID)
        {
            var getAssetName = entities.TenentRequests.Where(x => x.AssetName == AssetID).ToList();
            if (getAssetName == null){
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, getAssetName);
        }

        [HttpPost]
         public HttpResponseMessage PostRequest(TenentRequest request) {
             try { 
                entities.TenentRequests.Add(request);
                entities.SaveChanges();
                var message=Request.CreateResponse(HttpStatusCode.Created, request);
                return message;
             }catch(Exception ex){
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
             } 
         }

        [HttpPut]
        public HttpResponseMessage PutRequest(int id,[FromBody]TenentRequest request) {
            try {
                var entity = entities.TenentRequests.FirstOrDefault(x => x.TenentRequestId == id);
                if (entity == null) {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, id.ToString());
                } else {
                    entity.AssetName = request.AssetName;
                    entity.Description = request.Description;
                    entity.RequestDate = request.RequestDate;
                    entity.Response = request.Response;
                    entity.Status= request.Status;
                    entities.SaveChanges();
                     return Request.CreateResponse(HttpStatusCode.OK, entity);
                }
            } catch (Exception ex) {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }
        [HttpDelete]
        public HttpResponseMessage DeleteAsset(int id) {
            try {
                var entity = entities.TenentRequests.FirstOrDefault(x => x.TenentRequestId == id);
                if (entity == null) {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound,id.ToString()+" Not Found");
                } else { 
                    entities.TenentRequests.Remove(entity);
                    entities.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.OK, id.ToString());
                }                
            } catch (Exception ex) {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }
    }
}
