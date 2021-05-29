import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpParams, HttpResponse} from '@angular/common/http';
import {
    Contract,
    CreateFinApplicationRequest,
    FinApplication,
    FinApplicationFilter,
    FinApplicationForm,
    FinApplicationProcessData,
    PersonFormContainer
} from '../models/fin-application.model';
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
            `${this.bgApi}/applications`,
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
        return this.http.get<FinApplication>(`${this.bgApi}/applications/${id}`, {observe: 'response'})
            .pipe(
                map((response: HttpResponse<Object>) => {
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

    processApplication(id: string, data: FinApplicationProcessData): Observable<ServiceResponse> {
        return this.http.post<FinApplication>(`${this.bgApi}/applications/${id}/process`, data, {observe: 'response'})
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
        const params = this.createFilterParams(filters);
        return this.http.get<any>(`${this.bgApi}/applications`, {
            params: params,
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

    countApplications(filters: FinApplicationFilter): Observable<ServiceResponse> {
        const params = this.createFilterParams(filters);
        return this.http.get<any>(`${this.bgApi}/applications/count`, {
            params: params,
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

    findApplicationForm(id: any) {
        return this.http.get<FinApplication>(`${this.bgApi}/applications/${id}/form`, {observe: 'response'})
            .pipe(
                map((response: HttpResponse<Object>) => {
                    return new ServiceResponse(response.ok, response.status, null, response.body);
                }),
                catchError((response: HttpErrorResponse) => {
                    const message = {
                        severity: 'error',
                        summary: 'Ошибка при загрузке основной формы заявки',
                        detail: (!response || !response.error) ? null : (!response.error.extMessage ? response.error.title : response.error.extMessage)
                    };
                    return of(new ServiceResponse(response.ok, response.status, message));
                })
            );
    }

    findContract(id: any) {
        return this.http.get<FinApplication>(`${this.bgApi}/applications/${id}/contract`, {observe: 'response'})
            .pipe(
                map((response: HttpResponse<Object>) => {
                    return new ServiceResponse(response.ok, response.status, null, response.body);
                }),
                catchError((response: HttpErrorResponse) => {
                    const message = {
                        severity: 'error',
                        summary: 'Ошибка при загрузке данных закупки',
                        detail: (!response || !response.error) ? null : (!response.error.extMessage ? response.error.title : response.error.extMessage)
                    };
                    return of(new ServiceResponse(response.ok, response.status, message));
                })
            );
    }

    updateContract(id: any, contract: Contract) {
        return this.http.put<PersonForm>(`${this.bgApi}/applications/${id}/contract`,
            contract,
            {observe: 'response'})
            .pipe(
                map((response: HttpResponse<Object>) => {
                    return new ServiceResponse(response.ok, response.status, null, response.body);
                }),
                catchError((response: HttpErrorResponse) => {
                    const message = {
                        severity: 'error',
                        summary: 'Ошибка при изменении данных закупки',
                        detail: (!response || !response.error) ? null : (!response.error.extMessage ? response.error.title : response.error.extMessage)
                    };
                    return of(new ServiceResponse(response.ok, response.status, message));
                })
            );
    }

    findDeliveryInfo(id: any) {
        return this.http.get<FinApplication>(`${this.bgApi}/applications/${id}/delivery-info`, {observe: 'response'})
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

    updateDeliveryInfo(id: any, deliveryInfo: DeliveryInfo) {
        return this.http.put<DeliveryInfo>(`${this.bgApi}/applications/${id}/delivery-info`,
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

    findPersons(id: any) {
        return this.http.get<PersonFormContainer>(`${this.bgApi}/applications/${id}/person-relations`, {observe: 'response'})
            .pipe(
                map((response: HttpResponse<Object>) => {
                    return new ServiceResponse(response.ok, response.status, null, response.body);
                }),
                catchError((response: HttpErrorResponse) => {
                    const message = {
                        severity: 'error',
                        summary: 'Ошибка при загрузке анкет ФЛ',
                        detail: (!response || !response.error) ? null : (!response.error.extMessage ? response.error.title : response.error.extMessage)
                    };
                    return of(new ServiceResponse(response.ok, response.status, message));
                })
            );
    }

    updatePerson(id: any, personId: any, form: PersonForm) {
        return this.http.put<PersonForm>(`${this.bgApi}/applications/${id}/person-relations/${personId}`,
            form,
            {observe: 'response'})
            .pipe(
                map((response: HttpResponse<Object>) => {
                    return new ServiceResponse(response.ok, response.status, null, response.body);
                }),
                catchError((response: HttpErrorResponse) => {
                    const message = {
                        severity: 'error',
                        summary: 'Ошибка при изменении анкеты ФЛ',
                        detail: (!response || !response.error) ? null : (!response.error.extMessage ? response.error.title : response.error.extMessage)
                    };
                    return of(new ServiceResponse(response.ok, response.status, message));
                })
            );
    }

    saveFinApplication(finApplication: FinApplication, data: FinApplicationProcessData) {
        data.application = finApplication;
        return this.http.put<FinApplication>(`${this.bgApi}/applications/${finApplication.id}`,
            data,
            {observe: 'response'})
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

    createPerson(id: string, role: string) {
        return this.http.post<PersonForm>(`${this.bgApi}/applications/${id}/person-relations`,
            {
                role: role
            },
            {observe: 'response'})
            .pipe(
                map((response: HttpResponse<Object>) => {
                    return new ServiceResponse(response.ok, response.status, null, response.body);
                }),
                catchError((response: HttpErrorResponse) => {
                    const message = {
                        severity: 'error',
                        summary: 'Ошибка при создании анкеты ФЛ',
                        detail: (!response || !response.error) ? null : (!response.error.extMessage ? response.error.title : response.error.extMessage)
                    };
                    return of(new ServiceResponse(response.ok, response.status, message));
                })
            );
    }

    deletePerson(id: string, personId: string, role: string) {
        return this.http.delete(`${this.bgApi}/applications/${id}/person-relations/${personId}/role/${role}`,
            {observe: 'response'})
            .pipe(
                map((response: HttpResponse<Object>) => {
                    return new ServiceResponse(response.ok, response.status, null, personId);
                }),
                catchError((response: HttpErrorResponse) => {
                    const message = {
                        severity: 'error',
                        summary: 'Ошибка при удалении анкеты ФЛ',
                        detail: (!response || !response.error) ? null : (!response.error.extMessage ? response.error.title : response.error.extMessage)
                    };
                    return of(new ServiceResponse(response.ok, response.status, message));
                })
            );
    }

    findContactInfo(id: any) {
        return this.http.get<ContactInfo>(`${this.bgApi}/applications/${id}/contact-info`, {observe: 'response'})
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
        return this.http.put<PersonForm>(`${this.bgApi}/applications/${id}/contact-info`,
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

    updateFinApplicationForm(id: any, form: FinApplicationForm) {
        return this.http.put<FinApplicationForm>(`${this.bgApi}/applications/${id}/form`,
            form,
            {observe: 'response'})
            .pipe(
                map((response: HttpResponse<Object>) => {
                    return new ServiceResponse(response.ok, response.status, null, response.body);
                }),
                catchError((response: HttpErrorResponse) => {
                    const message = {
                        severity: 'error',
                        summary: 'Ошибка при изменении данных основной формы',
                        detail: (!response || !response.error) ? null : (!response.error.extMessage ? response.error.title : response.error.extMessage)
                    };
                    return of(new ServiceResponse(response.ok, response.status, message));
                })
            );
    }

    requestAdjustment(id: any) {
        return this.http.post<FinApplication>(`${this.bgApi}/applications/${id}/adjustment/request`, {}, {observe: 'response'})
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

    revoke(id: any) {
        return this.http.post<FinApplication>(`${this.bgApi}/applications/${id}/revoke`, {}, {observe: 'response'})
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

    private createFilterParams(filters: FinApplicationFilter): HttpParams {
        let params: HttpParams = new HttpParams();
        if (!!filters) {
            if (!!filters.stage) {
                params = params.set('stage', filters.stage);
            } else {
                params = params.delete('stage');
            }

            if (!!filters.contactIds && filters.contactIds.length > 0) {
                params = params.set('contactIds', filters.contactIds.join(','));
            } else {
                params = params.delete('contactIds');
            }

            if (!!filters.query) {
                params = params.set('query', filters.query);
            } else {
                params = params.delete('query');
            }
            if (!!filters.dateFrom) {
                params = params.set('dateFrom', filters.dateFrom);
            } else {
                params = params.delete('dateFrom');
            }
            if (!!filters.dateTo) {
                params = params.set('dateTo', filters.dateTo);
            } else {
                params = params.delete('dateTo');
            }
            if (!!filters.limitFrom) {
                params = params.set('limitFrom', filters.limitFrom);
            } else {
                params = params.delete('limitFrom');
            }
            if (!!filters.limitTo) {
                params = params.set('limitTo', filters.limitTo);
            } else {
                params = params.delete('limitTo');
            }
        }
        return params;
    }

}
