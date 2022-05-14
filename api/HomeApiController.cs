using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using FMS.Services.Core;
using FMS.Common;
using FMS.Services;
using Hangfire;
using System.Collections.Generic;
using FMS.Common.Entities;
using System.IO;
using ExcelDataReader;

namespace FMS.Api
{
    [Route("api")]
    public class HomeApiController : BaseController
    {
        private readonly ILogger _logger;
        // private readonly CacheHelper _cacheHelper;
        // private readonly CacheService _cacheService;

        public HomeApiController(
            ILogger<UsersApiController> logger
            // CacheHelper cache,
            // CacheService cacheService
            )
        {
            _logger = logger;
            // _cacheHelper = cache;
            // _cacheService = cacheService;
        }

        [HttpGet("healthcheck")]
        public IActionResult GetHealthCheck()
        {
            
            return Ok(new { Version = AppSettings.AppVersion });
        }

        [HttpGet("cache/burst")]
        public IActionResult BurstCache()
        {
            // _cacheHelper.Flush();

            // BackgroundJob.Enqueue(() => _cacheService.LoadApplicationCache());

            return Ok(new { Cache = "ok"});
        }


        //   [HttpGet("fileUpload")]
        public IActionResult UploadExcelData()
        {
                List<VehicleFars> vehicles = new List<VehicleFars>();
                var fileName = "./FARSDATABASE/FARS2008NationalCSV/VEHICLE_2008_Done.CSV";
                System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);
// using (var stream = System.IO.File.Open(fileName, FileMode.Open, FileAccess.Read))
//     {
//         using (var reader = ExcelReaderFactory.CreateCsvReader(stream))
//         {
                    
//             while (reader.Read()) //Each row of the file
//             {
//                 vehicles.Add(new VehicleFars
//                 {
//                     STATENAME = reader.GetValue(0).ToString(),
//                     MAKENAME = reader.GetValue(1).ToString(),
//                     MODEL = reader.GetValue(2).ToString(),
//                     MAK_MOD = reader.GetValue(3).ToString(),
//                     MOD_YEAR = reader.GetValue(4).ToString(),
//                     M_HARNAME = reader.GetValue(5).ToString(),
//                     DR_PRES = reader.GetValue(6).ToString(),
//                     L_TYPENAME = reader.GetValue(7).ToString(),
//                     DEATHS = reader.GetValue(8).ToString(),

// });
// }
// }
// }
            // _cacheHelper.Flush();

            // BackgroundJob.Enqueue(() => _cacheService.LoadApplicationCache());

            return Ok(new { Cache = "ok"});
        }




    }
}