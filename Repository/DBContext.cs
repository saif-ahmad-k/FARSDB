using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using FMS.Common;
using FMS.Common.Entities;

namespace FMS.Repository
{
    public partial class DBContext : DbContext
    {
        public virtual DbSet<Users> Users { get; set; }
        public virtual DbSet<UserRoles> UserRoles { get; set; }
        public virtual DbSet<VehicleFars> VehicleFars { get; set; }

        public DBContext()
        {

        }

        public DBContext(DbContextOptions<DBContext> options)
            : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(AppSettings.ConnectionStringDefault);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Users>(entity =>
                       {
                           entity.HasKey(e => e.Id);

                           entity.HasIndex(e => e.Id)
                               .HasName("UQ__Users__0000000000000245")
                               .IsUnique();
                       });
        }
    }
}
