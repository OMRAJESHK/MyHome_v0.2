﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MyHomeDataAccess;

namespace MyHome_v0._2.Controllers
{
    [Authorize]
    public class TransactionsController : ApiController
    {
         private readonly MyHomeDBEntities entities = new MyHomeDBEntities();
        public IEnumerable<Transaction> GetTransactions() {
            using (MyHomeDBEntities entities = new MyHomeDBEntities()) {
                return entities.Transactions.ToList();
            }
        }
        [HttpGet]
         public HttpResponseMessage GetTransaction(int AssetName,DateTime trnFrom, DateTime trnTo,int type) {
            string[] empty= new string[0];
            var getValidData = entities.Transactions.Where(x => x.AssetName == AssetName && x.Date >= trnFrom && x.Date <= trnTo).ToList();
             if (type == 2){
                getValidData = entities.Transactions.Where(x => x.AssetName == AssetName && x.Date >= trnFrom && x.Date <= trnTo && x.TransactionType == type).ToList();
            }
            try { 
                 if (getValidData == null){
                    return Request.CreateResponse(HttpStatusCode.OK, empty);
                 }
                 return Request.CreateResponse(HttpStatusCode.OK, getValidData);
             }catch(Exception ex){
                 return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
             } 
         }
        [HttpGet]
         public HttpResponseMessage GetTransactionByDate(DateTime From, DateTime To) {
            var getValidData = entities.Transactions.Where(x => x.Date >= From && x.Date <= To).ToList();
             try { 
                 if (getValidData == null){
                    return Request.CreateResponse(HttpStatusCode.NotFound, getValidData);
                 }
                 return Request.CreateResponse(HttpStatusCode.OK, getValidData);
             }catch(Exception ex){
                 return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
             } 
         }
        [HttpPost]
         public HttpResponseMessage PostTransaction(Transaction transaction) {
             try {
                if (transaction.TransactionType == 2) {
                    var currdate = transaction.Date.ToString().Substring(3, 7);         
                    var getRow = entities.Transactions.Where(x => x.TransactionType == transaction.TransactionType && x.AssetName == transaction.AssetName).FirstOrDefault();
                    if (getRow == null) { 
                        entities.Transactions.Add(transaction);
                        entities.SaveChanges();
                        entities.Transactions.Add(transaction);
                        var message=Request.CreateResponse(HttpStatusCode.Created, transaction);
                        return message;
                    } else {
                        var dbdate = getRow.Date.ToString().Substring(3, 7);
                        if (dbdate == currdate) {
                            return Request.CreateResponse(HttpStatusCode.MethodNotAllowed, "Current Month Rent Transaction already Exists");
                        } else {
                            entities.Transactions.Add(transaction);
                            entities.SaveChanges();
                            entities.Transactions.Add(transaction);
                            var message=Request.CreateResponse(HttpStatusCode.Created, true);
                            return message;
                        }
                    }
                } else { 
                    entities.Transactions.Add(transaction);
                    entities.SaveChanges();
                    var message=Request.CreateResponse(HttpStatusCode.Created, transaction);
                    return message;
                }
                
             }catch(Exception ex){
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
             } 
         }
        [HttpPut]
        public HttpResponseMessage PutTransaction(int id,[FromBody]Transaction transaction) {
            try {
                var entity = entities.Transactions.FirstOrDefault(x => x.TransactionId == id);
                if (entity == null) {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, id.ToString());
                } else {
                    entity.AssetName = transaction.AssetName;
                    entity.Description = transaction.Description;
                    entity.TransactionType = transaction.TransactionType;
                    entity.Amount = transaction.Amount;
                    entity.Date = transaction.Date;
                    entity.CutOffDate = transaction.CutOffDate;
                    entity.TransactionMode = transaction.TransactionMode;
                    entity.PaidBy = transaction.PaidBy;
                    entity.PaidTo = transaction.PaidTo;
                    entity.Status = transaction.Status;
                    entity.Remarks = transaction.Remarks;
                    entities.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.OK, entity);
                }
            } catch (Exception ex) {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [HttpDelete]
        public HttpResponseMessage DeleteTransaction(int id) {
            try {
                var entity = entities.Transactions.FirstOrDefault(x => x.TransactionId == id);
                if (entity == null) {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound,id.ToString()+" Not Found");
                } else { 
                    entities.Transactions.Remove(entity);
                    entities.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.OK, id.ToString());
                }
            } catch (Exception ex) {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }
    }
}
