import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ApplicationState} from '../../redux/application-state';
import {ActivatedRoute, Router} from '@angular/router';
import {combineLatest, Subscription} from 'rxjs';
import {
    isLoadingFinApplication,
    isProcessingFinApplicationForm,
    isRedirectFinApplicationToRoot,
    isRedirectToFinApplicationProcessedView,
    selectedFinApplication
} from '../../redux/selectors';
import {FinApplication} from '../../models/fin-application.model';
import {ClearApplicationProcessed, ClearFinApplication, ProcessFinApplication} from '../../redux/actions';
import {MatSnackBar} from '@angular/material';
import {Location} from '@angular/common';

@Component({
    selector: 'otus-architect-application-form',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './application-form.component.html',
    styleUrls: ['./application-form.component.scss']
})
export class ApplicationFormComponent implements OnInit, OnDestroy {

    all$: Subscription = new Subscription();
    isLoadingFinApplication: boolean;
    selectedFinApplication: FinApplication;
    isRedirectToProcessedView: boolean;
    isProcessingForm: boolean;
    defaultApplicationStages: any[];
    isLoadingApplicationStages: boolean;

    savedRedirectToFinApplicationRoot: boolean;

    userRoles: String[];

    constructor(private cd: ChangeDetectorRef,
                private store: Store<ApplicationState>,
                private route: ActivatedRoute,
                private router: Router,
                private location: Location,
                private _snackBar: MatSnackBar) {

    }


    ngOnDestroy(): void {
        this.all$.unsubscribe();

        if (this.isRedirectToProcessedView) {
            this.store.dispatch(new ClearApplicationProcessed());
        }
    }

    ngOnInit(): void {
        this.all$.add(combineLatest(
            this.store.pipe(select(isLoadingFinApplication)),
            this.store.pipe(select(selectedFinApplication)),
            this.store.pipe(select(isRedirectToFinApplicationProcessedView)),
            this.store.pipe(select(isProcessingFinApplicationForm))
        ).subscribe(([isLoadingFinApplication, selectedFinApplication, isRedirectToProcessedView, isProcessingForm]) => {
            this.isLoadingFinApplication = isLoadingFinApplication;
            this.selectedFinApplication = selectedFinApplication;
            this.isRedirectToProcessedView = isRedirectToProcessedView;
            this.isProcessingForm = isProcessingForm;
            this.cd.detectChanges();
        }));

        this.all$.add(combineLatest(
                this.store.pipe(select(isRedirectFinApplicationToRoot))
        ).subscribe(([redirect]) => {
            if (this.savedRedirectToFinApplicationRoot && !redirect) {
                this.doRedirectToRoot();
            }
            this.savedRedirectToFinApplicationRoot = redirect;
        }));
    }

    doRedirectToRoot() {
        this.router.navigate(['/']);
        this.store.dispatch(new ClearFinApplication());
    }

    getStatusTitle(status: string) {
        switch (status) {
            case 'NEW':
                return 'Черновик';
            case 'REJECTED':
                return 'Отменен';
            case 'ROLLED_BACK':
                return 'Отказ';
            case 'PREPARED':
                return 'В обработке';
            case 'CONFIRMED':
                return 'Ожидает оплаты';
            case 'COMPLETED':
                return 'Завершен';
        }
        return null;
    }

    isErrorStatus(status: any) {
        return status === 'REJECTED' || status === 'ROLLED_BACK';
    }

    isUserStatus(status: any) {
        return status === 'NEW';
    }

    isProcessingStatus(status: any) {
        return status === 'CONFIRMED' || status === 'PREPARED';
    }

    isCompletedStatus(status: any) {
        return status === 'COMPLETED';
    }


}
