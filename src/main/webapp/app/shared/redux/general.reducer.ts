import {GeneralActionsUnion, GeneralActionTypes} from './general.actions';
import {Workspace} from '../domain/Workspace';
import {UserIdentity} from '../../core/domain/UserIdentity';
import {ApplicationMessage, ApplicationRoutingMessage} from '../domain/ApplicationMessage';

export interface GeneralState {
    workspace: Workspace;
    isLoadingWorkspace: boolean;
    userInfo: UserIdentity;
    isLoadingUserInfo: boolean;
    isLoadingCategories: boolean;
    categories: any[];
    generalMessage: ApplicationMessage;
    generalToastMessage: ApplicationMessage;
    routingMessage: ApplicationRoutingMessage;
}

export const initialState: GeneralState = {
    workspace: null,
    isLoadingWorkspace: false,
    userInfo: null,
    isLoadingUserInfo: false,
    isLoadingCategories: false,
    categories: [],
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
        case GeneralActionTypes.LoadCategories: {
            return {
                ...state,
                isLoadingCategories: true
            };
        }
        case GeneralActionTypes.HandleCategories: {
            if (action.response.success) {
                return {
                    ...state,
                    isLoadingCategories: false,
                    categories: action.response.data
                };
            } else {
                return {
                    ...state,
                    isLoadingCategories: false,
                    categories: []
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
