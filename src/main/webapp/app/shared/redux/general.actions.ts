import {Action} from '@ngrx/store';
import {Workspace} from '../domain/Workspace';
import {ErrorScope} from '../domain/ErrorScope';
import {ErrorCode} from '../domain/ErrorCode';
import {UserIdentity} from '../../core/domain/UserIdentity';
import {ServiceResponse} from '../domain/ServiceResponse';
import {ApplicationMessage, ApplicationRoutingMessage} from '../domain/ApplicationMessage';

export enum GeneralActionTypes {
    LoadWorkspace = '[General] Load Workspace',
    HandleWorkspace = '[General] Handle Workspace',
    DiscardWorkspace = '[General] Discard Workspace',
    HandleError = '[General] Handle error',
    LoadUserInfo = '[General] Load User Info',
    ModifyUserInfo = '[General] Modify User Info',
    HandleUserInfo = '[General] Handle User Info',
    RedirectAfterLogin = 'General Redirect After Login',
    RedirectAfterLogout = 'General Redirect After Logout',
    LoadCategories = '[General] LoadCategories',
    HandleCategories = '[General] HandleCategories',
    ShowGeneralMessage = '[General] ShowGeneralMessage',
    ShowGeneralToastMessage = '[General] ShowGeneralToastMessage',
    ShowRoutingToastMessage = '[General] ShowRoutingToastMessage',
}

/** Загрузить Workspace */
export class LoadWorkspace implements Action {
    readonly type = GeneralActionTypes.LoadWorkspace;
}

/** Обработать загруженый Workspace */
export class HandleWorkspace implements Action {
    readonly type = GeneralActionTypes.HandleWorkspace;

    constructor(public payload: {workspace: Workspace}) {}
}

/** Очистить данные о Workspace пользовтеля */
export class DiscardWorkspace implements Action {
    readonly type = GeneralActionTypes.DiscardWorkspace;
}

/** Старт обработки обнаруженной ошибки бизнесс-процесса. */
export class HandleError implements Action {
    readonly type = GeneralActionTypes.HandleError;
    constructor(public payload: {scope: ErrorScope, code: ErrorCode, data?: any}) {}
}

/** Загрузить данные текущего пользователя */
export class LoadUserInfo implements Action {
    readonly type = GeneralActionTypes.LoadUserInfo;
}

/** Изменить данные текущего пользователя */
export class ModifyUserInfo implements Action {
    readonly type = GeneralActionTypes.ModifyUserInfo;

    constructor(public payload: { userInfo: UserIdentity }) {}
}

/** Обработать загруженый профиль */
export class HandleUserInfo implements Action {
    readonly type = GeneralActionTypes.HandleUserInfo;

    constructor(public payload: { userInfo: UserIdentity }) {}
}

export class RedirectAfterLogin implements Action {
    readonly type = GeneralActionTypes.RedirectAfterLogin;
}

export class RedirectAfterLogout implements Action {
    readonly type = GeneralActionTypes.RedirectAfterLogout;
}

export class LoadCategories implements Action {
    readonly type = GeneralActionTypes.LoadCategories;
}

export class HandleCategories implements Action {
    readonly type = GeneralActionTypes.HandleCategories;

    constructor(public response: ServiceResponse) {}
}

export class ShowGeneralMessage implements Action {
    readonly type = GeneralActionTypes.ShowGeneralMessage;

    constructor(public message: ApplicationMessage) {}
}

export class ShowGeneralToastMessage implements Action {
    readonly type = GeneralActionTypes.ShowGeneralToastMessage;

    constructor(public message: ApplicationMessage) {}
}

export class ShowRoutingToastMessage implements Action {
    readonly type = GeneralActionTypes.ShowRoutingToastMessage;

    constructor(public payload: ApplicationRoutingMessage) {}
}

export type GeneralActionsUnion =
    | HandleWorkspace
    | LoadWorkspace
    | DiscardWorkspace
    | HandleError
    | LoadUserInfo
    | ModifyUserInfo
    | HandleUserInfo
    | RedirectAfterLogin
    | RedirectAfterLogout
    | LoadCategories
    | HandleCategories
    | ShowGeneralMessage
    | ShowGeneralToastMessage
    | ShowRoutingToastMessage;
