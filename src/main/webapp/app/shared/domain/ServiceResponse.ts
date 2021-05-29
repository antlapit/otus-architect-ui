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
    content: any[],
    totalElements: number,
    sort: any,
    pageable: any,

    first: boolean,
    last: boolean,
    number: 0,
    numberOfElements: number,
    size: number,
    totalPages: number) {}
}
