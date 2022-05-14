using System;
using Microsoft.EntityFrameworkCore;
using FMS.Common;

namespace FMS.Repository
{
    public interface IContextFactory
    {
         DBContext Create();
    }

    public class ContextFactory : IContextFactory
    {
        public DBContext Create()
        {
            var options = new DbContextOptionsBuilder<DBContext>()
            .UseSqlServer(AppSettings.ConnectionStringDefault)
            .Options;

            return new DBContext(options);
        }
    }
}
