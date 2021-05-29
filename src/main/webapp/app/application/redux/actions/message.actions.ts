import {Action} from '@ngrx/store';

export enum MessageTypes {
    HandleMessage = '[Application Message] HandleMessage',
    HandleToastMessage = '[Application Message] HandleToastMessage',
}

export class HandleMessage implements Action {
    readonly type = MessageTypes.HandleMessage;
    constructor(public payload: any) {}
}

export class HandleToastMessage implements Action {
    readonly type = MessageTypes.HandleToastMessage;
    constructor(public payload: any) {}
}

export type MessageActionUnion =
    | HandleMessage
    | HandleToastMessage;

