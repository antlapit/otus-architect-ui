import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {AppConfigService} from '../../core/app-load/services/app-config.service';
import {ServiceResponse} from '../domain/ServiceResponse';
import {Country} from '../domain/Country';
import {IdentityDocumentType} from '../domain/IdentityDocumentType';
import {ConfirmStayDocumentType} from '../domain/ConfirmStayDocumentType';
import {DocAbsenceReason} from '../domain/DocAbsenceReason';
import {TaxationSystem} from '../domain/TaxationSystem';

@Injectable({ providedIn: 'root' })
export class ReferencesService {

    public resourceUrl = '/api/references/references';
    protected config: any = null;

    constructor(private http: HttpClient,
                private configService: AppConfigService) {
        this.configService.config$.subscribe(config => {
            this.config = config;
        });
    }

    getCountries(): Observable<ServiceResponse> {
        return this.http.get<any>(`${((this.config || {}).backend || {}).host}/backend-bg${this.resourceUrl}/countries`, {
            observe: 'response'
        }).pipe(
            map((response: HttpResponse<Object>) => {
                const results = response.body['content'] as Country[];
                results.sort((a, b) => a.name.localeCompare(b.name));
                return new ServiceResponse(response.ok, response.status, null, results);
            }),
            catchError((response: HttpErrorResponse) => {
                const message = {
                    severity: 'error',
                    summary: 'Ошибка при попытке получить справочник стран',
                    detail: (!response || !response.error) ? null : (!response.error.extMessage ? response.error.title : response.error.extMessage)
                };
                return of(new ServiceResponse(response.ok, response.status, message));
            })
        );
    }

    getIdentityDocumentTypes(): Observable<ServiceResponse> {
        return this.http.get<any>(`${((this.config || {}).backend || {}).host}/backend-bg${this.resourceUrl}/identity-document-types`, {
            observe: 'response'
        }).pipe(
            map((response: HttpResponse<Object>) => {
                const results = response.body['content'] as IdentityDocumentType[];
                results.sort((a, b) => a.name.localeCompare(b.name));
                return new ServiceResponse(response.ok, response.status, null, results);
            }),
            catchError((response: HttpErrorResponse) => {
                const message = {
                    severity: 'error',
                    summary: 'Ошибка при попытке получить справочник документов, удостоверяющих личность',
                    detail: (!response || !response.error) ? null : (!response.error.extMessage ? response.error.title : response.error.extMessage)
                };
                return of(new ServiceResponse(response.ok, response.status, message));
            })
        );
    }

    getConfirmStayDocumentTypes(): Observable<ServiceResponse> {
        return this.http.get<any>(`${((this.config || {}).backend || {}).host}/backend-bg${this.resourceUrl}/confirm-stay-document-types`, {
            observe: 'response'
        }).pipe(
            map((response: HttpResponse<Object>) => {
                const results = response.body['content'] as ConfirmStayDocumentType[];
                results.sort((a, b) => a.name.localeCompare(b.name));
                return new ServiceResponse(response.ok, response.status, null, results);
            }),
            catchError((response: HttpErrorResponse) => {
                const message = {
                    severity: 'error',
                    summary: 'Ошибка при попытке получить справочник документов, подтверждающих пребывание',
                    detail: (!response || !response.error) ? null : (!response.error.extMessage ? response.error.title : response.error.extMessage)
                };
                return of(new ServiceResponse(response.ok, response.status, message));
            })
        );
    }

    getDocAbsenceReasons(): Observable<ServiceResponse> {
        return this.http.get<any>(`${((this.config || {}).backend || {}).host}/backend-bg${this.resourceUrl}/doc-absence-reasons`, {
            observe: 'response'
        }).pipe(
            map((response: HttpResponse<Object>) => {
                const results = response.body['content'] as DocAbsenceReason[];
                results.sort((a, b) => a.title.localeCompare(b.title));
                return new ServiceResponse(response.ok, response.status, null, results);
            }),
            catchError((response: HttpErrorResponse) => {
                const message = {
                    severity: 'error',
                    summary: 'Ошибка при попытке получить справочник причин отсутствия документа',
                    detail: (!response || !response.error) ? null : (!response.error.extMessage ? response.error.title : response.error.extMessage)
                };
                return of(new ServiceResponse(response.ok, response.status, message));
            })
        );
    }

    getTaxationSystems(): Observable<ServiceResponse> {
        return this.http.get<any>(`${((this.config || {}).backend || {}).host}/backend-bg${this.resourceUrl}/taxation-systems`, {
            observe: 'response'
        }).pipe(
            map((response: HttpResponse<Object>) => {
                const results = response.body['content'] as TaxationSystem[];
                results.sort((a, b) => a.name.localeCompare(b.name));
                return new ServiceResponse(response.ok, response.status, null, results);
            }),
            catchError((response: HttpErrorResponse) => {
                const message = {
                    severity: 'error',
                    summary: 'Ошибка при попытке получить справочник систем налогообложения',
                    detail: (!response || !response.error) ? null : (!response.error.extMessage ? response.error.title : response.error.extMessage)
                };
                return of(new ServiceResponse(response.ok, response.status, message));
            })
        );
    }
}
