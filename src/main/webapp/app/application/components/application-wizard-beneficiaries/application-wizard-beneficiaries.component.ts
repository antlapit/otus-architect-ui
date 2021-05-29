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
    CreateBeneficiaryForm,
    DeleteBeneficiaryForm,
    LoadFinApplicationForm,
    LoadFinApplicationPersonContainer,
    ProcessFinApplication,
    SaveFinApplication,
    UpdateFinApplicationPersonForm
} from '../../redux/actions';
import {
    createdFinApplicationPersonForms,
    deletingFinApplicationPersonForms,
    finApplicationPersons,
    isCreatingFinApplicationPersonsPerson,
    isLoadingFinApplicationForm,
    isLoadingFinApplicationPersons,
    isProcessingFinApplicationForm,
    savingFinApplicationPersonForms,
    selectedFinApplicationForm
} from '../../redux/selectors';
import {PersonFormEditComponent} from '../../../shared/person-form-edit/person-form-edit.component';
import {PersonForm} from '../../models/general.model';

@Component({
    selector: 'otus-architect-application-wizard-beneficiaries',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './application-wizard-beneficiaries.component.html',
    styleUrls: ['./application-wizard-beneficiaries.component.scss']
})
export class ApplicationWizardBeneficiariesComponent implements OnInit, OnDestroy {

    private all$: Subscription = new Subscription();

    @Input('finApplication')
    selectedFinApplication: FinApplication;

    isLoadingFinApplicationForm: boolean;
    selectedFinApplicationForm: FinApplicationForm;
    isLoadingPersons: boolean;
    isCreatingPerson: boolean;
    deletingPersonForms: number;
    persons: PersonFormContainer;
    createdPersonForms: string[];

    @ViewChildren(PersonFormEditComponent)
    private personFormComponents: QueryList<PersonFormEditComponent>;

    beneficiariesWasEmpty: boolean;

    isProcessingForm: boolean;
    isSavingPersonForms: boolean;

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
            this.store.pipe(select(selectedFinApplicationForm))
        ).subscribe(([isLoadingFinApplicationForm, selectedFinApplicationForm]) => {
            this.isLoadingFinApplicationForm = isLoadingFinApplicationForm;
            this.selectedFinApplicationForm = selectedFinApplicationForm;

            if (!!this.selectedFinApplicationForm && this.selectedFinApplicationForm.ip) {
                // ИП не должен оказываться на этой форме
                const value = this.selectedFinApplication;
                value.formStatus = 'DOCUMENTS';
                this.store.dispatch(new ProcessFinApplication({
                    id: value.id,
                    data: {}
                }, false));
            }

            this.cd.detectChanges();
        }));

        this.all$.add(combineLatest(
            this.store.pipe(select(isLoadingFinApplicationPersons)),
            this.store.pipe(select(finApplicationPersons)),
            this.store.pipe(select(isCreatingFinApplicationPersonsPerson)),
            this.store.pipe(select(deletingFinApplicationPersonForms)),
            this.store.pipe(select(createdFinApplicationPersonForms))
        ).subscribe(([isLoadingPersons, persons, isCreatingPerson, deletingPersonForms, createdPersonForms]) => {
            this.isLoadingPersons = isLoadingPersons;
            this.persons = persons;
            this.isCreatingPerson = isCreatingPerson;
            this.deletingPersonForms = deletingPersonForms;
            this.createdPersonForms = createdPersonForms;
            this.beneficiariesWasEmpty = !this.persons
                || !this.persons.beneficiaries
                || this.persons.beneficiaries.length === 0;
            if (!this.beneficiariesWasEmpty) {
                // проверяем, что бенефициары не состоят только из добавленных
                let foundExtCreated = false;
                for (const beneficiary of this.persons.beneficiaries) {
                    if (this.createdPersonForms.indexOf(beneficiary.id) < 0) {
                        foundExtCreated = true;
                        break;
                    }
                }
                this.beneficiariesWasEmpty = !foundExtCreated;
            }
            this.cd.detectChanges();
        }));

        this.all$.add(combineLatest(
            this.store.pipe(select(isProcessingFinApplicationForm)),
            this.store.pipe(select(savingFinApplicationPersonForms))
        ).subscribe(([isProcessingForm, savingPersonForms]) => {
            this.isProcessingForm = isProcessingForm;
            this.isSavingPersonForms = savingPersonForms > 0;
            this.cd.detectChanges();
        }));

        this.store.dispatch(new LoadFinApplicationForm({
            id: this.selectedFinApplication.id
        }));
        this.store.dispatch(new LoadFinApplicationPersonContainer({
            id: this.selectedFinApplication.id
        }));
    }

    processForm() {
        const beneficiaries = [];
        for (const personFormEditComponent of this.personFormComponents.toArray()) {
            if (!personFormEditComponent.valid()) {
                return;
            } else {
                beneficiaries.push(personFormEditComponent.getValue());
            }
        }

        // все формы валидны
        this.store.dispatch(new ProcessFinApplication({
            id: this.selectedFinApplication.id,
            data: {
                beneficiaries: beneficiaries
            }
        }, false));
    }

    goBack() {
        const value = Object.assign({}, this.selectedFinApplication);
        value.formStatus = 'COMPANY';
        this.store.dispatch(new SaveFinApplication(value, false, {}, false));
    }

    onChangePerson(form: PersonForm) {
        this.store.dispatch(new UpdateFinApplicationPersonForm({
            id: this.selectedFinApplication.id,
            personId: form.id,
            form: form
        }));
    }

    addNewBeneficiary() {
        this.store.dispatch(new CreateBeneficiaryForm({
            id: this.selectedFinApplication.id,
            role: 'BENEFICIARY'
        }));
    }

    onDeletePerson(personId: string) {
        this.store.dispatch(new DeleteBeneficiaryForm({
            id: this.selectedFinApplication.id,
            personId: personId,
            role: 'BENEFICIARY'
        }));
    }

    personJustCreated(person: PersonForm) {
        return this.createdPersonForms.indexOf(person.id) >= 0;
    }

    forceSave() {
        const beneficiaries = [];
        for (const personFormEditComponent of this.personFormComponents.toArray()) {
            if (!personFormEditComponent.valid()) {
                return;
            } else {
                beneficiaries.push(personFormEditComponent.getValue());
            }
        }

        const value = Object.assign({}, this.selectedFinApplication);
        this.store.dispatch(new SaveFinApplication(value, false, {
            beneficiaries: beneficiaries
        },
        true));
    }
}
