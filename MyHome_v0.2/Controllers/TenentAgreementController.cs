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
        public IHttpActionResult GetTenentAgreement(string phoneNumber)
        {
            var test = entities.TenentAgreements.Where(x => x.ContactNumbers.Contains(phoneNumber)).SingleOrDefault();
            if (test == null){
                return Ok("404");
            }
            return Ok(test);
        }

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
