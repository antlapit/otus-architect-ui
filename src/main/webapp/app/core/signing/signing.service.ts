import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {AppConfigService} from '../app-load/services/app-config.service';
import {catchError, map} from 'rxjs/operators';
import {ServiceResponse} from '../../shared/domain/ServiceResponse';
import {SimpleDocument} from '../../shared/domain/SimpleDocument';

@Injectable({ providedIn: 'root' })
export class SigningService {
    protected config: any = null;
    protected signingApi: string;

    constructor(private http: HttpClient,
                protected configService: AppConfigService) {
        this.configService.config$.subscribe(config => {
            this.config = config;
            this.signingApi = `${((this.config || {}).backend || {}).host}/backend-bg/api/sign`;
        });
    }

    downloadFile(fileId: string, key: any, code: string): Observable<any> {
        return this.http.get<any>(`${this.signingApi}/signing/files/${fileId}/data?key=${key}&code=${code}`, {observe: 'response'})
    }

    findDocuments(key: any, code: string, captcha: string) {
        return this.http.get<SimpleDocument[]>(`${this.signingApi}/signing/files?key=${key}&code=${code}&captcha=${captcha}`, {observe: 'response'})
            .pipe(
                map((response: HttpResponse<Object>) => {
                    return new ServiceResponse(response.ok, response.status, null, response.body);
                }),
                catchError((response: HttpErrorResponse) => {
                    const message = {
                        severity: 'error',
                        summary: 'Ошибка при загрузке документов на подписи',
                        detail: (!response || !response.error) ? null : (!response.error.extMessage ? response.error.title : response.error.extMessage)
                    };
                    return of(new ServiceResponse(response.ok, response.status, message));
                })
            );
    }

    signFile(fileId: string, sign: string, key: string, code: string) {
        return this.http.post<any>(`${this.signingApi}/signing/files/${fileId}/sign?key=${key}&code=${code}`,
            sign,
            {observe: 'response'})
            .pipe(
                map((response: HttpResponse<Object>) => {
                    return new ServiceResponse(response.ok, response.status, null, response.body);
                }),
                catchError((response: HttpErrorResponse) => {
                    const message = {
                        severity: 'error',
                        summary: 'Ошибка при сохранении подписи файла',
                        detail: (!response || !response.error) ? null : (!response.error.extMessage ? response.error.title : response.error.extMessage)
                    };
                    return of(new ServiceResponse(response.ok, response.status, message));
                })
            );
    }
}
