

export enum Pages {
    None = 0,
    UserListing = 3,
    Tenants = 5,

}

export enum MessageBoxButton {
    OK = 0,
    OKCancel = 1,
    YesNoCancel = 3,
    YesNo = 4
}

export enum MessageBoxImage {
    None = 0,
    Hand = 16,
    Stop = 16,
    Error = 16,
    Question = 32,
    Exclamation = 48,
    Warning = 48,
    Asterisk = 64,
    Information = 64
}

export enum PageAccessType {
    PUBLIC = 0,
    PRIVATE = 1
}


export enum SortFields {
    CreateStamp = 1,
    Name = 2,
    SalutationId = 3,
    FirstName = 5,
    LastName = 6,
    PostalCode = 7,
    Street = 8,
    Email = 9,
    Location= 10,
    HouseNumber = 11,
    PhoneNumber = 12,
    ContactByWhatsapp = 13,
    ContactByEmail = 14,
    Id = 15,
    NumberOfPeople = 16,
    RentedFrom = 17,
    LastIncrease= 18,
    FullName = 19,
    StatusId = 20,

}

export enum SortDirection {
    Asc = 1,
    Desc = 2
}

export enum SideMenu {
    Dashboard = 1,
    Users = 2,
    Tenants = 3, 
    Admin = 6,
    SuperAdmin = 14

}

export enum Roles {
    SuperAdmin = 1,
    Admin = 2,
    Commercial = 3,
    Private = 4
}

export enum UserStatus {
    All = 0,
    Active = 1,
    Locked = 2,
    Pending = 3
}

