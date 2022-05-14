using System;
using System.Linq;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;

namespace FMS.Repository
{
    public static class EfExtensions
    {
        public static T AddIfNotExists<T>(this DbSet<T> dbSet, T entity, Expression<Func<T, bool>> predicate) where T : class, new()
        {
            var dbEntity = dbSet.FirstOrDefault(predicate);

            if (dbEntity == null)
                dbSet.Add(entity);

            return dbEntity;
        }
    }
}
