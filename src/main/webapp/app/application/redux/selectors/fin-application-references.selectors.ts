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

export const isLoadingDeliveryTypes = createSelector(
    getApplicationState,
    (state: ApplicationState) => state.isLoadingDeliveryTypes
);

export const deliveryTypes = createSelector(
    getApplicationState,
    (state: ApplicationState) => state.deliveryTypes
);
