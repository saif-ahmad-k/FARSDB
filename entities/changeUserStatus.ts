

export class ChangeUserStatus {
    public constructor(init?: Partial<ChangeUserStatus>) {
        Object.assign(this, init);
    }

    userId : number;
    status : number;
}



export class ChangeReturnStatus {
    public constructor(init?: Partial<ChangeUserStatus>) {
        Object.assign(this, init);
    }

    purchaseId : number;
    status : number;
}