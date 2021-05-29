import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OAuthModule} from 'angular-oauth2-oidc';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from './auth.interceptor';
import {AuthEffects} from './redux/auth.effects';
import {reducer} from './redux/auth.reducer';
import {AuthGuard} from './auth.guard';
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {LocalStorageService, SessionStorageService} from "ngx-webstorage";
import {CookieModule} from "ngx-cookie";
import {HasSessionGuard} from "./has-session.guard";

@NgModule({
  imports: [
    CommonModule,
    OAuthModule.forRoot(),
    StoreModule.forFeature('auth', reducer),
    EffectsModule.forFeature([AuthEffects]),
    CookieModule.forRoot(),
  ],
  providers: [
    LocalStorageService,
    SessionStorageService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthGuard,
    HasSessionGuard
  ]
})
export class AuthModule { }
