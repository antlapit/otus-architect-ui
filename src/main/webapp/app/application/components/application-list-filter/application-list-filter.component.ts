import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ApplicationState} from '../../redux/application-state';
import {ActivatedRoute, Router} from '@angular/router';
import {ChangeFinApplicationFilter, GetFinApplicationStageGroups} from '../../redux/actions';
import {combineLatest, Subscription} from 'rxjs';
import {getUserInfo, userRoles} from '../../../shared/redux/general.selectors';
import {finApplicationsFilter} from '../../redux/selectors';
import {FormBuilder, FormGroup} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import * as _ from 'lodash';
import {AppConfigService} from '../../../core/app-load/services/app-config.service';
import {UserIdentity} from '../../../core/domain/UserIdentity';

@Component({
    selector: 'otus-architect-application-list-filter',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './application-list-filter.component.html',
    styleUrls: ['./application-list-filter.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ApplicationListFilterComponent implements OnInit, OnDestroy {

    userRoles: String[];
    userInfo: UserIdentity;
    fg: FormGroup;

    config: any;
    maxLimit: number;
    minLimit: number;

    private all$: Subscription = new Subscription();
    private lastFilterData: any;

    constructor(private cd: ChangeDetectorRef,
                private store: Store<ApplicationState>,
                private route: ActivatedRoute,
                private router: Router,
                private _fb: FormBuilder,
                protected configService: AppConfigService) {
        this.configService.config$.subscribe(config => {
            this.config = config;
            // tslint:disable-next-line:max-line-length
            this.maxLimit = (!this.config || !this.config.application || !this.config.application.order) ? 0 : this.config.application.order.maxLimit;
            // tslint:disable-next-line:max-line-length
            this.minLimit = (!this.config || !this.config.application || !this.config.application.order) ? 0 : this.config.application.order.minLimit;
        });
    }

    ngOnDestroy(): void {
        this.all$.unsubscribe();
    }

    ngOnInit(): void {
        this.fg = this._fb.group({
            query: ['', []],
            stage: ['', []],
            datePickerType: ['', []],
            dateFrom: ['', []],
            dateTo: ['', []],
            limitFrom: ['', []],
            limitTo: ['', []],
            contactIds: [[], []]
        });

        this.all$.add(
            combineLatest(
                this.store.pipe(select(userRoles)),
                this.store.pipe(select(getUserInfo))
            ).subscribe(([userRoles, userInfo]) => {
                this.userRoles = userRoles;
                this.userInfo = userInfo;
                if (!!this.cd) {
                    this.cd.detectChanges();
                }
            })
        );

        this.all$.add(
            this.fg.valueChanges.pipe(
                debounceTime(500),
                distinctUntilChanged()
            ).subscribe(value => {
                this.onChangeFilter(value);
            })
        );

        this.all$.add(
            this.store.pipe(select(finApplicationsFilter))
                .subscribe(filter => {
                        if (filter && !_.isEqual(filter, this.lastFilterData)) {
                            this.fg.patchValue({
                                stage: filter.stage ? filter.stage : null,
                                query: filter.query ? filter.query : null,
                                datePickerType: filter.datePickerType ? filter.datePickerType : null,
                                dateFrom: filter.dateFrom ? filter.dateFrom : null,
                                dateTo: filter.dateTo ? filter.dateTo : null,
                                limitFrom: filter.limitFrom ? filter.limitFrom : null,
                                limitTo: filter.limitTo ? filter.limitTo : null,
                                contactIds: filter.contactIds ? filter.contactIds : []
                            });
                            this.cd.detectChanges();
                        }
                    }
                )
        );

        this.store.dispatch(new GetFinApplicationStageGroups());
    }

    onSelectStageEvent($event) {
        this.fg.patchValue({
            stage: $event
        });
    }

    private onChangeFilter(values: any) {
        this.lastFilterData = {
            query: values['query'],
            stage: values['stage'],
            datePickerType: values['datePickerType'],
            dateFrom: values['dateFrom'],
            dateTo: values['dateTo'],
            limitFrom: values['limitFrom'],
            limitTo: values['limitTo'],
            contactIds: values['contactIds']
        };
        this.store.dispatch(new ChangeFinApplicationFilter(this.lastFilterData));
    }

    onChangeDateRange($event: any) {
        this.fg.patchValue({
            datePickerType: $event['type'],
            dateFrom: $event['from'],
            dateTo: $event['to']
        });
    }

    onChangeLimitRange($event: any) {
        this.fg.patchValue({
            limitFrom: $event['from'],
            limitTo: $event['to']
        });
    }

    onUserListChanged($event: string[]) {
        this.fg.patchValue({
            contactIds: $event
        });
    }
}
