import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../../redux/application-state';
import {interval, Subscription} from 'rxjs';
import {FinApplication, OrderItem} from '../../models/fin-application.model';
import {AppConfigService} from '../../../core/app-load/services/app-config.service';
import {PlatformLocation} from '@angular/common';
import {LoadFinApplication, ProcessFinApplication, UpdateDeliveryInfo} from "../../redux/actions";
import {Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material";
import {FinApplicationService} from "../../services/fin-application.service";
import {ProductService} from "../../services/product.service";
import {Product} from "../../models/product.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomErrorStateMatcher} from "../../../shared/form-validator/custom-error-state.matcher";
import {debounce} from "rxjs/operators";

@Component({
    selector: 'otus-architect-application-complete-view',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './application-complete-view.component.html',
    styleUrls: ['./application-complete-view.component.scss']
})
export class ApplicationCompleteViewComponent implements OnInit, OnDestroy {

    displayedColumns: string[] = ['rowNum', 'productId', 'price', 'quantity', 'total', 'menu'];
    dataSource = new MatTableDataSource<OrderItem>();

    private all$: Subscription = new Subscription();
    items: OrderItem[];
    productIds: number[];
    products: Product[];
    productsMap: any = {};
    minDeliveryDate = new Date();

    fg: FormGroup;
    matcher = new CustomErrorStateMatcher();
    changes: string[];

    @Input('finApplication')
    set finApplication(finApplication) {
        this.selectedFinApplication = finApplication;
        if (!!this.selectedFinApplication.items && !!this.selectedFinApplication.items.items) {
            this.items = this.selectedFinApplication.items.items;
            this.dataSource.data = this.selectedFinApplication.items.items;
            this.productIds = [];
            for (let item of this.items) {
                this.productIds.push(item.productId);
            }
            this.loadProducts(this.productIds);

            this.changes = this.parseChanges(this.selectedFinApplication.changes);
            console.log(this.changes);
        }
        this.cd.detectChanges();
    }

    selectedFinApplication: FinApplication;

    constructor(private cd: ChangeDetectorRef,
                private store: Store<ApplicationState>,
                private configService: AppConfigService,
                private platformLocation: PlatformLocation,
                private router: Router,
                private dataService: FinApplicationService,
                private productService: ProductService,
                private _fb: FormBuilder) {
    }

    ngOnDestroy(): void {
        this.all$.unsubscribe();
    }

    ngOnInit(): void {
        this.fg = this._fb.group({
            address: ['', [Validators.required]],
            date: ['', [Validators.required]]
        });
        if (!this.selectedFinApplication || this.selectedFinApplication.status != 'NEW') {
            this.fg.disable();
        } else {
            this.fg.enable();
        }

        this.all$.add(
            this.fg.valueChanges.pipe(
                (debounce(ev => interval(1000)))
            )
                .subscribe(
                values => {
                    if (this.fg.valid) {
                        this.store.dispatch(new UpdateDeliveryInfo({
                            id: this.selectedFinApplication.orderId,
                            deliveryInfo: values
                        }))
                    }
                }
            )
        );

        if (!!this.selectedFinApplication && !!this.selectedFinApplication.delivery) {
            this.fg.patchValue({
                address: this.selectedFinApplication.delivery.address,
                date: this.selectedFinApplication.delivery.date,
            }, {emitEvent: false});
        }
    }

    loadProducts(ids: number[]): void {
        this.all$.add(
            this.productService.queryProducts({
                productId: ids
            }).subscribe(
                resp => {
                    this.products = resp.data.items;
                    this.productsMap = {};
                    for (let product of this.products) {
                        this.productsMap[product.productId] = product;
                    }
                    this.cd.detectChanges();
                }
            )
        );
    }

    confirm() {
        this.store.dispatch(new ProcessFinApplication({
            id: this.selectedFinApplication.orderId
        }, true));
    }

    goToProduct(productId: any) {
        this.router.navigate(['catalog', productId])
    }

    delete(item: OrderItem) {
        this.all$.add(this.dataService.removeProduct(this.selectedFinApplication.orderId, item.productId, item.quantity)
            .subscribe(value =>
                this.store.dispatch(new LoadFinApplication({
                    id: this.selectedFinApplication.orderId
                })))
        );
    }

    increase(item) {
        this.all$.add(this.dataService.addProduct(this.selectedFinApplication.orderId, item.productId, 1)
            .subscribe(value =>
                this.store.dispatch(new LoadFinApplication({
                    id: this.selectedFinApplication.orderId
                })))
        );
    }

    decrease(item) {
        this.all$.add(this.dataService.removeProduct(this.selectedFinApplication.orderId, item.productId, 1)
            .subscribe(value =>
                this.store.dispatch(new LoadFinApplication({
                    id: this.selectedFinApplication.orderId
                })))
        );
    }

    getProductName(productId: any) {
        const product = this.productsMap[productId];
        if (!product) {
            return 'Товар c ИД ' + productId;
        } else {
            return product.name;
        }
    }

    parseChanges(changes: string | undefined) {
        if (!changes) {
            return [];
        }
        return changes.split('<br>');
    }
}
