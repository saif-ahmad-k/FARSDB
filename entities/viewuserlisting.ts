

export class ViewUserListing {
    public constructor(init?: Partial<ViewUserListing>) {
        Object.assign(this, init);
    }

    id: number;
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    roleId: number;
    statusId: number;
    createStamp:Date;
}


export class ViewSaveUser {
    public constructor(init?: Partial<ViewSaveUser>) {
        Object.assign(this, init);
    }

    id: number;
    fullName: string;
    email: string;
    password:string;
    roleId:number;
}