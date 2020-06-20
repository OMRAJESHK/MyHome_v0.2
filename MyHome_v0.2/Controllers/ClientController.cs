using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MyHomeDataAccess;

namespace MyHome_v0._2.Controllers
{
    [Authorize]
    public class ClientController : ApiController
    {
        // public IEnumerable<Registration> Get() {
        //    using (MyHomeDBEntities entities=new MyHomeDBEntities()) {
        //        return entities.Registrations.ToList();
        //    }
        //}
    }
}
