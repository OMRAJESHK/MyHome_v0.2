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
    public class PropertyTaxController : ApiController{
         private MyHomeDBEntities entities = new MyHomeDBEntities();

         [HttpGet]
         public HttpResponseMessage GetPropertyTaxes(int AssetName) {
            string[] empty= new string[0]; 
            var getValidData = entities.PropertyTaxes.Where(x => x.AssetName == AssetName).ToList();
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
         public HttpResponseMessage PostPropertyTaxes(PropertyTax propertytax) {
             try { 
                entities.PropertyTaxes.Add(propertytax);
                entities.SaveChanges();
                var message=Request.CreateResponse(HttpStatusCode.Created, propertytax);
                return message;
             }catch(Exception ex){
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
             } 
         }
        [HttpPut]
        public HttpResponseMessage PutPropertyTaxes(int id,[FromBody]PropertyTax propertytax) {
            try {
                var entity = entities.PropertyTaxes.FirstOrDefault(x => x.AssetName == id);
                if (entity == null) {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, id.ToString());
                } else {
                    entity.AssetName = propertytax.AssetName;
                    entity.TaxDate = propertytax.TaxDate;
                    entity.TaxAmount = propertytax.TaxAmount;
                    entity.Status = propertytax.Status;
                    entity.Remarks = propertytax.Remarks;
                    entities.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.OK, entity);
                }
            } catch (Exception ex) {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }
        [HttpDelete]
        public HttpResponseMessage DeletePropertyTaxes(int id) {
            try {
                var entity = entities.PropertyTaxes.FirstOrDefault(x => x.PropertyID == id);
                if (entity == null) {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound,id.ToString()+" Not Found");
                } else { 
                    entities.PropertyTaxes.Remove(entity);
                    entities.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.OK, id.ToString());
                }                
            } catch (Exception ex) {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }
    }
}
