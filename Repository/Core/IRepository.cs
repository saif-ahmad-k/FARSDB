using System.Collections.Generic;
using System.Threading.Tasks;
using FMS.Common.Contracts;

namespace FMS.Repository.Core
{
    // https://dotnettutorials.net/lesson/repository-pattern-implementation-guidelines-csharp/
    // https://github.com/kilicars/AspNetCoreRepositoryPattern
    public interface IRepository<T> where T : class, IEntity
    {
        Task<T> AddAndSave(T entity);
        Task<T> UpdateAndSave(T entity);
        Task<T> DeleteAndSave(int id);
        IEnumerable<T> GetAll();
        Task<List<T>> GetAllAsync();
        T GetById(object id);
        void Insert(T obj);
        void Update(T obj);
        void Delete(object id);
        void Save();
    }
}
