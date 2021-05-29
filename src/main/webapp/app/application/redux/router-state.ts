import {Injectable} from '@angular/core';
import {RouterStateSnapshot} from '@angular/router';
import {RouterStateSerializer} from '@ngrx/router-store';
import {Store} from '@ngrx/store';
import {ApplicationState} from './application-state';
import {ChangeFinApplicationFilter, LoadFinApplication} from './actions';

export interface RouterState {
    selectedFinApplicationId: string;
    dashboardTab: string;
    settingsTab: string;
}

@Injectable({
    providedIn: 'root',
})
export class CustomRouterStateSerializer implements RouterStateSerializer<RouterState> {

    constructor(
        private store: Store<ApplicationState>
    ) {
    }

    serialize(routerState: RouterStateSnapshot): RouterState {
        const selectedParams = {
            selectedFinApplicationId: this.getFinApplicationId(routerState),
            dashboardTab: this.getQueryParams(routerState).dashboardTab,
            settingsTab: this.getQueryParams(routerState).settingsTab,
            finAppFilter: this.getQueryParams(routerState).finAppFilter
        };
        if (selectedParams.finAppFilter) {
            const decodedFilter = decodeURIComponent(selectedParams.finAppFilter);
            if (decodedFilter) {
                const filterData = JSON.parse(decodedFilter);
                if (!!filterData) {
                    this.store.dispatch(
                        new ChangeFinApplicationFilter({
                            query: filterData.query,
                            stage: filterData.stage,
                            contactIds: filterData.contactIds,
                            datePickerType: filterData.datePickerType,
                            dateFrom: filterData.dateFrom,
                            dateTo: filterData.dateTo,
                            limitFrom: filterData.limitFrom,
                            limitTo: filterData.limitTo
                        })
                    );
                } else {
                    this.store.dispatch(
                        new ChangeFinApplicationFilter({})
                    );
                }
            }
        }

        if (selectedParams.selectedFinApplicationId) {
            this.store.dispatch(
                new LoadFinApplication({
                    id: selectedParams.selectedFinApplicationId
                })
            );
        }
        return selectedParams;
    }

    private getQueryParams(routerState: RouterStateSnapshot) {
        return routerState.root.queryParams;
    }

    private getBaseRoute(routerState: RouterStateSnapshot) {
        const route = routerState.root;
        const baseRoute = route &&
        route.firstChild && route.firstChild && route.firstChild ? route.firstChild.firstChild.firstChild : null;
        const hasBaseRoute = route && baseRoute;
        return {baseRoute: baseRoute, hasBaseRoute: hasBaseRoute};
    }

    private getFinApplicationId(routerState: RouterStateSnapshot): string | null {
        const {finApplicationPathRoute, hasFinApplicationPathRoute} = this.getFinApplicationRoute(routerState);
        return hasFinApplicationPathRoute ? finApplicationPathRoute.params['finApplicationId'] : null;
    }

    private getFinApplicationRoute(routerState: RouterStateSnapshot) {
        const {baseRoute, hasBaseRoute} = this.getBaseRoute(routerState);
        const finApplicationPathRoute = hasBaseRoute && baseRoute.firstChild ?
            baseRoute.firstChild : null;
        const hasFinApplicationPathRoute = hasBaseRoute && finApplicationPathRoute;
        return {
            finApplicationPathRoute: finApplicationPathRoute,
            hasFinApplicationPathRoute: hasFinApplicationPathRoute
        };
    }

}
