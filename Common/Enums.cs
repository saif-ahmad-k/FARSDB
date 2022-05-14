using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FMS.Common
{
    [Serializable]
    public enum BuildMode
    {
        None = 0,
        Dev = 1,
        Production = 2,
        Staging = 3
    }

    public enum TransactionType
    {
        None = 0,
        Open = 1,
        Commit = 2,
        Rollback = 3
    }

    public enum Status
    {
        All = 0,
        Active = 1,
        Locked = 2,
        Pending = 3
    }

    public enum EmailStatus
    {
        None = 0,
        Pending = 1,
        Sent = 2
    }

    public enum Roles
    {
        SuperAdmin = 1,
        Admin = 2,
        Commercial = 3,
        Private = 4
    }

    public enum EmailType
    {
        PasswordReset = 1,
    }


    public enum SortFields
    {
        None = 0,
        CreateStamp = 1,
        Name = 2,
        SalutationId = 3,
        FirstName = 5,
        LastName = 6,
        PostalCode = 7,
        Street = 8,
        Email = 9,
        Location = 10,
        HouseNumber = 11,
        PhoneNumber = 12,
        ContactByWhatsapp = 13,
        ContactByEmail = 14,
        Id = 15,
        NumberOfPeople = 16,
        RentedFrom = 17,
        LastIncrease = 18,
        FullName = 19,
        StatusId = 20,


    }

    public enum SortDirection
    {
        Asc = 1,
        Desc = 2
    }


}
