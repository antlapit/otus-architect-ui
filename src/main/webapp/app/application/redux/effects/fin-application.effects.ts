import {Actions, Effect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {
    CreateFinApplication,
    FinApplicationTypes,
    GetFinApplicationList,
    HandleContactInfo,
    HandleContactInfoUpdate,
    HandleCreateFinApplication,
    HandleDeliveryInfo,
    HandleDeliveryInfoUpdate,
    HandleFinApplication,
    HandleFinApplicationList,
    HandleProcessFinApplication,
    LoadContactInfo,
    LoadDeliveryInfo,
    LoadFinApplication,
    ProcessFinApplication,
    RevokeFinApplication,
    UpdateContactInfo,
    UpdateDeliveryInfo
} from '../actions';
import {map, mergeMap, switchMap, tap} from 'rxjs/operators';
import {ServiceResponse} from '../../../shared/domain/ServiceResponse';
import {FinApplicationService} from '../../services/fin-application.service';

@Injectable()
export class FinApplicationEffects {
    constructor(
        private actions$: Actions,
        private finApplicationService: FinApplicationService,
        private router: Router
    ) {
    }

    @Effect() createNewApplication$ = this.actions$.pipe(
        ofType<CreateFinApplication>(FinApplicationTypes.CreateFinApplication),
        switchMap(action => {
            const payload = action.payload;
            return this.finApplicationService.createFinApplication(
                payload
            );
        }),
        tap((response: ServiceResponse) => {
            if (response.success) {
                this.router.navigate([
                    'applications', response.data.id
                ]);
            }

            return response;
        }),
        map((response: ServiceResponse) => new HandleCreateFinApplication(response))
    );

    @Effect() getFinApplicationList$ = this.actions$.pipe(
        ofType<GetFinApplicationList>(FinApplicationTypes.GetFinApplicationList),
        switchMap(action => {
            return this.finApplicationService.queryApplications(action.payload);
        }),
        map((response: ServiceResponse) => new HandleFinApplicationList(response))
    );

    @Effect() loadFinApplication$ = this.actions$.pipe(
        ofType<LoadFinApplication>(FinApplicationTypes.LoadFinApplication),
        switchMap(action => {
            return this.finApplicationService.findApplication(action.payload.id);
        }),
        map((response: ServiceResponse) => new HandleFinApplication(response))
    );

    @Effect() loadDeliveryInfo$ = this.actions$.pipe(
        ofType<LoadDeliveryInfo>(FinApplicationTypes.LoadDeliveryInfo),
        switchMap(action => {
            return this.finApplicationService.findDeliveryInfo(action.payload.id);
        }),
        map((response: ServiceResponse) => new HandleDeliveryInfo(response))
    );

    @Effect() updateDeliveryInfo$ = this.actions$.pipe(
        ofType<UpdateDeliveryInfo>(FinApplicationTypes.UpdateDeliveryInfo),
        switchMap(action => {
            return this.finApplicationService.updateDeliveryInfo(action.payload.id, action.payload.deliveryInfo);
        }),
        map((response: ServiceResponse) => new HandleDeliveryInfoUpdate(response))
    );

    @Effect() processApplication$ = this.actions$.pipe(
        ofType<ProcessFinApplication>(FinApplicationTypes.ProcessFinApplication),
        switchMap(action => {
            const payload = action.payload;
            return this.finApplicationService.confirm(payload.id);
        }),
        map((response: ServiceResponse) => new HandleProcessFinApplication(response))
    );

    @Effect() loadContactInfo$ = this.actions$.pipe(
        ofType<LoadContactInfo>(FinApplicationTypes.LoadContactInfo),
        mergeMap((action) => this.finApplicationService.findContactInfo(action.payload.id)),
        map((response: ServiceResponse) => new HandleContactInfo(response))
    );

    @Effect() updateContactInfo$ = this.actions$.pipe(
        ofType<UpdateContactInfo>(FinApplicationTypes.UpdateContactInfo),
        mergeMap((action) => this.finApplicationService.updateContactInfo(action.payload.id, action.payload.contactInfo)),
        map((response: ServiceResponse) => new HandleContactInfoUpdate(response))
    );

    @Effect() revokeFinApplication$ = this.actions$.pipe(
        ofType<RevokeFinApplication>(FinApplicationTypes.RevokeFinApplication),
        switchMap(action => {
            const payload = action.payload;
            return this.finApplicationService.revoke(payload.id);
        }),
        map((response: ServiceResponse) => new HandleFinApplication(response))
    );
}
