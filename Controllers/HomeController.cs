using System.Net;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using FMS.Common;
using FMS.Common.Contracts;

namespace FMS.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger _logger;
        private readonly IStorage _storage;

        public HomeController(IStorage storage, ILogger<HomeController> logger)
        {
            this._storage = storage;
            this._logger = logger;
        }

        public ActionResult Index()
        {
            return View();
        }
    }
}