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
    public class AdminDataController : ApiController {

        private MyHomeDBEntities entities = new MyHomeDBEntities();
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

    }
}
