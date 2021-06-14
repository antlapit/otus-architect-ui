import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {CreateFinApplicationRequest, FinApplication, FinApplicationFilter,} from '../models/fin-application.model';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {ApiService} from './api.service';
import {Page, ServiceResponse} from '../../shared/domain/ServiceResponse';
import {CreateFinApplication} from '../redux/actions';
import {ContactInfo, DeliveryInfo, PersonForm} from '../models/general.model';

@Injectable({providedIn: 'root'})
export class FinApplicationService extends ApiService {

    createFinApplication(request: CreateFinApplicationRequest): Observable<ServiceResponse> {
        return this.http.post<CreateFinApplication>(
            `${this.api}/me/orders`,
            request,
            {observe: 'response'}
        ).pipe(
            map((response: HttpResponse<Object>) => {
                return new ServiceResponse(response.ok, response.status, null, response.body);
            }),
            catchError((response: HttpErrorResponse) => {
                const message = {
                    severity: 'error',
                    summary: 'Ошибка при создании заявки',
                    detail: (!response || !response.error) ? null : (!response.error.extMessage ? response.error.title : response.error.extMessage)
                };
                return of(new ServiceResponse(response.ok, response.status, message));
            })
        );
    }

    findApplication(id): Observable<ServiceResponse> {
        return this.http.get<FinApplication>(`${this.api}/me/orders/${id}`, {observe: 'response'})
            .pipe(
                map((response: HttpResponse<Object>) => {
                    console.log(response.body);
                    return new ServiceResponse(response.ok, response.status, null, response.body);
                }),
                catchError((response: HttpErrorResponse) => {
                    const message = {
                        severity: 'error',
                        summary: 'Ошибка при загрузке данных заявки',
                        detail: (!response || !response.error) ? null : (!response.error.extMessage ? response.error.title : response.error.extMessage)
                    };
                    return of(new ServiceResponse(response.ok, response.status, message));
                })
            );
    }

    confirm(id: string): Observable<ServiceResponse> {
        return this.http.post<FinApplication>(`${this.api}/me/orders/${id}/confirm`, {}, {observe: 'response'})
            .pipe(
                map((response: HttpResponse<Object>) => {
                    return new ServiceResponse(response.ok, response.status, null, response.body);
                }),
                catchError((response: HttpErrorResponse) => {
                    const message = {
                        severity: 'error',
                        summary: 'Ошибка при сохранении заявки',
                        detail: (!response || !response.error) ? null : (!response.error.extMessage ? response.error.title : response.error.extMessage)
                    };
                    return of(new ServiceResponse(response.ok, response.status, message));
                })
            );
    }

    queryApplications(filters: FinApplicationFilter): Observable<ServiceResponse> {
        return this.http.post<any>(`${this.api}/me/orders-by-filter`, !!filters ? filters : {}, {
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
                        summary: 'Ошибка при загрузке списка заявок',
                        detail: (!response || !response.error) ? null : (!response.error.extMessage ? response.error.title : response.error.extMessage)
                    };
                    return of(new ServiceResponse(response.ok, response.status, message));
                })
            );
    }

    findDeliveryInfo(id: any) {
        return this.http.get<FinApplication>(`${this.api}/applications/${id}/delivery-info`, {observe: 'response'})
            .pipe(
                map((response: HttpResponse<Object>) => {
                    return new ServiceResponse(response.ok, response.status, null, response.body);
                }),
                catchError((response: HttpErrorResponse) => {
                    const message = {
                        severity: 'error',
                        summary: 'Ошибка при загрузке данных доставки',
                        detail: (!response || !response.error) ? null : (!response.error.extMessage ? response.error.title : response.error.extMessage)
                    };
                    return of(new ServiceResponse(response.ok, response.status, message));
                })
            );
    }

    updateDeliveryInfo(orderId: any, deliveryInfo: DeliveryInfo) {
        return this.http.post<DeliveryInfo>(`${this.api}/me/orders/${orderId}/delivery`,
            deliveryInfo,
            {observe: 'response'})
            .pipe(
                map((response: HttpResponse<Object>) => {
                    return new ServiceResponse(response.ok, response.status, null, response.body);
                }),
                catchError((response: HttpErrorResponse) => {
                    const message = {
                        severity: 'error',
                        summary: 'Ошибка при изменении данных доставки',
                        detail: (!response || !response.error) ? null : (!response.error.extMessage ? response.error.title : response.error.extMessage)
                    };
                    return of(new ServiceResponse(response.ok, response.status, message));
                })
            );
    }

    findContactInfo(id: any) {
        return this.http.get<ContactInfo>(`${this.api}/applications/${id}/contact-info`, {observe: 'response'})
            .pipe(
                map((response: HttpResponse<Object>) => {
                    return new ServiceResponse(response.ok, response.status, null, response.body);
                }),
                catchError((response: HttpErrorResponse) => {
                    const message = {
                        severity: 'error',
                        summary: 'Ошибка при загрузке данных контактного лица',
                        detail: (!response || !response.error) ? null : (!response.error.extMessage ? response.error.title : response.error.extMessage)
                    };
                    return of(new ServiceResponse(response.ok, response.status, message));
                })
            );
    }

    updateContactInfo(id: any, contactInfo: ContactInfo) {
        return this.http.put<PersonForm>(`${this.api}/applications/${id}/contact-info`,
            contactInfo,
            {observe: 'response'})
            .pipe(
                map((response: HttpResponse<Object>) => {
                    return new ServiceResponse(response.ok, response.status, null, response.body);
                }),
                catchError((response: HttpErrorResponse) => {
                    const message = {
                        severity: 'error',
                        summary: 'Ошибка при изменении данных контактного лица',
                        detail: (!response || !response.error) ? null : (!response.error.extMessage ? response.error.title : response.error.extMessage)
                    };
                    return of(new ServiceResponse(response.ok, response.status, message));
                })
            );
    }

    revoke(id: any) {
        return this.http.post<FinApplication>(`${this.api}/me/orders/${id}/reject`, {}, {observe: 'response'})
            .pipe(
                map((response: HttpResponse<Object>) => {
                    return new ServiceResponse(response.ok, response.status, null, response.body);
                }),
                catchError((response: HttpErrorResponse) => {
                    const message = {
                        severity: 'error',
                        summary: 'Ошибка при сохранении заявки',
                        detail: (!response || !response.error) ? null : (!response.error.extMessage ? response.error.title : response.error.extMessage)
                    };
                    return of(new ServiceResponse(response.ok, response.status, message));
                })
            );
    }

    addProduct(orderId: string, productId: string, quantity: number) {
        return this.http.post<FinApplication>(`${this.api}/me/orders/${orderId}/add-items`, {
            productId: productId,
            quantity: quantity
        }, {observe: 'response'})
            .pipe(
                map((response: HttpResponse<Object>) => {
                    return new ServiceResponse(response.ok, response.status, null, response.body);
                }),
                catchError((response: HttpErrorResponse) => {
                    const message = {
                        severity: 'error',
                        summary: 'Ошибка при сохранении заявки',
                        detail: (!response || !response.error) ? null : (!response.error.extMessage ? response.error.title : response.error.extMessage)
                    };
                    return of(new ServiceResponse(response.ok, response.status, message));
                })
            );
    }

    removeProduct(orderId: string, productId: number, quantity: number) {
        return this.http.post<FinApplication>(`${this.api}/me/orders/${orderId}/remove-items`, {
            productId: productId,
            quantity: quantity
        }, {observe: 'response'})
            .pipe(
                map((response: HttpResponse<Object>) => {
                    return new ServiceResponse(response.ok, response.status, null, response.body);
                }),
                catchError((response: HttpErrorResponse) => {
                    const message = {
                        severity: 'error',
                        summary: 'Ошибка при сохранении заявки',
                        detail: (!response || !response.error) ? null : (!response.error.extMessage ? response.error.title : response.error.extMessage)
                    };
                    return of(new ServiceResponse(response.ok, response.status, message));
                })
            );
    }
}
