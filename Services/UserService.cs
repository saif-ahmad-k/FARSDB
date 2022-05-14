using Hangfire;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FMS.Common;
using FMS.Common.Entities;
using FMS.Repository;
using FMS.Services.Core;
using System;

namespace FMS.Services
{
    public class UserService : IUserService
    {
        // private readonly CacheHelper _cacheHelper;
        private readonly ILogger<UserService> _logger;
        private readonly IUserRepository _userRepository;

        public UserService(
            // CacheHelper cache,
            ILogger<UserService> logger,
            IUserRepository userRepository
        )
        {
            _userRepository = userRepository;
            // _cacheHelper = cache;
            _logger = logger;
        }

        public async Task<Users> Authenticate(string email, string password)
        {
            return await _userRepository.Authenticate(email, password);
        }

        public async Task<Users> GetUserById(int id)
        {
            Users user;

            user = _userRepository.GetById(id);
         
            return await Task.FromResult<Users>(user);
        }

        public async Task<IEnumerable<Users>> GetAllUsers()
        {
            var listUsers = await _userRepository.GetAllUsers();

            return await Task.FromResult<IEnumerable<Users>>(listUsers);
        }

        public async Task<ViewModelVehicleListing> GetVehicleListing(Pager pagination)
        {
            var listVehicles = await _userRepository.GetVehicleListing(pagination);

            // if (pagination.SortDirection == (int)SortDirection.Asc)
            // {
            //     listUsers.User = listUsers.User.Where(x => x.FullName.ContainsIgnoreCase(pagination.FilterText) || string.IsNullOrEmpty(pagination.FilterText)).OrderBy(pagination.SortByField).ToList();
            // }
            // else if (pagination.SortDirection == (int)SortDirection.Desc)
            // {
            //     listUsers.User = listUsers.User.Where(x => x.FullName.ContainsIgnoreCase(pagination.FilterText) || string.IsNullOrEmpty(pagination.FilterText)).OrderBy((pagination.SortByField + " Desc")).ToList();
            // }
            //  listVehicles.Vehicle = listVehicles.Vehicle.Where(x => x.DATA_YEAR.ContainsIgnoreCase(pagination.FilterText) || string.IsNullOrEmpty(pagination.FilterText)).ToList();

            // listVehicles.Count = listVehicles.Vehicle.Count();
            // listVehicles.Vehicle = listVehicles.Vehicle.Skip(pagination.SkipBy).Take(pagination.PageSize).ToList();
            return listVehicles;
        }

        public async Task<int> DeleteUser(int userId, int deletedBy)
        {
            var user = await _userRepository.DeleteUser(userId, deletedBy);

            return user.Id;
        }
          public async Task<int> UploadData(List<VehicleFars> vehicleFars)
        {
            var rowsAffected = await _userRepository.UploadData(vehicleFars);

            return await Task.FromResult<int>(rowsAffected);
        }

    }
}
