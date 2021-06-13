import {Actions, Effect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {map, switchMap} from 'rxjs/operators';
import {ServiceResponse} from '../../../shared/domain/ServiceResponse';
import {ProductService} from "../../services/product.service";
import {GetProductList, HandleProduct, HandleProductList, LoadProduct, ProductTypes} from "../actions/product.action";

@Injectable()
export class ProductEffects {
    constructor(
        private actions$: Actions,
        private productService: ProductService,
        private router: Router
    ) {
    }

    @Effect() getProductList$ = this.actions$.pipe(
        ofType<GetProductList>(ProductTypes.GetProductList),
        switchMap(action => {
            return this.productService.queryProducts(action.payload);
        }),
        map((response: ServiceResponse) => new HandleProductList(response))
    );

    @Effect() loadProduct$ = this.actions$.pipe(
        ofType<LoadProduct>(ProductTypes.LoadProduct),
        switchMap(action => {
            return this.productService.findProduct(action.payload.id);
        }),
        map((response: ServiceResponse) => new HandleProduct(response))
    );
}
