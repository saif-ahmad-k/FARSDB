
using System;
using FMS.Common.Contracts;

namespace FMS.Common.Entities
{
    public class UserRoles : IEntity
    {
        public int Id { get; set; }
        public int UsersId { get; set; }
        public int RolesId { get; set; }
    }
}