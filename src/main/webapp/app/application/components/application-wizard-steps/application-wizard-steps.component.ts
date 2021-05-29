import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ApplicationState} from '../../redux/application-state';
import {ActivatedRoute, Router} from '@angular/router';
import {combineLatest, Subscription} from 'rxjs';
import {
    finApplicationFormStatuses,
    isLoadingFinApplicationForm,
    isLoadingFinApplicationFormStatuses,
    selectedFinApplicationForm
} from '../../redux/selectors';
import {FinApplication, FinApplicationForm} from '../../models/fin-application.model';

@Component({
    selector: 'otus-architect-application-wizard-steps',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './application-wizard-steps.component.html',
    styleUrls: ['./application-wizard-steps.component.scss']
})
export class ApplicationWizardStepsComponent implements OnInit, OnDestroy {

    all$: Subscription = new Subscription();

    @Input('finApplication')
    selectedFinApplication: FinApplication;

    isLoadingFinApplicationForm: boolean;
    selectedFinApplicationForm: FinApplicationForm;

    isLoadingFormStatuses: boolean;
    steps: any[];

    constructor(private cd: ChangeDetectorRef,
                private store: Store<ApplicationState>,
                private route: ActivatedRoute,
                private router: Router) {

    }

    ngOnDestroy(): void {
        this.all$.unsubscribe();
    }

    ngOnInit(): void {
        this.all$.add(combineLatest(
            this.store.pipe(select(isLoadingFinApplicationForm)),
            this.store.pipe(select(selectedFinApplicationForm)),
            this.store.pipe(select(isLoadingFinApplicationFormStatuses)),
            this.store.pipe(select(finApplicationFormStatuses))
            ).subscribe(([isLoadingFinApplicationForm, selectedFinApplicationForm, isLoadingFormStatuses, formStatuses]) => {
                this.isLoadingFinApplicationForm = isLoadingFinApplicationForm;
                this.selectedFinApplicationForm = selectedFinApplicationForm;
                this.isLoadingFormStatuses = isLoadingFormStatuses;
                this.steps = formStatuses;
                this.cd.detectChanges();
            })
        );
    }

    isActiveStep(step: any) {
        return step.code === this.selectedFinApplication.formStatus;
    }

    isFutureStep(step: any) {
        return step.index > this.getIndex(this.selectedFinApplication.formStatus);
    }

    isCompletedStep(step: any) {
        return step.index < this.getIndex(this.selectedFinApplication.formStatus);
    }

    private getIndex(formStatus: string) {
        for (const i in this.steps) {
            if (this.steps[i].code === formStatus) {
                return i;
            }
        }
        return -1;
    }

    isStepAvailable(step: any) {
        return this.selectedFinApplicationForm.ip && step.forIp
            || !this.selectedFinApplicationForm.ip && step.forCompany;
    }
}
