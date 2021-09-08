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
        private readonly MyHomeDBEntities entities = new MyHomeDBEntities();
         public class LoginDetails { 
            public string mailId;
            public string names;
            public int assetname;
         }
        public HttpResponseMessage GetClientMailId(string phoneNumber) {
            TenentAgreementController customObj = new TenentAgreementController();
            var tenantData = entities.TenentAgreements.Where(x => x.ContactNumbers == phoneNumber).SingleOrDefault();
            var assetData = entities.AspNetUsers.Where(x => x.PhoneNumber == phoneNumber).SingleOrDefault();
            if (assetData == null || tenantData == null) 
                return Request.CreateErrorResponse(HttpStatusCode.NotFound,"Incorrect Number or Password");
            LoginDetails logindetails = new LoginDetails();
            logindetails.mailId = assetData.UserName;
            logindetails.names = tenantData.ResidentsNames;
            logindetails.assetname = assetData.AssetName;
            return Request.CreateResponse(HttpStatusCode.OK, logindetails);
        }

        [Authorize]
        public HttpResponseMessage GetTenentAgreementByID(int AssetName) {
            TenentAgreementController customObj = new TenentAgreementController();
            var tenantData = entities.TenentAgreements.Where(x => x.AssetName == AssetName).SingleOrDefault();
            if (tenantData == null)
                return Request.CreateErrorResponse(HttpStatusCode.NotFound,"404");
            return Request.CreateResponse(HttpStatusCode.Created, tenantData);
        }

        [Authorize]
        [HttpPost]
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
                var entity = entities.TenentAgreements.FirstOrDefault(x => x.AgreementId == id);
                if (entity == null) {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, id.ToString());
                } else {
                    entity.AssetName = tenentagreement.AssetName;
                    entity.ResidentsNumber = tenentagreement.ResidentsNumber;
                    entity.JoiningDate = tenentagreement.JoiningDate;
                    entity.LeavingDate = tenentagreement.LeavingDate;
                    entity.ResidentsNames = tenentagreement.ResidentsNames;
                    entity.IdentityProofs = tenentagreement.IdentityProofs;
                    entity.AdvanceAmount = tenentagreement.AdvanceAmount;
                    entity.RentAmount = tenentagreement.RentAmount;
                    entity.PercentageIncreased = tenentagreement.PercentageIncreased;
                    entity.ContactNumbers = tenentagreement.ContactNumbers;
                    entity.TenentEmailId = tenentagreement.TenentEmailId;
                    entity.Remarks = tenentagreement.Remarks;
                    entities.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.OK, entity);
                }
            } catch (Exception ex) {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [HttpDelete]
        public HttpResponseMessage DeleteTenentAgreement(int id) {
            try {
                var entity = entities.TenentAgreements.FirstOrDefault(x => x.AgreementId == id);
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
