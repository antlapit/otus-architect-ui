export class ApplicationMessage {
    severity: string;
    summary: string;
    detail: string;
}


export class ApplicationRoutingMessage {
    message: string;
    action: string;
    properties: any;
    route: any;
}
