import {inject, TestBed} from '@angular/core/testing';

import {AppLoadService} from './app-load.service';
import {InitializationPayload} from '../../redux/core.actions';

describe('AppLoadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppLoadService]
    });
  });

  it('should be created', inject([AppLoadService], (service: AppLoadService<InitializationPayload>) => {
    expect(service).toBeTruthy();
  }));
});
