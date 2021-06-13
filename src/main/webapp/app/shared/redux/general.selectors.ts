import {GeneralState} from './general.reducer';
import {Workspace} from '../domain/Workspace';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {UserIdentity} from '../../core/domain/UserIdentity';
import {ApplicationMessage, ApplicationRoutingMessage} from '../domain/ApplicationMessage';

export const getGeneralState = createFeatureSelector<GeneralState>('shared');

export const getWorkspace = createSelector(
    getGeneralState,
    (state: GeneralState): Workspace => state.workspace
);
export const isLoadingWorkspace = createSelector(
    getGeneralState,
    (state: GeneralState): boolean => state.isLoadingWorkspace
);
export const getAllowedActions = createSelector(
    getWorkspace,
    (state: Workspace): string[] => {
        return !!state ? state['workspace'].allowedActions : null;
    }
);
export const getUserInfo = createSelector(
    getGeneralState,
    (state: GeneralState): UserIdentity => state.userInfo
);
export const isLoadingUserInfo = createSelector(
    getGeneralState,
    (state: GeneralState): boolean => state.isLoadingUserInfo
);
export const userRoles = createSelector(
    getUserInfo,
    (userIdentity: UserIdentity): String[] => !!userIdentity ? userIdentity.roles : []
);
export const categories = createSelector(
    getGeneralState,
    (state: GeneralState): any[] => state.categories
);
export const isLoadingCategories = createSelector(
    getGeneralState,
    (state: GeneralState): boolean => state.isLoadingCategories
);
export const generalMessage = createSelector(
    getGeneralState,
    (state: GeneralState): ApplicationMessage => state.generalMessage
);
export const generalToastMessage = createSelector(
    getGeneralState,
    (state: GeneralState): ApplicationMessage => state.generalToastMessage
);

export const routingMessage = createSelector(
    getGeneralState,
    (state: GeneralState): ApplicationRoutingMessage => state.routingMessage
);
