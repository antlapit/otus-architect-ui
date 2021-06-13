import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ApplicationState} from './redux/application-state';
import {select, Store} from '@ngrx/store';
import * as ApplicationSelectors from './redux/selectors';
import {MatSnackBar} from '@angular/material';
import {getAuthToastMessage} from '../core/auth/redux/auth.selectors';
import {ApplicationMessage} from '../shared/domain/ApplicationMessage';
import {generalToastMessage, routingMessage} from '../shared/redux/general.selectors';
import {combineLatest, Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
    selector: 'otus-architect-application',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './application.component.html'
})
export class ApplicationComponent implements OnInit, OnDestroy {

    durationInSeconds = 5;
    private all$: Subscription = new Subscription();

    constructor(
        private store: Store<ApplicationState>,
        private ref: ChangeDetectorRef,
        private _snackBar: MatSnackBar,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.all$.add(this.store.pipe(select(ApplicationSelectors.getToastMessage)).subscribe(message => {
            if (message) {
                this.showToastMessage(message);
            }
        }));

        this.all$.add(this.store.pipe(select(getAuthToastMessage)).subscribe(message => {
            if (message) {
                this.showToastMessage(message);
            }
        }));
        this.all$.add(this.store.pipe(select(generalToastMessage)).subscribe(message => {
            if (message) {
                this.showToastMessage(message);
            }
        }));

        this.all$.add(combineLatest(
            this.store.pipe(select(routingMessage))
        ).subscribe(([routingMessage]) => {
            if (routingMessage) {
                const snackBarRef = this._snackBar.open(routingMessage.message, routingMessage.action, routingMessage.properties);
                console.log(routingMessage);
                this.all$.add(
                    snackBarRef.onAction()
                        .subscribe(() => {
                            this.router.navigate(routingMessage.route);
                            this.ref.detectChanges();
                        })
                );
                this.ref.detectChanges();
            }
        }));
    }

    ngOnDestroy(): void {
        this.all$.unsubscribe();
    }

    showMessage(message: ApplicationMessage) {
        this.ref.detectChanges();
    }

    showToastMessage(message: ApplicationMessage) {
        this._snackBar.open(message.summary, '', {
            duration: this.durationInSeconds * 1000,
            verticalPosition: 'top'
        });
        this.ref.detectChanges();
    }
}
