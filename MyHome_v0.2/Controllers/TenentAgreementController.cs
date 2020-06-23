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
        public IHttpActionResult GetTenentAgreement(string phoneNumber,string password)
        {
            var getValidData = entities.TenentAgreements.Where(x => x.ContactNumbers==phoneNumber && x.TenentPassword == password).SingleOrDefault();

            if (getValidData == null){
                return Ok("404");
            }
            return Ok(getValidData);
        }
        [Authorize]
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
