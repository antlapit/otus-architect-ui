import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ApplicationState} from '../../redux/application-state';
import {ActivatedRoute, Router} from '@angular/router';
import {combineLatest, Subscription} from 'rxjs';
import {isLoadingProducts, products, productsFilter} from '../../redux/selectors';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {categories} from '../../../shared/redux/general.selectors';
import {Workspace} from '../../../shared/domain/Workspace';
import {Location} from '@angular/common';
import {GetProductList} from "../../redux/actions/product.action";
import {Product, ProductsFilter} from "../../models/product.model";
import {Category} from "../../../shared/domain/Category";

@Component({
    selector: 'otus-architect-product-list',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {

    displayedColumns: string[] = ['name', 'category', 'minPrice', 'maxPrice', 'quantity'];
    dataSource = new MatTableDataSource<Product>();

    all$: Subscription = new Subscription();
    isLoadingProducts: boolean;
    products: Product[];
    workspace: Workspace;
    filter: ProductsFilter;
    categories: Category[];
    categoryMap: {};

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

        this.all$.add(
            combineLatest(
                this.store.pipe(select(categories)),
            ).subscribe(([categories]) => {
                this.categories = categories;
                if (!!this.categories) {
                    this.categoryMap = {};
                    for (let category of this.categories) {
                        this.categoryMap[category.categoryId] = category.name;
                    }
                }
                if (!!this.cd) {
                    this.cd.detectChanges();
                }
            })
        );

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

    getCategories(categoryId: string[]) {
        if (!this.categoryMap) {
            return categoryId;
        }
        const catNames = [];
        for (const id of categoryId) {
            const name = this.categoryMap[id];
            catNames.push(!!name ? name : id)
        }
        return catNames;
    }
}
