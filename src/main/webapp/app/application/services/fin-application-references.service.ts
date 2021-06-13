import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {ApiService} from './api.service';
import {ServiceResponse} from '../../shared/domain/ServiceResponse';
import {DeliveryType} from '../models/references.model';

@Injectable({providedIn: 'root'})
export class FinApplicationReferencesService extends ApiService {

    getFormStatuses(): Observable<ServiceResponse> {
        return this.http.get<any[]>(`${this.api}/references/application-form-statuses`, {observe: 'response'})
            .pipe(
                map((response: HttpResponse<Object>) => {
                    const body = response.body;
                    return new ServiceResponse(response.ok, response.status, null, body);
                }),
                catchError((response: HttpErrorResponse) => {
                    const message = {
                        severity: 'error',
                        summary: 'Ошибка при попытке получить справочник статусов формы',
                        detail: (!response || !response.error) ? null : (!response.error.extMessage ? response.error.title : response.error.extMessage)
                    };
                    return of(new ServiceResponse(response.ok, response.status, message));
                })
            );
    }

    getDeliveryTypes() {
        return this.http.get<DeliveryType[]>(`${this.api}/references/delivery-types`, {observe: 'response'})
            .pipe(
                map((response: HttpResponse<Object>) => {
                    const body = response.body;
                    return new ServiceResponse(response.ok, response.status, null, body);
                }),
                catchError((response: HttpErrorResponse) => {
                    const message = {
                        severity: 'error',
                        summary: 'Ошибка при попытке получить справочник вариантов доставки',
                        detail: (!response || !response.error) ? null : (!response.error.extMessage ? response.error.title : response.error.extMessage)
                    };
                    return of(new ServiceResponse(response.ok, response.status, message));
                })
            );
    }

}
