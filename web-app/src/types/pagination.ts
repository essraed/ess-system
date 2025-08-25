export interface PaginationData {
    pageNumber: number;
    totalCount: number;
    pageSize: number;
    pageCount: number;
}

export interface PagedResponse<T> {
    pageNumber: number;
    totalCount: number;
    pageSize: number;
    pageCount: number;
    data: T;
}


export class PagingParams {
    pageNumber;
    pageSize;

    constructor(pageNumber = 1, pageSize = 15) {
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
    }
}