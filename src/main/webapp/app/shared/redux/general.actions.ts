import {Action} from '@ngrx/store';
import {Workspace} from '../domain/Workspace';
import {ErrorScope} from '../domain/ErrorScope';
import {ErrorCode} from '../domain/ErrorCode';
import {ProfileInfo} from '../domain/ProfileInfo';
import {UserIdentity} from '../../core/domain/UserIdentity';
import {Company} from '../../core/domain/Company';
import {ServiceResponse} from '../domain/ServiceResponse';
import {ApplicationMessage, ApplicationRoutingMessage} from '../domain/ApplicationMessage';

export enum GeneralActionTypes {
    LoadWorkspace = '[General] Load Workspace',
    HandleWorkspace = '[General] Handle Workspace',
    DiscardWorkspace = '[General] Discard Workspace',
    HandleError = '[General] Handle error',
    LoadProfileInfo = '[General] Load Profile Info',
    HandleProfileInfo = '[General] Handle Profile Info',
    LoadUserInfo = '[General] Load User Info',
    ModifyUserInfo = '[General] Modify User Info',
    HandleUserInfo = '[General] Handle User Info',
    RedirectAfterLogin = 'General Redirect After Login',
    RedirectAfterLogout = 'General Redirect After Logout',
    LoadCompanyInfo = '[General] Load Company Info',
    HandleCompanyInfo = '[General] Handle Company Info',
    LoadCompanySuggest = '[General] Load Company Suggest',
    HandleCompanySuggest = '[General] Handle Company Suggest',
    ClearCompanySuggest = '[General] Clear Company Suggest',
    LoadBankSuggest = '[General] Load Bank Suggest',
    HandleBankSuggest = '[General] Handle Bank Suggest',
    ClearBankSuggest = '[General] Clear Bank Suggest',
    LoadCountries = '[General] LoadCountries',
    HandleCountries = '[General] HandleCountries',
    LoadAddressSuggest = '[General] Load Address Suggest',
    HandleAddressSuggest = '[General] Handle Address Suggest',
    ClearAddressSuggest = '[General] Clear Address Suggest',
    LoadIdentityDocumentTypes = '[General] LoadIdentityDocumentTypes',
    HandleIdentityDocumentTypes = '[General] HandleIdentityDocumentTypes',
    LoadConfirmStayDocumentTypes = '[General] LoadConfirmStayDocumentTypes',
    HandleConfirmStayDocumentTypes = '[General] HandleConfirmStayDocumentTypes',
    LoadDocAbsenceReasons = '[General] LoadDocAbsenceReasons',
    HandleDocAbsenceReasons = '[General] HandleDocAbsenceReasons',
    LoadTaxationSystems = '[General] LoadTaxationSystems',
    HandleTaxationSystems = '[General] HandleTaxationSystems',
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

/** Загрузить профиль */
export class LoadProfileInfo implements Action {
    readonly type = GeneralActionTypes.LoadProfileInfo;
}

/** Обработать загруженый профиль */
export class HandleProfileInfo implements Action {
    readonly type = GeneralActionTypes.HandleProfileInfo;

    constructor(public payload: {profileInfo: ProfileInfo}) {}
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

/** Загрузить данные текущей компании */
export class LoadCompanyInfo implements Action {
    readonly type = GeneralActionTypes.LoadCompanyInfo;
}

/** Обработать загруженную компанию */
export class HandleCompanyInfo implements Action {
    readonly type = GeneralActionTypes.HandleCompanyInfo;

    constructor(public payload: { companyInfo: Company }) {}
}

/** Загрузить Suggest по компаниям */
export class LoadCompanySuggest implements Action {
    readonly type = GeneralActionTypes.LoadCompanySuggest;

    constructor(public payload: { query: string, count: number }) {}
}

/** Обработать Suggest по компаниям */
export class HandleCompanySuggest implements Action {
    readonly type = GeneralActionTypes.HandleCompanySuggest;

    constructor(public response: ServiceResponse) {}
}

/** Почистить Suggest по компании */
export class ClearCompanySuggest implements Action {
    readonly type = GeneralActionTypes.ClearCompanySuggest;

}

/** Загрузить Suggest по банкам */
export class LoadBankSuggest implements Action {
    readonly type = GeneralActionTypes.LoadBankSuggest;

    constructor(public payload: { query: string, count: number }) {}
}

/** Обработать Suggest по банкам */
export class HandleBankSuggest implements Action {
    readonly type = GeneralActionTypes.HandleBankSuggest;

    constructor(public response: ServiceResponse) {}
}

/** Почистить Suggest по банкам */
export class ClearBankSuggest implements Action {
    readonly type = GeneralActionTypes.ClearBankSuggest;

}

/** Загрузить Suggest по адресам */
export class LoadAddressSuggest implements Action {
    readonly type = GeneralActionTypes.LoadAddressSuggest;

    constructor(public payload: { query: string, count: number }) {}
}

/** Обработать Suggest по адресам */
export class HandleAddressSuggest implements Action {
    readonly type = GeneralActionTypes.HandleAddressSuggest;

    constructor(public response: ServiceResponse) {}
}

/** Почистить Suggest по адресам */
export class ClearAddressSuggest implements Action {
    readonly type = GeneralActionTypes.ClearAddressSuggest;

}

export class LoadCountries implements Action {
    readonly type = GeneralActionTypes.LoadCountries;
}

export class HandleCountries implements Action {
    readonly type = GeneralActionTypes.HandleCountries;

    constructor(public response: ServiceResponse) {}
}

export class LoadIdentityDocumentTypes implements Action {
    readonly type = GeneralActionTypes.LoadIdentityDocumentTypes;
}

export class HandleIdentityDocumentTypes implements Action {
    readonly type = GeneralActionTypes.HandleIdentityDocumentTypes;

    constructor(public response: ServiceResponse) {}
}

export class LoadConfirmStayDocumentTypes implements Action {
    readonly type = GeneralActionTypes.LoadConfirmStayDocumentTypes;
}

export class HandleConfirmStayDocumentTypes implements Action {
    readonly type = GeneralActionTypes.HandleConfirmStayDocumentTypes;

    constructor(public response: ServiceResponse) {}
}

export class LoadDocAbsenceReasons implements Action {
    readonly type = GeneralActionTypes.LoadDocAbsenceReasons;
}

export class HandleDocAbsenceReasons implements Action {
    readonly type = GeneralActionTypes.HandleDocAbsenceReasons;

    constructor(public response: ServiceResponse) {}
}

export class LoadTaxationSystems implements Action {
    readonly type = GeneralActionTypes.LoadTaxationSystems;
}

export class HandleTaxationSystems implements Action {
    readonly type = GeneralActionTypes.HandleTaxationSystems;

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
    | LoadProfileInfo
    | HandleProfileInfo
    | LoadUserInfo
    | ModifyUserInfo
    | HandleUserInfo
    | RedirectAfterLogin
    | RedirectAfterLogout
    | LoadCompanyInfo
    | HandleCompanyInfo
    | LoadCompanySuggest
    | HandleCompanySuggest
    | ClearCompanySuggest
    | LoadBankSuggest
    | HandleBankSuggest
    | ClearBankSuggest
    | LoadCountries
    | HandleCountries
    | LoadAddressSuggest
    | HandleAddressSuggest
    | ClearAddressSuggest
    | LoadIdentityDocumentTypes
    | HandleIdentityDocumentTypes
    | LoadConfirmStayDocumentTypes
    | HandleConfirmStayDocumentTypes
    | LoadDocAbsenceReasons
    | HandleDocAbsenceReasons
    | LoadTaxationSystems
    | HandleTaxationSystems
    | ShowGeneralMessage
    | ShowGeneralToastMessage
    | ShowRoutingToastMessage;
