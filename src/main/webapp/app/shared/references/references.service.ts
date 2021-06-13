import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {AppConfigService} from '../../core/app-load/services/app-config.service';
import {ServiceResponse} from '../domain/ServiceResponse';
import {Category} from '../domain/Category';

@Injectable({ providedIn: 'root' })
export class ReferencesService {

    public resourceUrl = '/api';
    protected config: any = null;

    constructor(private http: HttpClient,
                private configService: AppConfigService) {
        this.configService.config$.subscribe(config => {
            this.config = config;
        });
    }

    getCategories(): Observable<ServiceResponse> {
        return this.http.get<any>(`${((this.config || {}).backend || {}).host}${this.resourceUrl}/categories`, {
            observe: 'response'
        }).pipe(
            map((response: HttpResponse<Object>) => {
                const results = response.body as Category[];
                results.sort((a, b) => a.name.localeCompare(b.name));
                return new ServiceResponse(response.ok, response.status, null, results);
            }),
            catchError((response: HttpErrorResponse) => {
                const message = {
                    severity: 'error',
                    summary: 'Ошибка при попытке получить справочник категорий',
                    detail: (!response || !response.error) ? null : (!response.error.extMessage ? response.error.title : response.error.extMessage)
                };
                return of(new ServiceResponse(response.ok, response.status, message));
            })
        );
    }
}
