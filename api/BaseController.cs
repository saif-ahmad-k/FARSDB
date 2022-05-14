using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace FMS.Api
{
    public class BaseController : Controller
    {
        public int TenantId => this.User.GetTenantId();
        public int UserId => this.User.GetUserId();

    }
}