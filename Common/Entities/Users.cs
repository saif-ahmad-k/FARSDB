
using System;
using System.Collections.Generic;
using FMS.Common.Contracts;

namespace FMS.Common.Entities
{
    public class Users : IEntity
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public int StatusId { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime CreateStamp { get; set; }
        public DateTime? UpdateStamp { get; set; }
        public DateTime? DeleteStamp { get; set; }
        public int? CreatedBy { get; set; }
        public int? UpdatedBy { get; set; }
        public int? DeletedBy { get; set; }
        public UserRoles UserRoles { get; set; }


    }
}