import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    QueryList,
    ViewChildren
} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ApplicationState} from '../../redux/application-state';
import {ActivatedRoute, Router} from '@angular/router';
import {combineLatest, Subscription} from 'rxjs';
import {
    defaultFinApplicationStages,
    isLoadingDefaultFinApplicationStages,
    isLoadingFinApplication,
    isProcessingFinApplicationForm,
    isRedirectFinApplicationToRoot,
    isRedirectToFinApplicationProcessedView,
    selectedFinApplication
} from '../../redux/selectors';
import {FinApplication} from '../../models/fin-application.model';
import {ClearApplicationProcessed, ClearFinApplication, GetDefaultFinApplicationStages} from '../../redux/actions';
import {MatSnackBar} from '@angular/material';
import {Location} from '@angular/common';
import {ApplicationWizardViewComponent} from '../../components';

@Component({
    selector: 'otus-architect-application-form',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './application-form.component.html',
    styleUrls: ['./application-form.component.scss']
})
export class ApplicationFormComponent implements OnInit, OnDestroy {

    all$: Subscription = new Subscription();
    isLoadingFinApplication: boolean;
    selectedFinApplication: FinApplication;
    isRedirectToProcessedView: boolean;
    isProcessingForm: boolean;
    defaultApplicationStages: any[];
    isLoadingApplicationStages: boolean;

    savedRedirectToFinApplicationRoot: boolean;

    userRoles: String[];

    @ViewChildren(ApplicationWizardViewComponent)
    private wizardViewList: QueryList<ApplicationWizardViewComponent>;

    constructor(private cd: ChangeDetectorRef,
                private store: Store<ApplicationState>,
                private route: ActivatedRoute,
                private router: Router,
                private location: Location,
                private _snackBar: MatSnackBar) {

    }


    ngOnDestroy(): void {
        this.all$.unsubscribe();

        if (this.isRedirectToProcessedView) {
            this.store.dispatch(new ClearApplicationProcessed());
        }
    }

    ngOnInit(): void {
        this.all$.add(combineLatest(
            this.store.pipe(select(isLoadingFinApplication)),
            this.store.pipe(select(selectedFinApplication)),
            this.store.pipe(select(isRedirectToFinApplicationProcessedView)),
            this.store.pipe(select(isProcessingFinApplicationForm))
        ).subscribe(([isLoadingFinApplication, selectedFinApplication, isRedirectToProcessedView, isProcessingForm]) => {
            this.isLoadingFinApplication = isLoadingFinApplication;
            this.selectedFinApplication = selectedFinApplication;
            this.isRedirectToProcessedView = isRedirectToProcessedView;
            this.isProcessingForm = isProcessingForm;
            this.cd.detectChanges();
        }));

        this.all$.add(
            combineLatest(
                this.store.pipe(select(isLoadingDefaultFinApplicationStages)),
                this.store.pipe(select(defaultFinApplicationStages))
            ).subscribe(([isLoadingDefaultApplicationStages, defaultApplicationStages]) => {
                this.isLoadingApplicationStages = isLoadingDefaultApplicationStages;
                this.defaultApplicationStages = defaultApplicationStages;
                this.cd.detectChanges();
            })
        );

        this.all$.add(combineLatest(
                this.store.pipe(select(isRedirectFinApplicationToRoot))
        ).subscribe(([redirect]) => {
            if (this.savedRedirectToFinApplicationRoot && !redirect) {
                this.doRedirectToRoot();
            }
            this.savedRedirectToFinApplicationRoot = redirect;
        }));

        this.store.dispatch(new GetDefaultFinApplicationStages());
    }

    forceSave(finApplication: FinApplication) {
        if (!!this.wizardViewList && this.wizardViewList.length > 0) {
            const saved = this.wizardViewList.first.forceSave();
            if (!saved) {
                this.doRedirectToRoot();
            }
        } else {
            this.doRedirectToRoot();
        }
    }

    doRedirectToRoot() {
        this.router.navigate(['/']);
        this.store.dispatch(new ClearFinApplication());
    }
}
