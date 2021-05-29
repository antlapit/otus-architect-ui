import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, of} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  public config$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private httpClient: HttpClient) { }

  public loadAppConfig() {
    console.log('Loading APP config...');
    return this.httpClient.get('./assets/config/config.json', { responseType: 'json' })
      .pipe(
        catchError(err => {
          return of(null);
        })
      )
      .toPromise()
      .then(data => {
        this.config$.next(data);
      });
  }
}
