using System.Collections.Generic;
using System.Threading.Tasks;
using FMS.Common.Entities;

namespace FMS.Services.Core
{
    public interface IUserService
    {
        Task<Users> Authenticate(string email, string password);
        Task<IEnumerable<Users>> GetAllUsers();
        Task<ViewModelVehicleListing> GetVehicleListing(Pager pagination);
        Task<Users> GetUserById(int id);
        Task<int> DeleteUser(int userId, int deletedBy);
        Task<int> UploadData(List<VehicleFars> vehicleFars);


    }
}
