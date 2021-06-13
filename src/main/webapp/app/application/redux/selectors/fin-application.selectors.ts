import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ApplicationState} from '../application-state';

export const featureName = 'applicationState';
export const getApplicationState = createFeatureSelector<ApplicationState>(featureName);

export const isCreatingFinApplication = createSelector(
    getApplicationState,
    (state: ApplicationState) => state.isCreatingFinApplication
);

export const isLoadingFinApplications = createSelector(
    getApplicationState,
    (state: ApplicationState) => state.isLoadingFinApplications
);

export const finApplications = createSelector(
    getApplicationState,
    (state: ApplicationState) => state.finApplications
);

export const finApplicationsFilter = createSelector(
    getApplicationState,
    (state: ApplicationState) => state.finApplicationsFilter
);

export const isLoadingFinApplication = createSelector(
    getApplicationState,
    (state: ApplicationState) => state.isLoadingFinApplication
);

export const selectedFinApplication = createSelector(
    getApplicationState,
    (state: ApplicationState) => state.selectedFinApplication
);

export const isLoadingFinApplicationPrototypes = createSelector(
    getApplicationState,
    (state: ApplicationState) => state.isLoadingFinApplicationPrototypes
);

export const finApplicationPrototypes = createSelector(
    getApplicationState,
    (state: ApplicationState) => state.finApplicationPrototypes
);

export const isRedirectToFinApplicationProcessedView = createSelector(
    getApplicationState,
    (state: ApplicationState) => state.redirectToFinApplicationProcessedView
);

export const isRedirectFinApplicationToRoot = createSelector(
    getApplicationState,
    (state: ApplicationState) => state.redirectToRoot
);

export const isProcessingFinApplicationForm = createSelector(
    getApplicationState,
    (state: ApplicationState) => state.isProcessingFinApplicationForm
);

export const isLoadingContactInfo = createSelector(
    getApplicationState,
    (state: ApplicationState) => state.isLoadingContactInfo
);

export const contactInfo = createSelector(
    getApplicationState,
    (state: ApplicationState) => state.contactInfo
);

export const isSavingContactInfo = createSelector(
    getApplicationState,
    (state: ApplicationState) => state.isSavingContactInfo
);

export const isLoadingDeliveryInfo = createSelector(
    getApplicationState,
    (state: ApplicationState) => state.isLoadingDeliveryInfo
);

export const deliveryInfo = createSelector(
    getApplicationState,
    (state: ApplicationState) => state.deliveryInfo
);

export const isSavingDeliveryInfo = createSelector(
    getApplicationState,
    (state: ApplicationState) => state.isSavingDeliveryInfo
);

export const isSavingFinApplicationForm = createSelector(
    getApplicationState,
    (state: ApplicationState) => state.isSavingFinApplicationForm
);

export const getFinApplicationCreatingErrorMessage = createSelector(
    getApplicationState,
    (state: ApplicationState) => state.finApplicationCreatingErrorMessage
);
