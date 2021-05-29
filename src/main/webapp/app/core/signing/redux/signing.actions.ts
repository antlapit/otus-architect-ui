import {Action} from '@ngrx/store';
import {ServiceResponse} from "../../../shared/domain/ServiceResponse";

export enum SigningActionTypes {
    LoadFilesByCredentials = '[Signing] LoadFilesByCredentials',
    HandleFilesByCredentials = '[Signing] HandleFilesByCredentials',
    ClearFilesByCredentials = '[Signing] ClearFilesByCredentials',
    SignFileByCredentials = '[Signing] SignFileByCredentials',
    HandleSignFileByCredentials = '[Signing] HandleSignFileByCredentials',
}

export class LoadFilesByCredentials implements Action {
    readonly type = SigningActionTypes.LoadFilesByCredentials;

    constructor(public payload: {
        key: string;
        code: string;
        captcha: string
    }) {}
}
export class HandleFilesByCredentials implements Action {
    readonly type = SigningActionTypes.HandleFilesByCredentials;

    constructor(public response: ServiceResponse) {}
}

export class ClearFilesByCredentials implements Action {
    readonly type = SigningActionTypes.ClearFilesByCredentials;
}

export class SignFileByCredentials implements Action {
    readonly type = SigningActionTypes.SignFileByCredentials;

    constructor(public payload: {
        key: string;
        code: string;
        fileId: string,
        sign: string
    }) {}
}
export class HandleSignFileByCredentials implements Action {
    readonly type = SigningActionTypes.HandleSignFileByCredentials;

    constructor(public response: ServiceResponse) {}
}

export type SigningActionsUnion =
    | LoadFilesByCredentials
    | HandleFilesByCredentials
    | ClearFilesByCredentials
    | SignFileByCredentials
    | HandleSignFileByCredentials;
