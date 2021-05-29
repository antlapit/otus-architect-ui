import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {AppConfigService} from '../../core/app-load/services/app-config.service';
import {ServiceResponse} from '../domain/ServiceResponse';

@Injectable({ providedIn: 'root' })
export class SuggestService {
    public resourceUrl = '/api/references/suggest';
    protected config: any = null;

    constructor(private http: HttpClient,
                private configService: AppConfigService) {
        this.configService.config$.subscribe(config => {
            this.config = config;
        });
    }

    suggestAddress(address: string, count: number): Observable<ServiceResponse> {
        if (!address) {
            return new Observable(observable => observable.next(new ServiceResponse(true, 200, null, [])));
        }
        // tslint:disable-next-line:max-line-length
        return this.http.get<string[]>(`${((this.config || {}).backend || {}).host}/backend-bg${this.resourceUrl}/address?query=${address}&count=${count}`, { observe: 'response' })
            .pipe(
                map((response: HttpResponse<Object>) => {
                    const body = response.body;
                    return new ServiceResponse(response.ok, response.status, null, body);
                }),
                catchError((response: HttpErrorResponse) => {
                    const message = {
                        severity: 'error',
                        summary: 'Ошибка при попытке получить справочник адресов',
                        detail: (!response || !response.error) ? null : (!response.error.extMessage ? response.error.title : response.error.extMessage)
                    };
                    return of(new ServiceResponse(response.ok, response.status, message));
                })
            );
    }

    suggestCompany(query: string, count: number): Observable<ServiceResponse> {
        if (!query) {
            return new Observable(observable => observable.next(new ServiceResponse(true, 200, null, [])));
        }
        // tslint:disable-next-line:max-line-length
        return this.http.get<any[]>(`${((this.config || {}).backend || {}).host}/backend-bg${this.resourceUrl}/company?query=${query}&count=${count}`, { observe: 'response' })
            .pipe(
                map((response: HttpResponse<Object>) => {
                    const body = response.body;
                    return new ServiceResponse(response.ok, response.status, null, body);
                }),
                catchError((response: HttpErrorResponse) => {
                    const message = {
                        severity: 'error',
                        summary: 'Ошибка при попытке получить справочник кампаний',
                        detail: (!response || !response.error) ? null : (!response.error.extMessage ? response.error.title : response.error.extMessage)
                    };
                    return of(new ServiceResponse(response.ok, response.status, message));
                })
            );
    }

    suggestBank(query: string, count: number): Observable<ServiceResponse> {
        if (!query) {
            return new Observable(observable => observable.next(new ServiceResponse(true, 200, null, [])));
        }
        // tslint:disable-next-line:max-line-length
        return this.http.get<any[]>(`${((this.config || {}).backend || {}).host}/backend-bg${this.resourceUrl}/bank?query=${query}&count=${count}`, { observe: 'response' })
            .pipe(
                map((response: HttpResponse<Object>) => {
                    const body = response.body;
                    return new ServiceResponse(response.ok, response.status, null, body);
                }),
                catchError((response: HttpErrorResponse) => {
                    const message = {
                        severity: 'error',
                        summary: 'Ошибка при попытке получить справочник банков',
                        detail: (!response || !response.error) ? null : (!response.error.extMessage ? response.error.title : response.error.extMessage)
                    };
                    return of(new ServiceResponse(response.ok, response.status, message));
                })
            );
    }

}
