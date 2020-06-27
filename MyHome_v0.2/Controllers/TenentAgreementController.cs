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
        public HttpResponseMessage PostTenentAgreement([FromBody]TenentAgreement tenentagreement) {
            try { 
                 entities.TenentAgreements.Add(tenentagreement);
                 entities.SaveChanges();
                 var message = Request.CreateResponse(HttpStatusCode.Created, tenentagreement);
                 return message;
            } catch (Exception ex) {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }
        [Authorize]
        [HttpPut]
        public HttpResponseMessage PutTenentAgreement(int id,[FromBody]TenentAgreement tenentagreement) {
            try {
                var entity = entities.TenentAgreements.FirstOrDefault(x=>x.AgreementId==id);
                if (entity == null) {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, id.ToString());
                } else { 
                    entity.AssetName = tenentagreement.AssetName;
                    entity.ResidentsNumber=tenentagreement.ResidentsNumber;
                    entity.JoiningDate=tenentagreement.JoiningDate;
                    entity.LeavingDate = tenentagreement.LeavingDate;
                    entity.ResidentsNames=tenentagreement.ResidentsNames;
                    entity.IdentityProofs=tenentagreement.IdentityProofs;
                    entity.AdvanceAmount = tenentagreement.AdvanceAmount;
                    entity.RentAmount=tenentagreement.RentAmount;
                    entity.PercentageIncreased=tenentagreement.PercentageIncreased;
                    entity.ContactNumbers = tenentagreement.ContactNumbers;
                    entity.TenentEmailId=tenentagreement.TenentEmailId;
                    entity.Remarks=tenentagreement.Remarks;
                    entities.SaveChanges();
                     return Request.CreateResponse(HttpStatusCode.OK, entity);
                }                
            } catch (Exception ex) {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        public HttpResponseMessage DeleteTenentAgreement(int id) {
            try {
                var entity = entities.TenentAgreements.FirstOrDefault(x=>x.AgreementId==id);
                if (entity == null) {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound,id.ToString()+" Not Found");
                } else { 
                    entities.TenentAgreements.Remove(entity);
                    entities.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.OK, id.ToString());
                }                
            } catch (Exception ex) {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }
    }
}
