import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ApplicationState} from '../../redux/application-state';
import {ActivatedRoute, Router} from '@angular/router';
import {GetFinApplicationList, RevokeFinApplication} from '../../redux/actions';
import {combineLatest, Subscription} from 'rxjs';
import {
    finApplications,
    finApplicationsFilter,
    isLoadingFinApplication,
    isLoadingFinApplications
} from '../../redux/selectors';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {FinApplication, FinApplicationFilter} from '../../models/fin-application.model';
import {Location} from '@angular/common';

@Component({
    selector: 'otus-architect-application-list',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './application-list.component.html',
    styleUrls: ['./application-list.component.scss']
})
export class ApplicationListComponent implements OnInit, OnDestroy {

    displayedColumns: string[] = ['orderId', 'total', 'date', 'status', 'menu'];
    dataSource = new MatTableDataSource<FinApplication>();

    all$: Subscription = new Subscription();
    isLoadingFinApplications: boolean;
    finApplications: FinApplication[];
    isLoadingFinApplication: boolean;
    filter: FinApplicationFilter;

    constructor(private cd: ChangeDetectorRef,
                private store: Store<ApplicationState>,
                private route: ActivatedRoute,
                private router: Router,
                public dialog: MatDialog,
                private location: Location) {

    }

    ngOnDestroy(): void {
        this.all$.unsubscribe();
    }

    ngOnInit(): void {
        this.all$.add(combineLatest(
            this.store.pipe(select(isLoadingFinApplications)),
            this.store.pipe(select(finApplications))
        ).subscribe(([isLoadingFinApplications, finApplications]) => {
            this.isLoadingFinApplications = isLoadingFinApplications;
            this.finApplications = finApplications;
            this.dataSource.data = this.finApplications;
            this.cd.detectChanges();
        }));

        this.all$.add(combineLatest(
            this.store.pipe(select(isLoadingFinApplication)),
        ).subscribe(([newIsLoadingFinApplication]) => {
            if (this.isLoadingFinApplication && !newIsLoadingFinApplication) {
                this.store.dispatch(new GetFinApplicationList(this.filter));
            }
            this.isLoadingFinApplication = newIsLoadingFinApplication;
        }));

        this.all$.add(combineLatest(
            this.store.pipe(select(finApplicationsFilter))
        ).subscribe(([filter]) => {
            this.filter = filter;
            this.changeFilterUrl(this.filter);
            this.store.dispatch(new GetFinApplicationList(this.filter));
            this.cd.detectChanges();
        }));

        this.store.dispatch(new GetFinApplicationList(this.filter));
    }

    goToFinApplication(id: string) {
        this.router.navigate(['applications', id]);
    }

    revoke(id: string) {
        this.store.dispatch(new RevokeFinApplication({
            id: id
        }));
    }

    anyActionAvailable(finApplication: FinApplication) {
        // tslint:disable-next-line:max-line-length
        return finApplication.status === 'NEW';
    }

    private changeFilterUrl(filter: FinApplicationFilter) {
        const normalizeUrl = this.router.url.split('?')[0];
        const queryParams = {...this.route.snapshot.queryParams};
        queryParams['finAppFilter'] = encodeURIComponent(JSON.stringify(filter));
        let queryParamsString = '?';
        for (const key in queryParams) {
            if (queryParams.hasOwnProperty(key)) {
                const substr = queryParamsString === '?' ? '' : '&';
                queryParamsString = queryParamsString.concat(`${substr}${key}=${queryParams[key]}`);
            }
        }
        this.location.replaceState(normalizeUrl, queryParamsString);
    }

    isFilterEmpty() {
        return !this.filter || (!this.filter.orderId && !this.filter.status
            && !this.filter.datePickerType && !this.filter.dateFrom && !this.filter.dateTo
            && !this.filter.totalFrom && !this.filter.totalTo
        );
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
