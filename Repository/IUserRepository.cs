using System.Collections.Generic;
using System.Threading.Tasks;
using FMS.Common.Entities;
using FMS.Repository.Core;

namespace FMS.Repository
{
    public interface IUserRepository : IRepository<Users>
    {
        Task<Users> Authenticate(string email, string password);
        Task<List<Users>> GetAllUsers();
        Task<ViewModelVehicleListing> GetVehicleListing(Pager pagination);
        Task<Users> DeleteUser(int userId, int deletedBy);
        Task<int> RegisterUser(Users user);
        Task<int> SaveUserRole(UserRoles roles);
        Task<int> UploadData(List<VehicleFars> vehicleFars);


    }
}
