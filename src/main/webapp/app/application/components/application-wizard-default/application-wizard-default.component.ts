import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ApplicationState} from '../../redux/application-state';
import {ActivatedRoute, Router} from '@angular/router';
import {combineLatest, Subscription} from 'rxjs';
import {LoadContract} from '../../redux/actions';
import {Contract, FinApplication} from '../../models/fin-application.model';
import {contract, isLoadingContract} from '../../redux/selectors';

@Component({
    selector: 'otus-architect-application-wizard-default',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './application-wizard-default.component.html',
    styleUrls: ['./application-wizard-default.component.scss']
})
export class ApplicationWizardDefaultComponent implements OnInit, OnDestroy {

    private all$: Subscription = new Subscription();

    @Input('finApplication')
    selectedFinApplication: FinApplication;

    isLoadingContract: boolean;
    contract: Contract;

    constructor(private cd: ChangeDetectorRef,
                private store: Store<ApplicationState>,
                private route: ActivatedRoute,
                private router: Router) {

    }

    ngOnDestroy(): void {
        this.all$.unsubscribe();
    }

    ngOnInit(): void {
        this.all$.add(combineLatest(
            this.store.pipe(select(isLoadingContract)),
            this.store.pipe(select(contract)),
        ).subscribe(([isLoadingContract, contract]) => {
            this.isLoadingContract = isLoadingContract;
            this.contract = contract;
            this.cd.detectChanges();
        }));

        this.store.dispatch(new LoadContract({
            id: this.selectedFinApplication.id
        }));
    }
}
