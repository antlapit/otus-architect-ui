import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ApplicationState} from '../../redux/application-state';
import {ActivatedRoute, Router} from '@angular/router';
import {combineLatest, Subscription} from 'rxjs';
import {isLoadingProduct, selectedProduct} from '../../redux/selectors';
import {ClearFinApplication} from '../../redux/actions';
import {MatSnackBar} from '@angular/material';
import {Location} from '@angular/common';
import {Product} from "../../models/product.model";

@Component({
    selector: 'otus-architect-product-form',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './product-form.component.html',
    styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit, OnDestroy {

    all$: Subscription = new Subscription();
    isLoadingProduct: boolean;
    selectedProduct: Product;

    constructor(private cd: ChangeDetectorRef,
                private store: Store<ApplicationState>,
                private route: ActivatedRoute,
                private router: Router,
                private location: Location,
                private _snackBar: MatSnackBar) {

    }


    ngOnDestroy(): void {
        this.all$.unsubscribe();
    }

    ngOnInit(): void {
        this.all$.add(combineLatest(
            this.store.pipe(select(isLoadingProduct)),
            this.store.pipe(select(selectedProduct)),
        ).subscribe(([isLoadingProduct, selectedProduct]) => {
            this.isLoadingProduct = isLoadingProduct;
            this.selectedProduct = selectedProduct;
            this.cd.detectChanges();
        }));
    }

    doRedirectToRoot() {
        this.router.navigate(['/']);
        this.store.dispatch(new ClearFinApplication());
    }
}
