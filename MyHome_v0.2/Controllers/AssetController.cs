using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MyHomeDataAccess;
using System.Web.Http.Description;

namespace MyHome_v0._2.Controllers
{
     [Authorize]
    public class AssetController : ApiController
    {
         private readonly MyHomeDBEntities entities = new MyHomeDBEntities();
         
        [HttpGet]
         public HttpResponseMessage GetAsset() {
             var getValidData = entities.AssetRegistrations.ToList();
             try { 
                 if (getValidData == null){
                    return Request.CreateResponse(HttpStatusCode.NotFound, getValidData);
                 }
                 return Request.CreateResponse(HttpStatusCode.Created, getValidData);
             }catch(Exception ex){
                 return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
             } 
         }
        [AllowAnonymous]
        public IHttpActionResult GetAssetName(int AssetName)
        {
            var getAssetName = entities.AssetRegistrations.Where(x => x.AssetId == AssetName).SingleOrDefault();
            if (getAssetName == null){
                return Ok("404");
            }
            return Ok(getAssetName);
        }
        [HttpPost]
         public HttpResponseMessage PostAssetDetails(AssetRegistration asset) {
             try { 
                entities.AssetRegistrations.Add(asset);
                entities.SaveChanges();
                var message=Request.CreateResponse(HttpStatusCode.Created, asset);
                return message;
             }catch(Exception ex){
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
             } 
         }
        [HttpPut]
        public HttpResponseMessage PutAsset(int id,[FromBody]AssetRegistration asset) {
            try {
                var entity = entities.AssetRegistrations.FirstOrDefault(x => x.AssetId == id);
                if (entity == null) {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, id.ToString());
                } else {
                    entity.AssetName = asset.AssetName;
                    entity.RegisteredDate = asset.RegisteredDate;
                    entity.RegusteredTo = asset.RegusteredTo;
                    entity.Address = asset.Address;
                    entity.LandTaxAmount = asset.LandTaxAmount;
                    entity.NumberofDoors = asset.NumberofDoors;
                    entity.NumberofWindows = asset.NumberofWindows;
                    entity.NumberofTaps = asset.NumberofTaps;
                    entity.NumberofFans = asset.NumberofFans;
                    entity.NumberofBulbs = asset.NumberofBulbs;
                    entity.IsSump = asset.IsSump;
                    entity.IsRent = asset.IsRent;
                    entity.Remarks = asset.Remarks;
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
                var entity = entities.AssetRegistrations.FirstOrDefault(x => x.AssetId == id);
                if (entity == null) {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound,id.ToString()+" Not Found");
                } else { 
                    entities.AssetRegistrations.Remove(entity);
                    entities.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.OK, id.ToString());
                }                
            } catch (Exception ex) {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }
    }
}
