

export class DbSetting {
    public constructor(init?: Partial<DbSetting>) {
        Object.assign(this, init);
    }

    id: number;
    key: string;
    value: string;
    defaultValue: string;
}