import {GeneralState} from './general.reducer';
import {Workspace} from '../domain/Workspace';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {CaptchaInfo, ProfileInfo} from '../domain/ProfileInfo';
import {UserIdentity} from '../../core/domain/UserIdentity';
import {Company} from '../../core/domain/Company';
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
export const getProfileInfo = createSelector(
    getGeneralState,
    (state: GeneralState): ProfileInfo => state.profileInfo
);
export const isLoadingProfileInfo = createSelector(
    getGeneralState,
    (state: GeneralState): boolean => state.isLoadingProfileInfo
);
export const getCaptcha = createSelector(
    getProfileInfo,
    (state: ProfileInfo): CaptchaInfo => !!state && !!state.captcha ? state.captcha : null
);
export const getUserInfo = createSelector(
    getGeneralState,
    (state: GeneralState): UserIdentity => state.userInfo
);
export const isLoadingUserInfo = createSelector(
    getGeneralState,
    (state: GeneralState): boolean => state.isLoadingUserInfo
);
export const getCompanyInfo = createSelector(
    getGeneralState,
    (state: GeneralState): Company => state.companyInfo
);
export const isLoadingCompanyInfo = createSelector(
    getGeneralState,
    (state: GeneralState): boolean => state.isLoadingCompanyInfo
);

export const getCompanySuggest = createSelector(
    getGeneralState,
    (state: GeneralState): any[] => state.companySuggest
);
export const isLoadingCompanies = createSelector(
    getGeneralState,
    (state: GeneralState): boolean => state.isLoadingCompanies
);
export const getBankSuggest = createSelector(
    getGeneralState,
    (state: GeneralState): any[] => state.bankSuggest
);
export const isLoadingBanks = createSelector(
    getGeneralState,
    (state: GeneralState): boolean => state.isLoadingBanks
);
export const getAddressesSuggest = createSelector(
    getGeneralState,
    (state: GeneralState): any[] => state.addressesSuggest
);
export const isLoadingAddresses = createSelector(
    getGeneralState,
    (state: GeneralState): boolean => state.isLoadingAddresses
);

export const userRoles = createSelector(
    getUserInfo,
    (userIdentity: UserIdentity): String[] => !!userIdentity ? userIdentity.roles : []
);
export const countries = createSelector(
    getGeneralState,
    (state: GeneralState): any[] => state.countries
);
export const isLoadingCountries = createSelector(
    getGeneralState,
    (state: GeneralState): boolean => state.isLoadingCountries
);
export const identityDocumentTypes = createSelector(
    getGeneralState,
    (state: GeneralState): any[] => state.identityDocumentTypes
);
export const isLoadingIdentityDocumentTypes = createSelector(
    getGeneralState,
    (state: GeneralState): boolean => state.isLoadingIdentityDocumentTypes
);
export const confirmStayDocumentTypes = createSelector(
    getGeneralState,
    (state: GeneralState): any[] => state.confirmStayDocumentTypes
);
export const isLoadingConfirmStayDocumentTypes = createSelector(
    getGeneralState,
    (state: GeneralState): boolean => state.isLoadingConfirmStayDocumentTypes
);
export const docAbsenceReasons = createSelector(
    getGeneralState,
    (state: GeneralState): any[] => state.docAbsenceReasons
);
export const isLoadingDocAbsenceReasons = createSelector(
    getGeneralState,
    (state: GeneralState): boolean => state.isLoadingDocAbsenceReasons
);
export const taxationSystems = createSelector(
    getGeneralState,
    (state: GeneralState): any[] => state.taxationSystems
);
export const isLoadingTaxationSystems = createSelector(
    getGeneralState,
    (state: GeneralState): boolean => state.isLoadingTaxationSystems
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
