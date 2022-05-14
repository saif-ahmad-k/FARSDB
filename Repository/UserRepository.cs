
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FMS.Common;
using FMS.Common.Entities;
using FMS.Repository.Core;
using Microsoft.EntityFrameworkCore;

namespace FMS.Repository
{
    public class UserRepository : Repository<Users, DBContext>, IUserRepository
    {
        // private readonly CacheHelper _cacheHelper;

        public UserRepository(
                    DBContext context
                    // CacheHelper cacheHelper
                    ) : base(context)
        {
            // _cacheHelper = cacheHelper;
        }

        /// <summary>
        /// Authenticate the user and return user object
        /// </summary>
        /// <param name="login">Login</param>
        /// <param name="password">Password</param>
        /// <returns>User Object</returns>
        public async Task<Users> Authenticate(string email, string password)
        {
            password = Encryption.Encrypt(password);

            var user = _context.Users.Include(x => x.UserRoles).AsNoTracking().SingleOrDefault(x =>
                                   x.Email.Equals(email) && x.Password.Equals(password)
                                   && x.StatusId == (int)Status.Active
                                   && !x.IsDeleted
                                  );

            return await Task.FromResult(user);

        }

        public async Task<List<Users>> GetAllUsers()
        {
            var listUsers = _context.Users.Include(x => x.UserRoles).AsNoTracking().Select(x =>
                                new Users()
                                {
                                    Id = x.Id,
                                    FullName = x.FullName,
                                    Email = x.Email,
                                    StatusId = x.StatusId,
                                    CreateStamp = x.CreateStamp,
                                }).AsNoTracking().ToList();

            return await Task.FromResult(listUsers);
        }

        public async Task<ViewModelVehicleListing> GetVehicleListing(Pager pagination)
        {
            ViewModelVehicleListing listVehicles = new ViewModelVehicleListing();
            var vehicles = _context.VehicleFars.Where(x => x.DATA_YEAR.ContainsIgnoreCase(pagination.FilterText) || string.IsNullOrEmpty(pagination.FilterText)).AsNoTracking().Select(x =>
                                  new ViewVehicleListing()
                                  {
                                      Id = x.Id,
                                    STATENAME = x.STATENAME,
                                    MAKENAME = x.MAKENAME,
                                    MODEL = x.MODEL,
                                    MAK_MODNAME = x.MAK_MODNAME,
                                    MOD_YEAR = x.MOD_YEAR,
                                    M_HARNAME = x.M_HARNAME,
                                    DR_PRES = x.DR_PRES,
                                    L_TYPENAME = x.L_TYPENAME,
                                    L_STATUSNAME = x.L_STATUSNAME,
                                    DEATHS = x.DEATHS,
                                    DATA_YEAR = x.DATA_YEAR,
                                  }).AsNoTracking().Skip(pagination.SkipBy).Take(pagination.PageSize).ToList();

            listVehicles.Vehicle = vehicles;
            listVehicles.Count = _context.VehicleFars.Where(x => x.DATA_YEAR.ContainsIgnoreCase(pagination.FilterText) || string.IsNullOrEmpty(pagination.FilterText)).AsNoTracking().Count();
            
            return await Task.FromResult(listVehicles);
        }


        public async Task<Users> DeleteUser(int userId, int deletedBy)
        {
            var user = _context.Users.SingleOrDefault(x => x.Id == userId);

            user.IsDeleted = true;
            user.DeletedBy = deletedBy;
            user.DeleteStamp = DateTime.UtcNow;
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<int> RegisterUser(Users user)
        {
            if (user.Id == 0)
            {
                var entityCheck = _context.Users.AsNoTracking().FirstOrDefault(item => (item.UserName == user.UserName || item.Email == user.Email) && !item.IsDeleted);
                if (entityCheck != null)
                {
                    return await Task.FromResult(-1);
                }
                else
                {
                    _context.Users.Add(user);
                    await _context.SaveChangesAsync();
                    return user.Id;
                }
            }
            else if (user.Id != 0)
            {
                var entityCheck = _context.Users.AsNoTracking().FirstOrDefault(item => (item.UserName == user.UserName || item.Email == user.Email) && item.Id != user.Id && !item.IsDeleted);
                if (entityCheck != null)
                {
                    return await Task.FromResult(-1);
                }
                else
                {
                    var entity = _context.Users.SingleOrDefault(item => item.Id == user.Id && !item.IsDeleted);
                    entity.FullName = user.FullName;
                    entity.Email = user.Email;
                    entity.UserName = user.UserName;
                    entity.UpdatedBy = user.UpdatedBy;
                    entity.UpdateStamp = user.UpdateStamp;
                    _context.Users.Update(entity);
                    await _context.SaveChangesAsync();
                    return user.Id;
                }
            }
            else
            {
                return await Task.FromResult(-1);
            }
        }

        public async Task<int> SaveUserRole(UserRoles roles)
        {
            var entityCheck = _context.UserRoles.AsNoTracking().Where(item => item.UsersId == roles.UsersId).ToList();
            _context.UserRoles.RemoveRange(entityCheck);
            _context.UserRoles.AddRange(roles);
            var id = await _context.SaveChangesAsync();
            return id;

        }

         public async Task<int> UploadData(List<VehicleFars> vehicleFars)
        {
            
            _context.VehicleFars.AddRange(vehicleFars);
            await _context.SaveChangesAsync();
            return vehicleFars.Count();

        }
    }



}
