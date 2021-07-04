using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MyHome_v0._2.Controllers
{
    public class TenentController : Controller
    {
        // GET: Tenent
        public ActionResult _allTransactions() {
            return View();
        }
        public ActionResult _tenentDashboard() {
            return View();
        }
        public ActionResult _tenentDetails() {
            return View();
        }
        public ActionResult _houseDetails() {
            return View();
        }
        public ActionResult _emrcyContact() {
            return View();
        }
        public ActionResult _proximity() {
            return View();
        }
        public ActionResult _raiseRequest() {
            return View();
        }
        public ActionResult _AllNotification() {
            return View();
        }
        public ActionResult _TenantAgreementView() {
            return View();
        }
        public ActionResult _SetReminder() {
            return View();
        }
    }
}