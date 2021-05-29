import {createSelector} from '@ngrx/store';
import {ApplicationState} from '../application-state';
import {getApplicationState} from './fin-application.selectors';

export const getMessage = createSelector(
    getApplicationState,
    (state: ApplicationState) => state.applicationMessage
);

export const getToastMessage = createSelector(
    getApplicationState,
    (state: ApplicationState) => state.applicationToastMessage
);
