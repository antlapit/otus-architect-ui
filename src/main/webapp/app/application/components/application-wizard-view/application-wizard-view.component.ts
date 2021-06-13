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
import {GetFinApplicationFormStatuses} from '../../redux/actions';
import {FinApplication} from '../../models/fin-application.model';
import {ApplicationWizardBgComponent} from '../application-wizard-bg/application-wizard-bg.component';

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

    constructor(private cd: ChangeDetectorRef,
                private store: Store<ApplicationState>,
                private route: ActivatedRoute,
                private router: Router) {

    }

    ngOnDestroy(): void {
    }

    ngOnInit(): void {
        this.store.dispatch(new GetFinApplicationFormStatuses());
    }

}
