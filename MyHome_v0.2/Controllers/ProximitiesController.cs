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
    public class ProximitiesController : ApiController{
         private MyHomeDBEntities entities = new MyHomeDBEntities();
         
        [HttpGet]
         public HttpResponseMessage GetProximity(int AssetName) {
            string[] empty= new string[0]; 
            var getValidData = entities.Proximities.Where(x => x.AssetName == AssetName).ToList();
             try { 
                 if (getValidData == null){
                    return Request.CreateResponse(HttpStatusCode.OK, empty);
                 }
                 return Request.CreateResponse(HttpStatusCode.Created, getValidData);
             }catch(Exception ex){
                 return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
             } 
         }
        [HttpPost]
         public HttpResponseMessage PostProximity(Proximity proximity) {
             try { 
                entities.Proximities.Add(proximity);
                entities.SaveChanges();
                var message=Request.CreateResponse(HttpStatusCode.Created, proximity);
                return message;
             }catch(Exception ex){
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
             } 
         }
        [HttpPut]
        public HttpResponseMessage PutProximity(int id,[FromBody]Proximity proximity) {
            try {
                var entity = entities.Proximities.FirstOrDefault(x => x.AssetName == id);
                if (entity == null) {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, id.ToString());
                } else {
                    entity.AssetName = proximity.AssetName;
                    entity.RailwayStation = proximity.RailwayStation;
                    entity.BusStation = proximity.BusStation;
                    entity.Airport = proximity.Airport;
                    entity.MetroStation = proximity.MetroStation;
                    entity.SchoolorCollege = proximity.SchoolorCollege;
                    entity.Hospital = proximity.Hospital;
                    entity.Market = proximity.Market;
                    entity.Temple = proximity.Temple;
                    entity.Hotel = proximity.Hotel;
                    entities.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.OK, entity);
                }
            } catch (Exception ex) {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }
        [HttpDelete]
        public HttpResponseMessage DeleteProximity(int AssetName) {
            try {
                var entity = entities.Proximities.FirstOrDefault(x => x.AssetName == AssetName);
                if (entity == null) {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound,"Not Found");
                } else { 
                    entities.Proximities.Remove(entity);
                    entities.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.OK, AssetName);
                }                
            } catch (Exception ex) {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }
    }
}
