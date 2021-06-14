import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AuthState} from './auth.reducer';
import {LoginState} from "../../domain/LoginState";
import {ApplicationMessage} from "../../../shared/domain/ApplicationMessage";

export const getAuthState = createFeatureSelector<AuthState>('auth');

export const getAuthMessage = createSelector(
    getAuthState,
    (state: AuthState): ApplicationMessage => state.authMessage
);

export const getAuthToastMessage = createSelector(
    getAuthState,
    (state: AuthState): ApplicationMessage => state.authToastMessage
);


export const isAuthenticating = createSelector(
    getAuthState,
    (state: AuthState): boolean => state.isAuthenticating
);
export const getLoginState = createSelector(
    getAuthState,
    (state: AuthState): any => state.authResponse
);
