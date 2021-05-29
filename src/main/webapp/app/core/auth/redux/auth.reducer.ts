import {AuthActionsUnion, AuthActionTypes} from './auth.actions';
import {LoginState} from "../../domain/LoginState";
import {ApplicationMessage} from "../../../shared/domain/ApplicationMessage";

export interface AuthState {
    authMessage: ApplicationMessage;
    authToastMessage: ApplicationMessage;
    isAuthenticating: boolean;
    loginState: LoginState;
}

export const initialState: AuthState = {
    authMessage: null,
    authToastMessage: null,
    isAuthenticating: false,
    loginState: null,
};

export function reducer(state: AuthState = initialState, action: AuthActionsUnion): AuthState {
    switch (action.type) {
        case AuthActionTypes.Logout: {
            return initialState;
        }
        case AuthActionTypes.Authenticate: {
            return {
                ...state,
                isAuthenticating: true
            };
        }
        case AuthActionTypes.HandleAuthenticate: {
            if (action.response.success) {
                return {
                    ...state,
                    isAuthenticating: false,
                    loginState: action.response.data
                };
            } else {
                return {
                    ...state,
                    isAuthenticating: false,
                    authToastMessage: action.response.message
                };
            }
        }
        case AuthActionTypes.ReloadAuthenticate: {
            return {
                ...state,
                isAuthenticating: false,
                loginState: {
                    phoneNumber: action.phoneNumber,
                    status: 'INITIAL'
                }
            };
        }
        default: {
            return state;
        }
    }
}
