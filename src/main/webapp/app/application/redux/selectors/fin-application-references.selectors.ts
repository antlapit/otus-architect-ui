import {createSelector} from '@ngrx/store';
import {ApplicationState} from '../application-state';
import {getApplicationState} from './fin-application.selectors';

export const isLoadingFinApplicationFormStatuses = createSelector(
    getApplicationState,
    (state: ApplicationState) => state.isLoadingFinApplicationFormStatuses
);

export const finApplicationFormStatuses = createSelector(
    getApplicationState,
    (state: ApplicationState) => state.finApplicationFormStatuses
);

export const isLoadingFinApplicationStageGroups = createSelector(
    getApplicationState,
    (state: ApplicationState) => state.isLoadingFinApplicationStageGroups
);

export const finApplicationStageGroups = createSelector(
    getApplicationState,
    (state: ApplicationState) => state.finApplicationStageGroups
);

export const isLoadingDefaultFinApplicationStages = createSelector(
    getApplicationState,
    (state: ApplicationState) => state.isLoadingDefaultFinApplicationStages
);

export const defaultFinApplicationStages = createSelector(
    getApplicationState,
    (state: ApplicationState) => state.defaultFinApplicationStages
);

export const isLoadingDeliveryTypes = createSelector(
    getApplicationState,
    (state: ApplicationState) => state.isLoadingDeliveryTypes
);

export const deliveryTypes = createSelector(
    getApplicationState,
    (state: ApplicationState) => state.deliveryTypes
);

export const isLoadingKinds = createSelector(
    getApplicationState,
    (state: ApplicationState) => state.isLoadingKinds
);

export const kinds = createSelector(
    getApplicationState,
    (state: ApplicationState) => state.kinds
);
