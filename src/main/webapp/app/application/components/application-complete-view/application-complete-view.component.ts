import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ApplicationState} from '../../redux/application-state';
import {combineLatest, Subscription} from 'rxjs';
import {LoadContract, LoadDeliveryInfo, LoadFinApplicationForm} from '../../redux/actions';
import {Contract, FinApplication, FinApplicationForm} from '../../models/fin-application.model';
import {
    contract,
    deliveryInfo,
    isLoadingContract,
    isLoadingDeliveryInfo,
    isLoadingFinApplicationForm,
    selectedFinApplicationForm
} from '../../redux/selectors';
import {DeliveryInfo} from '../../models/general.model';
import {AppConfigService} from '../../../core/app-load/services/app-config.service';
import {PlatformLocation} from '@angular/common';

@Component({
    selector: 'otus-architect-application-complete-view',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './application-complete-view.component.html',
    styleUrls: ['./application-complete-view.component.scss']
})
export class ApplicationCompleteViewComponent implements OnInit, OnDestroy {

    private all$: Subscription = new Subscription();

    @Input('finApplication')
    selectedFinApplication: FinApplication;

    isLoadingFinApplicationForm: boolean;
    selectedFinApplicationForm: FinApplicationForm;
    isLoadingContract: boolean;
    contract: Contract;
    isLoadingDeliveryInfo: boolean;
    deliveryInfo: DeliveryInfo;

    constructor(private cd: ChangeDetectorRef,
                private store: Store<ApplicationState>,
                private configService: AppConfigService,
                private platformLocation: PlatformLocation) {
    }

    ngOnDestroy(): void {
        this.all$.unsubscribe();
    }

    ngOnInit(): void {
        if (!!this.selectedFinApplication) {
            this.store.dispatch(new LoadFinApplicationForm({
                id: this.selectedFinApplication.id
            }));
            this.store.dispatch(new LoadContract({
                id: this.selectedFinApplication.id
            }));
            this.store.dispatch(new LoadDeliveryInfo({
                id: this.selectedFinApplication.id
            }));
        }

        this.all$.add(combineLatest(
            this.store.pipe(select(isLoadingFinApplicationForm)),
            this.store.pipe(select(selectedFinApplicationForm)),
        ).subscribe(([isLoadingFinApplicationForm, selectedFinApplicationForm]) => {
            this.isLoadingFinApplicationForm = isLoadingFinApplicationForm;
            this.selectedFinApplicationForm = selectedFinApplicationForm;
            this.cd.detectChanges();
        }));

        this.all$.add(combineLatest(
            this.store.pipe(select(isLoadingContract)),
            this.store.pipe(select(contract)),
        ).subscribe(([isLoadingContract, contract]) => {
            this.isLoadingContract = isLoadingContract;
            this.contract = contract;
            this.cd.detectChanges();
        }));

        this.all$.add(combineLatest(
            this.store.pipe(select(isLoadingDeliveryInfo)),
            this.store.pipe(select(deliveryInfo)),
        ).subscribe(([isLoadingDeliveryInfo, deliveryInfo]) => {
            this.isLoadingDeliveryInfo = isLoadingDeliveryInfo;
            this.deliveryInfo = deliveryInfo;
            this.cd.detectChanges();
        }));
    }
}
