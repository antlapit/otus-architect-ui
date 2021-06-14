import {Actions, Effect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {
    CreateFinApplication,
    FinApplicationTypes,
    GetFinApplicationList,
    HandleCreateFinApplication,
    HandleDeliveryInfo,
    HandleDeliveryInfoUpdate,
    HandleFinApplication,
    HandleFinApplicationList,
    HandleProcessFinApplication,
    LoadDeliveryInfo,
    LoadFinApplication,
    ProcessFinApplication,
    RevokeFinApplication,
    UpdateDeliveryInfo
} from '../actions';
import {filter, map, mapTo, switchMap} from 'rxjs/operators';
import {ServiceResponse} from '../../../shared/domain/ServiceResponse';
import {FinApplicationService} from '../../services/fin-application.service';
import {timer} from "rxjs";
import {AuthService} from "../../../core/auth/auth.service";

@Injectable()
export class FinApplicationEffects {
    constructor(
        private actions$: Actions,
        private finApplicationService: FinApplicationService,
        private router: Router,
        private authService: AuthService,
    ) {
    }

    @Effect() createNewApplication$ = this.actions$.pipe(
        ofType<CreateFinApplication>(FinApplicationTypes.CreateFinApplication),
        filter(action => this.authService.isAuthenticated),
        switchMap(action => {
            const payload = action.payload;
            return this.finApplicationService.createFinApplication(
                payload
            );
        }),
        map((response: ServiceResponse) => new HandleCreateFinApplication(response))
    );

    @Effect() getFinApplicationList$ = this.actions$.pipe(
        ofType<GetFinApplicationList>(FinApplicationTypes.GetFinApplicationList),
        switchMap(action =>
            timer(0, 10000).pipe(mapTo(action))
        ),
        filter(action => this.authService.isAuthenticated),
        switchMap(action => {
            return this.finApplicationService.queryApplications(action.payload);
        }),
        map((response: ServiceResponse) => new HandleFinApplicationList(response))
    );

    @Effect() loadFinApplication$ = this.actions$.pipe(
        ofType<LoadFinApplication>(FinApplicationTypes.LoadFinApplication),
        filter(action => this.authService.isAuthenticated),
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
        filter(action => this.authService.isAuthenticated),
        switchMap(action => {
            const payload = action.payload;
            return this.finApplicationService.confirm(payload.id);
        }),
        map((response: ServiceResponse) => new HandleProcessFinApplication(response))
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
