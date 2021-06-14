import {Actions, Effect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {
    FinApplicationReferencesTypes,
    GetDeliveryTypes,
    GetFinApplicationFormStatuses,
    HandleDeliveryTypes,
    HandleFinApplicationFormStatuses
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

}
