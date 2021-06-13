import {ApplicationMessage} from './ApplicationMessage';

export class ServiceResponse {
    success: boolean;
    httpCode: number;
    data: any;
    message: ApplicationMessage;

    constructor(
        success: boolean,
        httpCode: number,
        message: ApplicationMessage,
        data?: any
    ) {
        this.success = success ? success : false;
        this.httpCode = httpCode;
        this.message = message;
        this.data = data ? data : null;
    }
}

export class Page {
    constructor(
        items: any[],
        page: PageInfo) {
    }
}

export class PageInfo {
    constructor(
        count: number,
        pageNumber: number,
        pageSize: number,
        unpaged: boolean
    ) {
    }
}
