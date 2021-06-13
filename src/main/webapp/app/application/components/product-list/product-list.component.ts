import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ApplicationState} from '../../redux/application-state';
import {ActivatedRoute, Router} from '@angular/router';
import {GetFinApplicationCounters, GetFinApplicationList, RevokeFinApplication} from '../../redux/actions';
import {combineLatest, Subscription} from 'rxjs';
import {
    finApplications,
    finApplicationsFilter,
    isLoadingFinApplication,
    isLoadingFinApplications, isLoadingProducts, products, productsFilter
} from '../../redux/selectors';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {FinApplication, FinApplicationFilter} from '../../models/fin-application.model';
import {getWorkspace} from '../../../shared/redux/general.selectors';
import {Workspace, WorkspaceMenuItem} from '../../../shared/domain/Workspace';
import {Location} from '@angular/common';
import {GetProductList} from "../../redux/actions/product.action";
import {Product, ProductsFilter} from "../../models/product.model";

@Component({
    selector: 'otus-architect-product-list',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {

    displayedColumns: string[] = ['name', 'description', 'minPrice', 'maxPrice', 'quantity'];
    dataSource = new MatTableDataSource<Product>();

    all$: Subscription = new Subscription();
    isLoadingProducts: boolean;
    products: Product[];
    workspace: Workspace;
    filter: ProductsFilter;

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
            this.store.pipe(select(isLoadingProducts)),
            this.store.pipe(select(products))
        ).subscribe(([isLoadingProducts, products]) => {
            this.isLoadingProducts = isLoadingProducts;
            this.products = products;
            console.log(this.products);
            this.dataSource.data = this.products;
            this.cd.detectChanges();
        }));

        this.all$.add(combineLatest(
            this.store.pipe(select(productsFilter))
        ).subscribe(([filter]) => {
            this.filter = filter;
            this.changeFilterUrl(this.filter);
            this.store.dispatch(new GetProductList(this.filter));
            this.cd.detectChanges();
        }));

        this.store.dispatch(new GetProductList(this.filter));
    }

    goToProduct(id: string) {
        this.router.navigate(['catalog', id]);
    }

    private changeFilterUrl(filter: ProductsFilter) {
        const normalizeUrl = this.router.url.split('?')[0];
        const queryParams = {...this.route.snapshot.queryParams};
        queryParams['productFilter'] = encodeURIComponent(JSON.stringify(filter));
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
        return !this.filter || (!this.filter.nameInfix && !this.filter.descriptionInfix
            && (!this.filter.categoryId || this.filter.categoryId.length === 0)
            && !this.filter.minPrice && !this.filter.maxPrice
        );
    }
}
