export class Pager {
    public constructor(init?: Partial<Pager>) {
        Object.assign(this, init);
    }

    selectItemsPerPage: number[] = [300, 500, 1000];
    pageSize = 300;
    pageIndex: number = 1;
    allItemsLength: number = 0;
    sortBy: number;
    filterBy:number
    filterText:string;
    sortDirection: number ;

}