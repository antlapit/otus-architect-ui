import {ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {FinApplication} from '../../models/fin-application.model';
import {select, Store} from '@ngrx/store';
import {getWorkspace} from '../../../shared/redux/general.selectors';
import {ApplicationState} from '../../redux/application-state';
import {combineLatest, Subscription} from 'rxjs';
import {RevokeFinApplication} from '../../redux/actions';
import {Workspace, WorkspaceMenuItem} from '../../../shared/domain/Workspace';
import {MatDialog} from '@angular/material';

@Component({
    selector: 'otus-architect-application-buttons',
    templateUrl: './application-buttons.component.html',
    styleUrls: ['./application-buttons.component.scss']
})
export class ApplicationButtonsComponent implements OnInit, OnDestroy {

    @Input('border')
    border = true;

    @Input('title')
    title = 'Список заявок';

    @Input('application')
    application: FinApplication;

    workspace: Workspace;
    kikMenuItem: WorkspaceMenuItem;

    @Output('onGoBack')
    public onGoBack = new EventEmitter<FinApplication>();

    all$: Subscription = new Subscription();

    constructor(private router: Router,
                private location: Location,
                private store: Store<ApplicationState>,
                private cd: ChangeDetectorRef,
                public dialog: MatDialog) {
    }

    ngOnDestroy(): void {
        this.all$.unsubscribe();
    }

    ngOnInit(): void {
        this.all$.add(combineLatest(
            this.store.pipe(select(getWorkspace))
        ).subscribe(([workspace]) => {
            this.workspace = workspace;
            if (this.workspace && this.workspace.items) {
                this.kikMenuItem = this.workspace.items.find(w => w.appName === 'KIK');
            }
            this.cd.detectChanges();
        }));
    }

    goBack() {
        this.onGoBack.emit(this.application);
    }

    revoke() {
        this.store.dispatch(new RevokeFinApplication({
            id: this.application.id
        }));
    }
}
