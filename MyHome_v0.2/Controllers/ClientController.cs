using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MyHomeDataAccess;

namespace MyHome_v0._2.Controllers
{
    public class ClientController : ApiController
    {
         public IEnumerable<ClientRegistration> Get() {
            using (MyHomeEntities entities=new MyHomeEntities()) {
                return entities.ClientRegistrations.ToList();
            }
        }
    }
}
