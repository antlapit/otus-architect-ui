import {createSelector} from '@ngrx/store';
import {ApplicationState} from '../application-state';
import {getApplicationState} from './fin-application.selectors';

export const isLoadingProducts = createSelector(
    getApplicationState,
    (state: ApplicationState) => state.isLoadingProducts
);

export const products = createSelector(
    getApplicationState,
    (state: ApplicationState) => state.products
);

export const isLoadingProduct = createSelector(
    getApplicationState,
    (state: ApplicationState) => state.isLoadingProduct
);

export const selectedProduct = createSelector(
    getApplicationState,
    (state: ApplicationState) => state.selectedProduct
);

export const productsFilter = createSelector(
    getApplicationState,
    (state: ApplicationState) => state.productsFilter
);
