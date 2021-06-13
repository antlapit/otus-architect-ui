import {Action} from '@ngrx/store';
import {ServiceResponse} from "../../../shared/domain/ServiceResponse";

export enum AuthActionTypes {
    Login = '[Auth] Login',
    Logout = '[Auth] Logout',
    LoginSuccess = '[Auth] Login Success',
    LogoutSuccess = '[Auth] Logout Success',
    Authenticate = '[Auth] Authenticate',
    HandleAuthenticate = '[Auth] Handle Authenticate',
    ReloadAuthenticate = '[Auth] Reload Authenticate',
}

export class Login implements Action {
    readonly type = AuthActionTypes.Login;
}

export class LoginSuccess implements Action {
    readonly type = AuthActionTypes.LoginSuccess;
    constructor() { }
}

export class Logout implements Action {
    readonly type = AuthActionTypes.Logout;
}

export class LogoutSuccess implements Action {
    readonly type = AuthActionTypes.LogoutSuccess;
}

/** Получить SMS для входа */
export class Authenticate implements Action {
    constructor(public formValues: any) {}

    readonly type = AuthActionTypes.Authenticate;
}

/** Обработать ответ на запрос аутентификации */
export class HandleAuthenticate implements Action {
    readonly type = AuthActionTypes.HandleAuthenticate;

    constructor(public response: ServiceResponse) {}
}

export class ReloadAuthenticate implements Action {
    constructor(public phoneNumber: string) {}

    readonly type = AuthActionTypes.ReloadAuthenticate;
}

export type AuthActionsUnion =
    | Login
    | LoginSuccess
    | Logout
    | LogoutSuccess
    | Authenticate
    | HandleAuthenticate
    | ReloadAuthenticate;
