import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {GeneralState} from '../../../shared/redux/general.reducer';
import {Subscription} from 'rxjs';
import {LoadUserInfo, ShowGeneralToastMessage} from '../../../shared/redux/general.actions';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomErrorStateMatcher} from "../../../shared/form-validator/custom-error-state.matcher";
import {GeneralDataService} from "../../../shared/services/general-data.service";
import {Product} from "../../models/product.model";
import {FinApplicationService} from "../../services/fin-application.service";
import {selectedProduct} from "../../redux/selectors";
import {AuthService} from "../../../core/auth/auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'otus-architect-add-product-to-order-panel',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './add-product-to-order-panel.component.html',
    styleUrls: ['./add-product-to-order-panel.component.scss']
})
export class AddProductToOrderPanelComponent implements OnInit, OnDestroy {

    @Input('product')
    product: Product

    saving: boolean;
    fg: FormGroup;
    matcher = new CustomErrorStateMatcher();
    all$ = new Subscription();

    constructor(private store: Store<GeneralState>,
                private cd: ChangeDetectorRef,
                private _fb: FormBuilder,
                private dataService: FinApplicationService,
                private authService: AuthService,
                private router: Router) {

    }

    ngOnInit() {
        this.fg = this._fb.group({
            orderId: ['', [Validators.required]],
            quantity: ['', [Validators.required]]
        });
    }

    ngOnDestroy(): void {
        this.all$.unsubscribe();
    }

    isAuthenticated() {
        return this.authService.isAuthenticated;
    };

    addProduct() {
        const vals = this.fg.getRawValue();
        this.all$.add(
            this.dataService.addProduct(vals['orderId'], this.product.productId, parseInt(vals['quantity']))
                .subscribe(resp => {
                    this.store.dispatch(new ShowGeneralToastMessage({
                        severity: 'info',
                        summary: 'Итоговая сумма будет рассчитана через несколько секунд',
                        detail: ''
                    }))
                })
        );
    }

    goToOrder() {
        const vals = this.fg.getRawValue();
        this.router.navigate(['applications', vals['orderId']])
    }
}
