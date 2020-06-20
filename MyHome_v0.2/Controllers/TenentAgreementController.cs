using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MyHomeDataAccess;

namespace MyHome_v0._2.Controllers
{
    public class TenentAgreementController : ApiController{
        private MyHomeDBEntities entities = new MyHomeDBEntities();
        public HttpResponseMessage PostTenentAgreement(TenentAgreement tenentagreement) {
            try { 
                 entities.TenentAgreements.Add(tenentagreement);
                 entities.SaveChanges();
                 var message = Request.CreateResponse(HttpStatusCode.Created, tenentagreement);
                 return message;
            } catch (Exception ex) {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
           
        }
    }
}
