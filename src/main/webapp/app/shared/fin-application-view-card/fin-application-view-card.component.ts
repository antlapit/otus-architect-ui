import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FinApplicationForm} from '../../application/models/fin-application.model';
import {Country} from '../domain/Country';
import {select, Store} from '@ngrx/store';
import {ApplicationState} from '../../application/redux/application-state';
import {ActivatedRoute, Router} from '@angular/router';
import {combineLatest, of, Subscription} from 'rxjs';
import {
    confirmStayDocumentTypes,
    countries,
    identityDocumentTypes,
    isLoadingConfirmStayDocumentTypes,
    isLoadingCountries,
    isLoadingIdentityDocumentTypes
} from '../redux/general.selectors';
import {IdentityDocumentType} from '../domain/IdentityDocumentType';
import {ConfirmStayDocumentType} from '../domain/ConfirmStayDocumentType';

@Component({
    selector: 'otus-architect-fin-application-view-card',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './fin-application-view-card.component.html',
    styleUrls: ['./fin-application-view-card.component.scss']
})
export class FinApplicationViewCardComponent implements OnInit, OnDestroy {

    @Input('form')
    set form(val: FinApplicationForm) {
        this._form = val;
        this.initRefEntities();
    }

    @Input()
    loading: boolean;

    @Input()
    showFields: string[] = [];

    _form: FinApplicationForm;

    country: Country;
    identityDocument: IdentityDocumentType;
    confirmStayDocument: ConfirmStayDocumentType;

    migrationCardNotRequired: boolean;
    migrationCardValueNotRequired: boolean;
    migrationCardAbsenceNotRequired: boolean;

    visaNotRequired: boolean;
    visaValueNotRequired: boolean;
    visaAbsenceNotRequired: boolean;

    isLoadingCountries: boolean;
    countries: Country[];

    isLoadingIdentityDocumentTypes: boolean;
    identityDocumentTypes: IdentityDocumentType[];

    isLoadingConfirmStayDocumentTypes: boolean;
    confirmStayDocumentTypes: ConfirmStayDocumentType[];

    private all$: Subscription = new Subscription();

    constructor(private cd: ChangeDetectorRef,
                private store: Store<ApplicationState>,
                private route: ActivatedRoute,
                private router: Router) {

    }

    ngOnDestroy(): void {
        this.all$.unsubscribe();
    }

    ngOnInit(): void {
        this.all$.add(
            combineLatest(
                this.store.pipe(select(isLoadingIdentityDocumentTypes)),
                this.store.pipe(select(identityDocumentTypes)),
                of(this._form)
            ).subscribe(([isLoadingIdentityDocumentTypes, identityDocumentTypes, _form]) => {
                this.isLoadingIdentityDocumentTypes = isLoadingIdentityDocumentTypes;
                this.identityDocumentTypes = identityDocumentTypes;
                this.initRefEntities();
                this.cd.detectChanges();
            })
        );

        this.all$.add(
            combineLatest(
                this.store.pipe(select(isLoadingConfirmStayDocumentTypes)),
                this.store.pipe(select(confirmStayDocumentTypes)),
                of(this._form)
            ).subscribe(([isLoadingConfirmStayDocumentTypes, confirmStayDocumentTypes, _form]) => {
                this.isLoadingConfirmStayDocumentTypes = isLoadingConfirmStayDocumentTypes;
                this.confirmStayDocumentTypes = confirmStayDocumentTypes;
                this.initRefEntities();
                this.cd.detectChanges();
            })
        );

        this.all$.add(
            combineLatest(
                this.store.pipe(select(isLoadingCountries)),
                this.store.pipe(select(countries)),
                of(this._form)
            ).subscribe(([isLoadingCountries, countries, _form]) => {
                this.isLoadingCountries = isLoadingCountries;
                this.countries = countries;
                this.initRefEntities();
                this.cd.detectChanges();
            })
        );
    }

    private initRefEntities() {
        if (!!this._form) {
            if (!!this.identityDocumentTypes) {
                this.identityDocument = this.findById(this.identityDocumentTypes, this._form.regDocumentTypeId);
            }

            if (!!this.confirmStayDocumentTypes) {
                this.confirmStayDocument = this.findById(this.confirmStayDocumentTypes, this._form.visaDocumentTypeId);
            }

            if (!!this.countries && !!this._form.citizenshipId) {
                this.country = this.findById(this.countries, this._form.citizenshipId);
            } else {
                // FIXME изменить на true, когда подключатся справочники
                this.country = {
                    visa: false,
                    migrationCard: false
                };
            }

            this.migrationCardNotRequired = this._form.resident || !this.country || !this.country.migrationCard;
            this.migrationCardValueNotRequired = this.migrationCardNotRequired || !this._form.migrationCardPresented;
            this.migrationCardAbsenceNotRequired = this.migrationCardNotRequired || this._form.migrationCardPresented;

            this.visaNotRequired = this._form.resident || !this.country || !this.country.visa;
            this.visaValueNotRequired = this.visaNotRequired || !this._form.visaPresented;
            this.visaAbsenceNotRequired = this.visaNotRequired || this._form.visaPresented;
        }
    }

    private findById(reference: any[], id: string): Country {
        if (id) {
            for (const ref of reference) {
                if (ref['id'] === id) {
                    return ref;
                }
            }
        }
        return null;
    }

}
