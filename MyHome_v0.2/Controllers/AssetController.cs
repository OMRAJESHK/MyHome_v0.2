﻿using System;
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
         public class AssetDetails { 
            public string OwnerName;
            public string AssetAddress;
            public string AssetName;
            public int AssetId;
            public int IsRent;
            public int IsSump;
            public int LandTaxAmount;
            public int NumberofBulbs;
            public int NumberofDoors;
            public int NumberofFans;
            public int NumberofTaps;
            public int NumberofWindows;
            
         }
        [HttpGet]
         public HttpResponseMessage GetAsset() {
             var getValidData = entities.AssetRegistrations.ToList();
             try { 
                 if (getValidData == null)
                    return Request.CreateResponse(HttpStatusCode.NotFound, getValidData);
                 return Request.CreateResponse(HttpStatusCode.Created, getValidData);
             }catch(Exception ex){
                 return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
             } 
         }

        [AllowAnonymous]
        public IHttpActionResult GetAssetById(int AssetName){
            AssetDetails assetdetails = new AssetDetails();
            var AssetData = entities.AssetRegistrations.Where(x => x.AssetId == AssetName).SingleOrDefault();
            assetdetails.OwnerName = AssetData.RegusteredTo;
            assetdetails.AssetName = AssetData.AssetName;
            assetdetails.AssetAddress = AssetData.Address;
            assetdetails.AssetId = AssetData.AssetId;
            assetdetails.IsRent = AssetData.IsRent;
            assetdetails.IsSump = AssetData.IsSump;
            assetdetails.LandTaxAmount = AssetData.LandTaxAmount;
            assetdetails.NumberofBulbs = AssetData.NumberofBulbs;
            assetdetails.NumberofDoors = AssetData.NumberofDoors;
            assetdetails.NumberofFans = AssetData.NumberofFans;
            assetdetails.NumberofTaps = AssetData.NumberofTaps;
            assetdetails.NumberofWindows = AssetData.NumberofWindows;
            
            if (AssetData == null)
                return Ok("404");
            return Ok(assetdetails);
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
