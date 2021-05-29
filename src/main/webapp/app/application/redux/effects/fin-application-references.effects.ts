import {Actions, Effect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {
    FinApplicationReferencesTypes,
    GetDefaultFinApplicationStages,
    GetDeliveryTypes,
    GetFinApplicationFormStatuses,
    GetFinApplicationStageGroups,
    GetKinds,
    HandleApplicationStageGroups,
    HandleDefaultApplicationStages,
    HandleDeliveryTypes,
    HandleFinApplicationFormStatuses,
    HandleKinds
} from '../actions';
import {map, switchMap} from 'rxjs/operators';
import {ServiceResponse} from '../../../shared/domain/ServiceResponse';
import {FinApplicationReferencesService} from '../../services/fin-application-references.service';

@Injectable()
export class FinApplicationReferencesEffects {
    constructor(
        private actions$: Actions,
        private finApplicationReferencesService: FinApplicationReferencesService,
        private router: Router
    ) {
    }

    @Effect() getFinApplicationFormStatuses$ = this.actions$.pipe(
        ofType<GetFinApplicationFormStatuses>(FinApplicationReferencesTypes.GetFormStatuses),
        switchMap(action => {
            return this.finApplicationReferencesService.getFormStatuses();
        }),
        map((response: ServiceResponse) => new HandleFinApplicationFormStatuses(response))
    );

    @Effect() getFinApplicationStageGroups$ = this.actions$.pipe(
        ofType<GetFinApplicationStageGroups>(FinApplicationReferencesTypes.GetStageGroups),
        switchMap(action => {
            return this.finApplicationReferencesService.getStageGroups();
        }),
        map((response: ServiceResponse) => new HandleApplicationStageGroups(response))
    );

    @Effect() getDefaultFinApplicationStages$ = this.actions$.pipe(
        ofType<GetDefaultFinApplicationStages>(FinApplicationReferencesTypes.GetDefaultStages),
        switchMap(action => {
            return this.finApplicationReferencesService.getDefaultStages();
        }),
        map((response: ServiceResponse) => new HandleDefaultApplicationStages(response))
    );

    @Effect() getDeliveryTypes$ = this.actions$.pipe(
        ofType<GetDeliveryTypes>(FinApplicationReferencesTypes.GetDeliveryTypes),
        switchMap(action => {
            return this.finApplicationReferencesService.getDeliveryTypes();
        }),
        map((response: ServiceResponse) => new HandleDeliveryTypes(response))
    );

    @Effect() getKinds$ = this.actions$.pipe(
        ofType<GetKinds>(FinApplicationReferencesTypes.GetKinds),
        switchMap(action => {
            return this.finApplicationReferencesService.getKinds();
        }),
        map((response: ServiceResponse) => new HandleKinds(response))
    );
}
