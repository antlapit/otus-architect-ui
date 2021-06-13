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
import {combineLatest, Subscription} from 'rxjs';
import {categories, getUserInfo, userRoles} from '../../../shared/redux/general.selectors';
import {finApplicationsFilter, productsFilter} from '../../redux/selectors';
import {FormBuilder, FormGroup} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import * as _ from 'lodash';
import {AppConfigService} from '../../../core/app-load/services/app-config.service';
import {UserIdentity} from '../../../core/domain/UserIdentity';
import {ChangeProductFilter} from "../../redux/actions/product.action";
import {Category} from "../../../shared/domain/Category";

@Component({
    selector: 'otus-architect-product-list-filter',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './product-list-filter.component.html',
    styleUrls: ['./product-list-filter.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ProductListFilterComponent implements OnInit, OnDestroy {

    userRoles: String[];
    userInfo: UserIdentity;
    fg: FormGroup;

    config: any;
    maxLimit: number;
    minLimit: number;

    categories: Category[];

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
            nameInfix: ['', []],
            descriptionInfix: ['', []],
            minPrice: ['', []],
            maxPrice: ['', []],
            categoryId: [[], []]
        });

        this.all$.add(
            combineLatest(
                this.store.pipe(select(categories)),
                this.store.pipe(select(getUserInfo))
            ).subscribe(([categories, userInfo]) => {
                this.categories = categories;
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
            this.store.pipe(select(productsFilter))
                .subscribe(filter => {
                        if (filter && !_.isEqual(filter, this.lastFilterData)) {
                            this.fg.patchValue({
                                nameInfix: filter.nameInfix ? filter.nameInfix : null,
                                descriptionInfix: filter.descriptionInfix ? filter.descriptionInfix : null,
                                minPrice: filter.minPrice ? filter.minPrice : null,
                                maxPrice: filter.maxPrice ? filter.maxPrice : null,
                                categoryId: filter.categoryId ? filter.categoryId : []
                            });
                            this.cd.detectChanges();
                        }
                    }
                )
        );

    }

    private onChangeFilter(values: any) {
        this.lastFilterData = {
            nameInfix: values['nameInfix'],
            descriptionInfix: values['descriptionInfix'],
            minPrice: values['minPrice'],
            maxPrice: values['maxPrice'],
            categoryId: values['categoryId']
        };
        this.store.dispatch(new ChangeProductFilter(this.lastFilterData));
    }

    onChangeLimitRange($event: any) {
        this.fg.patchValue({
            minPrice: $event['from'],
            maxPrice: $event['to']
        });
    }

    onCategoryListChanged($event: string[]) {
        this.fg.patchValue({
            categoryId: $event
        });
    }
}
