

export class User {
    public constructor(init?: Partial<User>) {
        Object.assign(this, init);
    }

    id: number;
    fullName: string;
    email: string;
    password: string;
    statusId: number;
}