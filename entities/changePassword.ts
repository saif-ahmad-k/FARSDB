

export class ChangePassword {
    public constructor(init?: Partial<ChangePassword>) {
        Object.assign(this, init);
    }

    id : number;
    current : string;
    new : string;
    isemail : boolean;
}

export class ResetPassword {
    public constructor(init?: Partial<ResetPassword>) {
        Object.assign(this, init);
    }

    guid : string;
    // current : string;
    new : string;
    token: string;

}