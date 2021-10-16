using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MyHomeDataAccess;

namespace MyHome_v0._2.Controllers
{
    public class DocumentController : ApiController
    {
        private readonly MyHomeDBEntities entities = new MyHomeDBEntities();
        public class DocumentRes {            
            public int status;
         }
        [HttpGet]
         public HttpResponseMessage GetDocument(int AssetName) {
            string[] empty= new string[0]; 
            var getDocuments = entities.Documents.Where(x => x.AssetName == AssetName).ToList();
             try { 
                 if (getDocuments == null){
                    return Request.CreateResponse(HttpStatusCode.NotFound, empty);
                 }
                 return Request.CreateResponse(HttpStatusCode.OK, getDocuments);
             }catch(Exception ex){
                 return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
             } 
         }
        public HttpResponseMessage GetAdminProfilePicture() {
            string[] empty= new string[0]; 
            var getDocuments = entities.Documents.Where(x => x.isAdmin == true && x.ImgTitle == 1).FirstOrDefault();
             try { 
                 if (getDocuments == null){
                    return Request.CreateResponse(HttpStatusCode.OK, empty);
                 }
                 return Request.CreateResponse(HttpStatusCode.OK, getDocuments);
             }catch(Exception ex){
                 return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
             } 
         }
        public HttpResponseMessage GetProfilePicture(int AssetName) {
            string[] empty= new string[0]; 
            var getDocuments = entities.Documents.Where(x => x.AssetName == AssetName&& x.ImgTitle == 1&&x.isAdmin == false).FirstOrDefault();
             try { 
                 if (getDocuments == null){
                    return Request.CreateResponse(HttpStatusCode.NotFound, getDocuments);
                 }
                 return Request.CreateResponse(HttpStatusCode.OK, getDocuments);
             }catch(Exception ex){
                 return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
             } 
         }
        
        [HttpPost]
         public HttpResponseMessage PostDocument(Document document) {
            DocumentRes documentres = new DocumentRes();

             try { 
                entities.Documents.Add(document);
                entities.SaveChanges();
                documentres.status = 200;
                var message=Request.CreateResponse(HttpStatusCode.Created,documentres);
                return message;
             }catch(Exception ex){
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
             } 
         }
        [HttpPut]
        public HttpResponseMessage PutDocument(int id,[FromBody]Document document) {
            DocumentRes documentres = new DocumentRes();
            try {
                var entity = entities.Documents.FirstOrDefault(x => x.ImgID == id);
                if (entity == null) {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, id.ToString());
                } else {
                    entity.AssetName = document.AssetName;
                    entity.ImgDate = document.ImgDate;
                    entity.ImgDescription = document.ImgDescription;
                    entity.ImgEncode = document.ImgEncode;
                    entity.ImgTitle = document.ImgTitle;
                    entity.isAdmin = document.isAdmin;
                    documentres.status = 200;
                    entities.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.OK, documentres);
                }
            } catch (Exception ex) {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }
        [HttpDelete]
        public HttpResponseMessage DeleteDocument(int id) {
            try {
                var entity = entities.Documents.FirstOrDefault(x => x.ImgID == id);
                if (entity == null) {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound,id.ToString()+" Not Found");
                } else { 
                    entities.Documents.Remove(entity);
                    entities.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.OK, id.ToString());
                }                
            } catch (Exception ex) {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }
    }
}
