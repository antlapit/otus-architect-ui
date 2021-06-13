import * as fromRouter from '@ngrx/router-store';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {RouterState} from '../router-state';

export const getRouterState = createFeatureSelector<fromRouter.RouterReducerState<RouterState>>(
    fromRouter.DEFAULT_ROUTER_FEATURENAME);

export const getSelectedApplicationId = createSelector(
    getRouterState,
    (state: fromRouter.RouterReducerState<RouterState>) => {
        return state.state.selectedFinApplicationId;
    },
);

export const getDashboardTab = createSelector(
    getRouterState,
    (state: fromRouter.RouterReducerState<RouterState>) => {
        return state.state.dashboardTab;
    },
);

export const getSettingsTab = createSelector(
    getRouterState,
    (state: fromRouter.RouterReducerState<RouterState>) => {
        return state.state.settingsTab;
    },
);

export const getSelectedProductId = createSelector(
    getRouterState,
    (state: fromRouter.RouterReducerState<RouterState>) => {
        return state.state.selectedProductId;
    },
);
