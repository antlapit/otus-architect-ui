import {Action} from "@ngrx/store";
import {FinApplicationFilter} from "../../models/fin-application.model";
import {ServiceResponse} from "../../../shared/domain/ServiceResponse";
import {ProductsFilter} from "../../models/product.model";
import {FinApplicationTypes} from "./fin-application.action";

export enum ProductTypes {
    GetProductList = '[Product] GetProductList',
    HandleProductList = '[Product] HandleProductList',
    ChangeProductFilter = '[Product] ChangeProductFilter',
    LoadProduct = '[Product] LoadProduct',
    HandleProduct = '[Product] HandleProduct',
    ClearProduct = '[Product] ClearProduct',
}

export class GetProductList implements Action {
    readonly type = ProductTypes.GetProductList;

    constructor(public payload: ProductsFilter) {
    }
}

export class HandleProductList implements Action {
    readonly type = ProductTypes.HandleProductList;

    constructor(public response: ServiceResponse) {
    }
}

export class ChangeProductFilter implements Action {
    readonly type = ProductTypes.ChangeProductFilter;

    constructor(public payload: ProductsFilter) {
    }
}

export class LoadProduct implements Action {
    readonly type = ProductTypes.LoadProduct;

    constructor(public payload: {
        id: string
    }) {
    }
}

export class HandleProduct implements Action {
    readonly type = ProductTypes.HandleProduct;

    constructor(public response: ServiceResponse) {
    }
}

export class ClearProduct implements Action {
    readonly type = ProductTypes.ClearProduct;
}

export type ProductActionUnion =
    | GetProductList
    | HandleProductList
    | LoadProduct
    | HandleProduct
    | ChangeProductFilter
    | ClearProduct;
