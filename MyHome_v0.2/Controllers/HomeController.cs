using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;

namespace MyHome_v0._2.Controllers {

    public class HomeController : Controller {
          public ActionResult Index() {
            ViewBag.Title = "Home Page";
            return View();
        }
         //[Authorize(Roles="admin")]
        public ActionResult Test() {
            return View();
        }
          
    }
}
