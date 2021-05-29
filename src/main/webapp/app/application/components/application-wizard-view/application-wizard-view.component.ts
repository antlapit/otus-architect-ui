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
import {Store} from '@ngrx/store';
import {ApplicationState} from '../../redux/application-state';
import {ActivatedRoute, Router} from '@angular/router';
import {GetFinApplicationFormStatuses, LoadFinApplicationForm} from '../../redux/actions';
import {FinApplication} from '../../models/fin-application.model';
import {ApplicationWizardBgComponent} from '../application-wizard-bg/application-wizard-bg.component';
import {ApplicationWizardCompanyComponent} from '../application-wizard-company/application-wizard-company.component';
import {ApplicationWizardBeneficiariesComponent} from '../application-wizard-beneficiaries/application-wizard-beneficiaries.component';

@Component({
    selector: 'otus-architect-application-wizard-view',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './application-wizard-view.component.html',
    styleUrls: ['./application-wizard-view.component.scss']
})
export class ApplicationWizardViewComponent implements OnInit, OnDestroy {

    @Input('finApplication')
    selectedFinApplication: FinApplication;

    @ViewChildren(ApplicationWizardBgComponent)
    private bgViewList: QueryList<ApplicationWizardBgComponent>;

    @ViewChildren(ApplicationWizardCompanyComponent)
    private companyViewList: QueryList<ApplicationWizardCompanyComponent>;

    @ViewChildren(ApplicationWizardBeneficiariesComponent)
    private benefeciariesViewList: QueryList<ApplicationWizardBeneficiariesComponent>;

    constructor(private cd: ChangeDetectorRef,
                private store: Store<ApplicationState>,
                private route: ActivatedRoute,
                private router: Router) {

    }

    ngOnDestroy(): void {
    }

    ngOnInit(): void {
        this.store.dispatch(new GetFinApplicationFormStatuses());
        if (!!this.selectedFinApplication) {
            this.store.dispatch(new LoadFinApplicationForm({
                id: this.selectedFinApplication.id
            }));
        }
    }

    forceSave() {
        if (!!this.bgViewList && this.bgViewList.length > 0) {
            this.bgViewList.first.forceSave();
            return true;
        } else if (!!this.companyViewList && this.companyViewList.length > 0) {
            this.companyViewList.first.forceSave();
            return true;
        } else if (!!this.benefeciariesViewList && this.benefeciariesViewList.length > 0) {
            this.benefeciariesViewList.first.forceSave();
            return true;
        }
        return false;
    }
}
