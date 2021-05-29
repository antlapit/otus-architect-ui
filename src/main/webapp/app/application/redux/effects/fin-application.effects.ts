import {Actions, Effect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {
    CreateBeneficiaryForm,
    CreateFinApplication,
    DeleteBeneficiaryForm,
    FinApplicationTypes,
    GetFinApplicationList,
    HandleContactInfo,
    HandleContactInfoUpdate,
    HandleContract,
    HandleContractUpdate,
    HandleCreateBeneficiaryForm,
    HandleCreateFinApplication,
    HandleDeleteBeneficiaryForm,
    HandleDeliveryInfo,
    HandleDeliveryInfoUpdate,
    HandleFinApplication,
    HandleFinApplicationCounters,
    HandleFinApplicationForm,
    HandleFinApplicationFormUpdate,
    HandleFinApplicationList,
    HandleFinApplicationPersonContainer,
    HandleFinApplicationPersonUpdate,
    HandleProcessFinApplication,
    HandleSaveFinApplication,
    LoadContactInfo,
    LoadContract,
    LoadDeliveryInfo,
    LoadFinApplication,
    LoadFinApplicationForm,
    LoadFinApplicationPersonContainer,
    ProcessFinApplication,
    RevokeFinApplication,
    SaveFinApplication,
    UpdateContactInfo,
    UpdateContract,
    UpdateDeliveryInfo,
    UpdateFinApplicationForm,
    UpdateFinApplicationPersonForm
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

    @Effect() getFinApplicationCounters$ = this.actions$.pipe(
        ofType<GetFinApplicationList>(FinApplicationTypes.GetFinApplicationCounters),
        switchMap(action => {
            return this.finApplicationService.countApplications(action.payload);
        }),
        map((response: ServiceResponse) => new HandleFinApplicationCounters(response))
    );

    @Effect() loadFinApplication$ = this.actions$.pipe(
        ofType<LoadFinApplication>(FinApplicationTypes.LoadFinApplication),
        switchMap(action => {
            return this.finApplicationService.findApplication(action.payload.id);
        }),
        map((response: ServiceResponse) => new HandleFinApplication(response))
    );

    @Effect() loadFinApplicationForm$ = this.actions$.pipe(
        ofType<LoadFinApplicationForm>(FinApplicationTypes.LoadFinApplicationForm),
        switchMap(action => {
            return this.finApplicationService.findApplicationForm(action.payload.id);
        }),
        map((response: ServiceResponse) => new HandleFinApplicationForm(response))
    );

    @Effect() loadContract$ = this.actions$.pipe(
        ofType<LoadContract>(FinApplicationTypes.LoadContract),
        switchMap(action => {
            return this.finApplicationService.findContract(action.payload.id);
        }),
        map((response: ServiceResponse) => new HandleContract(response))
    );

    @Effect() updateContract$ = this.actions$.pipe(
        ofType<UpdateContract>(FinApplicationTypes.UpdateContract),
        switchMap(action => {
            return this.finApplicationService.updateContract(action.payload.id, action.payload.contract);
        }),
        map((response: ServiceResponse) => new HandleContractUpdate(response))
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

    @Effect() saveApplication$ = this.actions$.pipe(
        ofType<SaveFinApplication>(FinApplicationTypes.SaveFinApplication),
        switchMap(action => {
            const payload = action.payload;
            return this.finApplicationService.saveFinApplication(payload, action.data);
        }),
        map((response: ServiceResponse) => new HandleSaveFinApplication(response))
    );

    @Effect() processApplication$ = this.actions$.pipe(
        ofType<ProcessFinApplication>(FinApplicationTypes.ProcessFinApplication),
        switchMap(action => {
            const payload = action.payload;
            return this.finApplicationService.processApplication(payload.id, payload.data);
        }),
        map((response: ServiceResponse) => new HandleProcessFinApplication(response))
    );

    @Effect() loadPersons$ = this.actions$.pipe(
        ofType<LoadFinApplicationPersonContainer>(FinApplicationTypes.LoadFinApplicationPersonContainer),
        mergeMap((action) => this.finApplicationService.findPersons(action.payload.id)),
        map((response: ServiceResponse) => new HandleFinApplicationPersonContainer(response))
    );

    @Effect() updatePerson$ = this.actions$.pipe(
        ofType<UpdateFinApplicationPersonForm>(FinApplicationTypes.UpdateFinApplicationPersonForm),
        mergeMap((action) => this.finApplicationService.updatePerson(action.payload.id, action.payload.personId, action.payload.form)),
        map((response: ServiceResponse) => new HandleFinApplicationPersonUpdate(response))
    );

    @Effect() createPerson$ = this.actions$.pipe(
        ofType<CreateBeneficiaryForm>(FinApplicationTypes.CreateBeneficiaryForm),
        mergeMap((action) => this.finApplicationService.createPerson(action.payload.id, action.payload.role)),
        map((response: ServiceResponse) => new HandleCreateBeneficiaryForm(response))
    );

    @Effect() deletePerson$ = this.actions$.pipe(
        ofType<DeleteBeneficiaryForm>(FinApplicationTypes.DeleteBeneficiaryForm),
        mergeMap((action) => this.finApplicationService.deletePerson(action.payload.id, action.payload.personId, action.payload.role)),
        map((response: ServiceResponse) => new HandleDeleteBeneficiaryForm(response))
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

    @Effect() updateFinApplicationForm$ = this.actions$.pipe(
        ofType<UpdateFinApplicationForm>(FinApplicationTypes.UpdateFinApplicationForm),
        mergeMap((action) => this.finApplicationService.updateFinApplicationForm(action.payload.id, action.payload.form)),
        map((response: ServiceResponse) => new HandleFinApplicationFormUpdate(response))
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
