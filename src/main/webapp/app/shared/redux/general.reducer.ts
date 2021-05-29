import {GeneralActionsUnion, GeneralActionTypes} from './general.actions';
import {Workspace} from '../domain/Workspace';
import {ProfileInfo} from '../domain/ProfileInfo';
import {UserIdentity} from '../../core/domain/UserIdentity';
import {Company} from '../../core/domain/Company';
import {ApplicationMessage, ApplicationRoutingMessage} from '../domain/ApplicationMessage';

export interface GeneralState {
    workspace: Workspace;
    isLoadingWorkspace: boolean;
    profileInfo: ProfileInfo;
    isLoadingProfileInfo: boolean;
    userInfo: UserIdentity;
    isLoadingUserInfo: boolean;
    companyInfo: Company;
    isLoadingCompanyInfo: boolean;
    isLoadingCompanies: boolean;
    companySuggest: any[];
    isLoadingBanks: boolean;
    bankSuggest: any[];
    isLoadingAddresses: boolean;
    addressesSuggest: string[];
    isLoadingCountries: boolean;
    countries: any[];
    isLoadingIdentityDocumentTypes: boolean;
    identityDocumentTypes: any[];
    isLoadingConfirmStayDocumentTypes: boolean;
    confirmStayDocumentTypes: any[];
    isLoadingDocAbsenceReasons: boolean;
    docAbsenceReasons: any[];
    isLoadingTaxationSystems: boolean;
    taxationSystems: any[];
    generalMessage: ApplicationMessage;
    generalToastMessage: ApplicationMessage;
    routingMessage: ApplicationRoutingMessage;
}

export const initialState: GeneralState = {
    workspace: null,
    isLoadingWorkspace: false,
    profileInfo: null,
    isLoadingProfileInfo: false,
    userInfo: null,
    isLoadingUserInfo: false,
    companyInfo: null,
    isLoadingCompanyInfo: false,
    isLoadingCompanies: false,
    companySuggest: [],
    isLoadingBanks: false,
    bankSuggest: [],
    isLoadingAddresses: false,
    addressesSuggest: [],
    isLoadingCountries: false,
    countries: [],
    isLoadingIdentityDocumentTypes: false,
    identityDocumentTypes: [],
    isLoadingConfirmStayDocumentTypes: false,
    confirmStayDocumentTypes: [],
    isLoadingDocAbsenceReasons: false,
    docAbsenceReasons: [],
    isLoadingTaxationSystems: false,
    taxationSystems: [],
    generalMessage: null,
    generalToastMessage: null,
    routingMessage: null
};

export function reducer(state: GeneralState = initialState, action: GeneralActionsUnion): GeneralState {
    switch (action.type) {
        case GeneralActionTypes.LoadWorkspace: {
            return {
                ...state,
                isLoadingWorkspace: true
            };
        }
        case GeneralActionTypes.HandleWorkspace: {
            return {
                ...state,
                workspace: action.payload.workspace,
                isLoadingWorkspace: false
            };
        }
        case GeneralActionTypes.DiscardWorkspace: {
            return {
                ...state,
                workspace: null,
                isLoadingWorkspace: false
            };
        }
        case GeneralActionTypes.LoadProfileInfo: {
            return {
                ...state,
                isLoadingProfileInfo: true
            };
        }
        case GeneralActionTypes.HandleProfileInfo: {
            return {
                ...state,
                profileInfo: action.payload.profileInfo,
                isLoadingProfileInfo: false
            };
        }
        case GeneralActionTypes.LoadUserInfo: {
            return {
                ...state,
                isLoadingUserInfo: true
            };
        }
        case GeneralActionTypes.HandleUserInfo: {
            return {
                ...state,
                userInfo: action.payload.userInfo,
                isLoadingUserInfo: false
            };
        }
        case GeneralActionTypes.LoadCompanyInfo: {
            return {
                ...state,
                isLoadingCompanyInfo: true
            };
        }
        case GeneralActionTypes.HandleCompanyInfo: {
            return {
                ...state,
                companyInfo: action.payload.companyInfo,
                isLoadingCompanyInfo: false
            };
        }
        case GeneralActionTypes.LoadCompanySuggest: {
            return {
                ...state,
                isLoadingCompanies: true
            };
        }
        case GeneralActionTypes.HandleCompanySuggest: {
            if (action.response.success) {
                return {
                    ...state,
                    isLoadingCompanies: false,
                    companySuggest: action.response.data
                };
            } else {
                return {
                    ...state,
                    isLoadingCompanies: false,
                    companySuggest: []
                };
            }
        }
        case GeneralActionTypes.ClearCompanySuggest: {
            return {
                ...state,
                companySuggest: []
            };
        }
        case GeneralActionTypes.LoadBankSuggest: {
            return {
                ...state,
                isLoadingBanks: true
            };
        }
        case GeneralActionTypes.HandleBankSuggest: {
            if (action.response.success) {
                return {
                    ...state,
                    isLoadingBanks: false,
                    bankSuggest: action.response.data
                };
            } else {
                return {
                    ...state,
                    isLoadingBanks: false,
                    bankSuggest: []
                };
            }
        }
        case GeneralActionTypes.ClearBankSuggest: {
            return {
                ...state,
                bankSuggest: []
            };
        }
        case GeneralActionTypes.LoadCountries: {
            return {
                ...state,
                isLoadingCountries: true
            };
        }
        case GeneralActionTypes.HandleCountries: {
            if (action.response.success) {
                return {
                    ...state,
                    isLoadingCountries: false,
                    countries: action.response.data
                };
            } else {
                return {
                    ...state,
                    isLoadingCountries: false,
                    countries: []
                };
            }
        }
        case GeneralActionTypes.LoadAddressSuggest: {
            return {
                ...state,
                isLoadingAddresses: true
            };
        }
        case GeneralActionTypes.HandleAddressSuggest: {
            if (action.response.success) {
                return {
                    ...state,
                    isLoadingAddresses: false,
                    addressesSuggest: action.response.data
                };
            } else {
                return {
                    ...state,
                    isLoadingAddresses: false,
                    addressesSuggest: []
                };
            }
        }
        case GeneralActionTypes.ClearAddressSuggest: {
            return {
                ...state,
                addressesSuggest: []
            };
        }
        case GeneralActionTypes.LoadIdentityDocumentTypes: {
            return {
                ...state,
                isLoadingIdentityDocumentTypes: true
            };
        }
        case GeneralActionTypes.HandleIdentityDocumentTypes: {
            if (action.response.success) {
                return {
                    ...state,
                    isLoadingIdentityDocumentTypes: false,
                    identityDocumentTypes: action.response.data
                };
            } else {
                return {
                    ...state,
                    isLoadingIdentityDocumentTypes: false,
                    identityDocumentTypes: []
                };
            }
        }
        case GeneralActionTypes.LoadConfirmStayDocumentTypes: {
            return {
                ...state,
                isLoadingConfirmStayDocumentTypes: true
            };
        }
        case GeneralActionTypes.HandleConfirmStayDocumentTypes: {
            if (action.response.success) {
                return {
                    ...state,
                    isLoadingConfirmStayDocumentTypes: false,
                    confirmStayDocumentTypes: action.response.data
                };
            } else {
                return {
                    ...state,
                    isLoadingConfirmStayDocumentTypes: false,
                    confirmStayDocumentTypes: []
                };
            }
        }
        case GeneralActionTypes.LoadDocAbsenceReasons: {
            return {
                ...state,
                isLoadingDocAbsenceReasons: true
            };
        }
        case GeneralActionTypes.HandleDocAbsenceReasons: {
            if (action.response.success) {
                return {
                    ...state,
                    isLoadingDocAbsenceReasons: false,
                    docAbsenceReasons: action.response.data
                };
            } else {
                return {
                    ...state,
                    isLoadingDocAbsenceReasons: false,
                    docAbsenceReasons: []
                };
            }
        }
        case GeneralActionTypes.LoadTaxationSystems: {
            return {
                ...state,
                isLoadingTaxationSystems: true
            };
        }
        case GeneralActionTypes.HandleTaxationSystems: {
            if (action.response.success) {
                return {
                    ...state,
                    isLoadingTaxationSystems: false,
                    taxationSystems: action.response.data
                };
            } else {
                return {
                    ...state,
                    isLoadingTaxationSystems: false,
                    taxationSystems: []
                };
            }
        }
        case GeneralActionTypes.ShowGeneralMessage: {
            return {
                ...state,
                generalMessage: action.message
            };
        }
        case GeneralActionTypes.ShowGeneralToastMessage: {
            return {
                ...state,
                generalToastMessage: action.message
            };
        }
        case GeneralActionTypes.ShowRoutingToastMessage: {
            return {
                ...state,
                routingMessage: action.payload
            };
        }
        default: {
            return state;
        }
    }
}
