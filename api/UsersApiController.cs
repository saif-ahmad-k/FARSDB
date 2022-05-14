using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using FMS.Services;
using FMS.Services.Core;
using FMS.Common.Entities;
using Microsoft.AspNetCore.Authorization;
using FMS.Common;
using System.IO;
using ExcelDataReader;

namespace FMS.Api
{
    [Route("api/users")]
    public class UsersApiController : BaseController
    {
        private readonly ILogger _logger;
        private IUserService _userService;

        public UsersApiController(
            ILogger<UsersApiController> logger,
            IUserService userService
            )
        {
            _userService = userService;
            _logger = logger;
        }

        [AllowAnonymous, HttpPost("auth")]
        public async Task<IActionResult> AuthenticateUser([FromBody] Users user)
        {
            if (user == null || string.IsNullOrEmpty(user.Email) || string.IsNullOrEmpty(user.Password))
            {
                return BadRequest("Something went wrong");
            }

            var response = await _userService.Authenticate(user.Email, user.Password);

            if (response == null)
            {
                return Unauthorized();
            }

            return Ok(new { jwt = Jwt.Create(response), user = response, role = response.UserRoles });
        }

        [Authorize(Roles = "Admin,SuperAdmin"), HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            if (id < 1)
            {
                return BadRequest();
            }

            var user = await _userService.GetUserById(id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [Authorize(Roles = "Admin,SuperAdmin"), HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            return Ok(await _userService.GetAllUsers());
        }

        [Authorize(Roles = "Admin,SuperAdmin"), HttpPost]
        public async Task<IActionResult> GetVehicleListing([FromBody] Pager pagination)
        {
            return Ok(await _userService.GetVehicleListing(pagination));
        }

        [Authorize(Roles = "Admin,SuperAdmin"), HttpDelete("{UserId}")]
        public async Task<IActionResult> DeleteUser(int userId)
        {
            int deletedBy = this.User.GetUserId();

            int rowsAffected = await _userService.DeleteUser(userId, deletedBy);

            return Ok(rowsAffected > 0);
        }

        [Authorize(Roles = "Admin,SuperAdmin"), HttpPost("Register")]
     

        // [AllowAnonymous, HttpGet("fileUpload")]
        public async Task<IActionResult> UploadExcelData()
        {
            List<VehicleFars> vehicles = new List<VehicleFars>();
            var fileName = "./FARSDATABASE/FARS2021NationalCSV/vehicle_2021_211121_Done.CSV";
            System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);
            using (var stream = System.IO.File.Open(fileName, FileMode.Open, FileAccess.Read))
            {
                using (var reader = ExcelReaderFactory.CreateCsvReader(stream))
                {

                    while (reader.Read()) //Each row of the file
                    {
                        vehicles.Add(new VehicleFars
                        {
                            STATENAME = reader.GetValue(0).ToString(),
                            MAKE_ID = reader.GetValue(1).ToString(),
                            MAKENAME = reader.GetValue(2).ToString(),
                            MODEL_ID = reader.GetValue(3).ToString(),
                            MAK_MOD = reader.GetValue(4).ToString(),
                            MAK_MODNAME = reader.GetValue(5).ToString(),
                            MOD_YEAR = reader.GetValue(6).ToString(),
                            M_HARNAME = reader.GetValue(7).ToString(),
                            DR_PRES = reader.GetValue(8).ToString(),
                            L_STATUSNAME = reader.GetValue(9).ToString(),
                            L_TYPENAME = reader.GetValue(10).ToString(),
                            DEATHS = reader.GetValue(11).ToString(),
                            // MODEL = reader.GetValue(2).ToString(),
                            DATA_YEAR = "2021"
                        });
                    }
                }
            }
            // int rowsAffected = await _userService.UploadData(vehicles);

            // _cacheHelper.Flush();

            // BackgroundJob.Enqueue(() => _cacheService.LoadApplicationCache());

            return Ok(new { rowsAffected = 1 });
        }

    }
}