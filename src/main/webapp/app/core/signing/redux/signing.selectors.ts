import {createFeatureSelector, createSelector} from '@ngrx/store';
import {SigningState} from "./signing.reducer";
import {ApplicationMessage} from "../../../shared/domain/ApplicationMessage";
import {SimpleDocument} from "../../../shared/domain/SimpleDocument";

export const getSigningState = createFeatureSelector<SigningState>('signing');

export const getSigningMessage = createSelector(
    getSigningState,
    (state: SigningState): ApplicationMessage => state.signingMessage
);

export const getSigningToastMessage = createSelector(
    getSigningState,
    (state: SigningState): ApplicationMessage => state.signingToastMessage
);


export const isLoadingFilesForSigning = createSelector(
    getSigningState,
    (state: SigningState): boolean => state.isLoadingFilesForSigning
);
export const docsForSigning = createSelector(
    getSigningState,
    (state: SigningState): SimpleDocument[] => state.docsForSigning
);
export const isCaptchaRequired = createSelector(
    getSigningState,
    (state: SigningState): boolean => state.isCaptchaRequired
);

export const signingFiles = createSelector(
    getSigningState,
    (state: SigningState): number => state.signingFiles
);
