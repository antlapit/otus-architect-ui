import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnDestroy,
    OnInit,
    QueryList,
    ViewChildren
} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ApplicationState} from '../../redux/application-state';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {combineLatest, Subscription} from 'rxjs';
import {FinApplication, FinApplicationForm, PersonFormContainer} from '../../models/fin-application.model';
import {
    LoadContactInfo,
    LoadFinApplicationForm,
    LoadFinApplicationPersonContainer,
    ProcessFinApplication,
    SaveFinApplication,
    UpdateContactInfo,
    UpdateFinApplicationForm,
    UpdateFinApplicationPersonForm
} from '../../redux/actions';
import {
    contactInfo,
    finApplicationPersons,
    isLoadingFinApplicationForm,
    isLoadingFinApplicationPersons,
    isProcessingFinApplicationForm,
    isSavingContactInfo,
    isSavingFinApplicationForm,
    savingFinApplicationPersonForms,
    selectedFinApplicationForm
} from '../../redux/selectors';
import {PersonFormEditComponent} from '../../../shared/person-form-edit/person-form-edit.component';
import {isLoadingContactInfo} from 'src/main/webapp/app/application/redux/selectors/fin-application.selectors';
import {ContactFormEditComponent} from '../../../shared/contact-form-edit/contact-form-edit.component';
import {FinApplicationFormEditComponent} from '../../../shared/fin-application-form-edit/fin-application-form-edit.component';
import {ContactInfo, PersonForm} from '../../models/general.model';

@Component({
    selector: 'otus-architect-application-wizard-company',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './application-wizard-company.component.html',
    styleUrls: ['./application-wizard-company.component.scss']
})
export class ApplicationWizardCompanyComponent implements OnInit, OnDestroy {

    @Input('finApplication')
    selectedFinApplication: FinApplication;

    isLoadingFinApplicationForm: boolean;
    selectedFinApplicationForm: FinApplicationForm;
    isLoadingPersons: boolean;
    persons: PersonFormContainer;
    isLoadingContactInfo: boolean;
    contactInfo: ContactInfo;

    @ViewChildren(FinApplicationFormEditComponent)
    private finApplicationFormComponents: QueryList<FinApplicationFormEditComponent>;

    @ViewChildren(PersonFormEditComponent)
    private personFormComponents: QueryList<PersonFormEditComponent>;

    @ViewChildren(ContactFormEditComponent)
    private contactFormComponents: QueryList<ContactFormEditComponent>;

    isProcessingForm: boolean;
    isSavingFinApplicationForm: boolean;
    isSavingPersonForms: boolean;
    isSavingContactInfo: boolean;

    private all$: Subscription = new Subscription();

    constructor(private cd: ChangeDetectorRef,
                private store: Store<ApplicationState>,
                private route: ActivatedRoute,
                private router: Router,
                private _fb: FormBuilder) {

    }

    ngOnDestroy(): void {
        this.all$.unsubscribe();
    }

    ngOnInit(): void {
        this.all$.add(combineLatest(
            this.store.pipe(select(isLoadingFinApplicationForm)),
            this.store.pipe(select(selectedFinApplicationForm)),
        ).subscribe(([isLoadingFinApplicationForm, selectedFinApplicationForm]) => {
            this.isLoadingFinApplicationForm = isLoadingFinApplicationForm;
            this.selectedFinApplicationForm = selectedFinApplicationForm;
            this.cd.detectChanges();
        }));

        this.all$.add(combineLatest(
            this.store.pipe(select(isLoadingFinApplicationPersons)),
            this.store.pipe(select(finApplicationPersons)),
        ).subscribe(([isLoadingPersons, persons]) => {
            this.isLoadingPersons = isLoadingPersons;
            this.persons = persons;
            this.cd.detectChanges();
        }));

        this.all$.add(combineLatest(
            this.store.pipe(select(isLoadingContactInfo)),
            this.store.pipe(select(contactInfo)),
        ).subscribe(([isLoadingContactInfo, contactInfo]) => {
            this.isLoadingContactInfo = isLoadingContactInfo;
            this.contactInfo = contactInfo;
            this.cd.detectChanges();
        }));

        this.all$.add(combineLatest(
            this.store.pipe(select(isProcessingFinApplicationForm)),
            this.store.pipe(select(isSavingFinApplicationForm)),
            this.store.pipe(select(savingFinApplicationPersonForms)),
            this.store.pipe(select(isSavingContactInfo))
        ).subscribe(([isProcessingForm, isSavingFinApplicationForm, savingPersonForms, isSavingContactInfo]) => {
            this.isProcessingForm = isProcessingForm;
            this.isSavingFinApplicationForm = isSavingFinApplicationForm;
            this.isSavingPersonForms = savingPersonForms > 0;
            this.isSavingContactInfo = isSavingContactInfo;
            this.cd.detectChanges();
        }));

        this.store.dispatch(new LoadFinApplicationForm({
            id: this.selectedFinApplication.id
        }));
        this.store.dispatch(new LoadFinApplicationPersonContainer({
            id: this.selectedFinApplication.id
        }));
        this.store.dispatch(new LoadContactInfo({
            id: this.selectedFinApplication.id
        }));
    }

    processForm() {
        for (const finApplicationFormComponent of this.finApplicationFormComponents.toArray()) {
            if (!finApplicationFormComponent.valid()) {
                return;
            }
        }

        for (const contactFormEditComponent of this.contactFormComponents.toArray()) {
            if (!contactFormEditComponent.valid()) {
                return;
            }
        }

        for (const personFormEditComponent of this.personFormComponents.toArray()) {
            if (!personFormEditComponent.valid()) {
                return;
            }
        }

        // все формы валидны
        if (this.selectedFinApplicationForm.ip) {
            this.store.dispatch(new ProcessFinApplication({
                id: this.selectedFinApplication.id,
                data: {
                    form: (!!this.finApplicationFormComponents && this.finApplicationFormComponents.length > 0)
                        ? this.finApplicationFormComponents.first.getValue() : null,
                    contactInfo: (!!this.contactFormComponents && this.contactFormComponents.length > 0)
                        ? this.contactFormComponents.first.getValue() : null,
                    head: (!!this.personFormComponents && this.personFormComponents.length > 0)
                        ? this.personFormComponents.first.getValue() : null
                }
            }, false));
        } else {
            const value = Object.assign({}, this.selectedFinApplication);
            value.formStatus = 'BENEFICIARIES';
            this.store.dispatch(new SaveFinApplication(value, false, {
                    form: (!!this.finApplicationFormComponents && this.finApplicationFormComponents.length > 0)
                        ? this.finApplicationFormComponents.first.getValue() : null,
                    contactInfo: (!!this.contactFormComponents && this.contactFormComponents.length > 0)
                        ? this.contactFormComponents.first.getValue() : null,
                    head: (!!this.personFormComponents && this.personFormComponents.length > 0)
                        ? this.personFormComponents.first.getValue() : null
                },
                false));
        }
    }

    onChangePerson(form: PersonForm) {
        this.store.dispatch(new UpdateFinApplicationPersonForm({
            id: this.selectedFinApplication.id,
            personId: form.id,
            form: form
        }));
    }

    onChangeContactInfo(ci: ContactInfo) {
        this.store.dispatch(new UpdateContactInfo({
            id: this.selectedFinApplication.id,
            contactInfo: ci
        }));
    }

    onChangeFinApplicationForm(form: FinApplicationForm) {
        this.store.dispatch(new UpdateFinApplicationForm({
            id: this.selectedFinApplication.id,
            form: form
        }));
    }

    forceSave() {
        const value = Object.assign({}, this.selectedFinApplication);
        this.store.dispatch(new SaveFinApplication(value, false, {
                form: (!!this.finApplicationFormComponents && this.finApplicationFormComponents.length > 0)
                    ? this.finApplicationFormComponents.first.getValue() : null,
                contactInfo: (!!this.contactFormComponents && this.contactFormComponents.length > 0)
                    ? this.contactFormComponents.first.getValue() : null,
                head: (!!this.personFormComponents && this.personFormComponents.length > 0)
                    ? this.personFormComponents.first.getValue() : null
            },
            true));
    }
}
