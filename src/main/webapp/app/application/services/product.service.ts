import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {FinApplication} from '../models/fin-application.model';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {ApiService} from './api.service';
import {Page, ServiceResponse} from '../../shared/domain/ServiceResponse';
import {ProductsFilter} from "../models/product.model";

@Injectable({providedIn: 'root'})
export class ProductService extends ApiService {

    findProduct(id): Observable<ServiceResponse> {
        return this.http.get<FinApplication>(`${this.api}/products/${id}`, {observe: 'response'})
            .pipe(
                map((response: HttpResponse<Object>) => {
                    return new ServiceResponse(response.ok, response.status, null, response.body);
                }),
                catchError((response: HttpErrorResponse) => {
                    const message = {
                        severity: 'error',
                        summary: 'Ошибка при загрузке данных товара',
                        detail: (!response || !response.error) ? null : (!response.error.extMessage ? response.error.title : response.error.extMessage)
                    };
                    return of(new ServiceResponse(response.ok, response.status, message));
                })
            );
    }

    queryProducts(filters: ProductsFilter): Observable<ServiceResponse> {
        return this.http.post<any>(`${this.api}/products/find-by-filter`, !!filters ? {
            "nameInfix": filters.nameInfix,
            "descriptionInfix": filters.descriptionInfix,
            "minPrice": !!filters.minPrice ? filters.minPrice + "" : null,
            "maxPrice": !!filters.maxPrice ? filters.maxPrice + "" : null,
            "categoryId": filters.categoryId
        } : {}, {
            observe: 'response'
        })
            .pipe(
                map((response: HttpResponse<Object>) => {
                    const dataSet = response.body as Page;
                    return new ServiceResponse(response.ok, response.status, null, dataSet);
                }),
                catchError((response: HttpErrorResponse) => {
                    const message = {
                        severity: 'error',
                        summary: 'Ошибка при загрузке списка товаров',
                        detail: (!response || !response.error) ? null : (!response.error.extMessage ? response.error.title : response.error.extMessage)
                    };
                    return of(new ServiceResponse(response.ok, response.status, message));
                })
            );
    }

}
