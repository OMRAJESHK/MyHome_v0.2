﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MyHome_v0._2.Controllers
{
    public class AdminController : Controller
    {
        public ActionResult _AssetRegistration() {
            return View();
        }
        public ActionResult _AdminDashboard() {
            return View();
        }
        public ActionResult _TenantDeedRegistration() {
            return View();
        }
        public ActionResult _SaveNotifications() {
            return View();
        }
        public ActionResult _SaveTransactions() {
            return View();
        }
        public ActionResult _SaveProximities() {
            return View();
        }
        public ActionResult _Sendmail() {
            return View();
        }
        public ActionResult _MailLogs() {
            return View();
        }
        public ActionResult _SelectAsset() {
            return View();
        }
        public ActionResult _PropertyTaxLogs() {
            return View();
        }
        public ActionResult _SavePropertyTax() {
            return View();
        }
        public ActionResult _AssetView() {
            return View();
        }
        public ActionResult _AssetListView() {
            return View();
        }
        public ActionResult _SaveEmergancyContact() {
            return View();
        }
        public ActionResult _SaveDocument() {
            return View();
        }
    }
}