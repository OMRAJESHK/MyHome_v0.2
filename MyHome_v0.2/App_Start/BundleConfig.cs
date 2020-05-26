using System.Web;
using System.Web.Optimization;

namespace MyHome_v0._2 {
    public class BundleConfig {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles) {

            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/Jquery/jQuery.js"));
             bundles.Add(new ScriptBundle("~/Scripts").Include(
                        "~/Scripts/Jquery/jQuery.js",
                        "~/Scripts/src/Registration.js",
                        "~/Scripts/src/Login.js",
                        "~/Scripts/RestAPI/ApiDirectory.js",
                        "~/Scripts/RestAPI/ManageAjax.js"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/Bootstrap/bootstrap.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/Bootstrap4/css/bootstrap.css",
                      "~/Content/site.css"));
            bundles.Add(new ScriptBundle("~/bundles/Mainjs").Include(
                      "~/Scripts/Global.js"));

        }
    }
}
