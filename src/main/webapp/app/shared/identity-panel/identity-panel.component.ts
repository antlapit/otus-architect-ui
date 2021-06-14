import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {UserIdentity} from '../../core/domain/UserIdentity';
import {Store} from '@ngrx/store';
import {GeneralState} from '../redux/general.reducer';
import {Logout} from '../../core/auth/redux/auth.actions';
import {NavigationEnd, Router} from '@angular/router';
import {Company} from '../../core/domain/Company';
import {Subscription} from 'rxjs';

@Component({
    selector: 'otus-architect-identity-panel',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './identity-panel.component.html',
    styleUrls: ['./identity-panel.component.scss']
})
export class IdentityPanelComponent implements OnInit, OnDestroy {

    @Input() userIdentity: UserIdentity;

    fullName = '';
    shortName = '';

    isSettingsRoute: boolean = false;
    event$: Subscription;

    constructor(private store: Store<GeneralState>,
                private router: Router,
                private cd: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.fullName = this.name;
        if (this.fullName) {
            this.shortName = this.fullName[0] + '. ' + this.fullName[this.fullName.length - 4] + '.';
        }
        if (!!this.router.url) {
            this.isSettingsRoute = this.router.url.indexOf('/settings') > -1;
        }
        this.event$ = this.router.events.subscribe(e => {
            if (e instanceof NavigationEnd) {
                console.log(e);
                this.isSettingsRoute = e.urlAfterRedirects.indexOf('/settings') > -1;
                this.cd.detectChanges();
            }
        });
    }

    public get name() {
        if (this.userIdentity) {
            if (!this.userIdentity.firstName) {
                return this.userIdentity.username;
            } else {
                return this.userIdentity.firstName + ' ' + this.userIdentity.lastName;
            }
        } else {
            return null;
        }
    }

    public get money() {
        if (this.userIdentity) {
            return this.userIdentity.money + ' ₽';
        } else {
            return null;
        }
    }

    logout() {
        this.store.dispatch(new Logout());
    }

    goToSettings() {
        this.router.navigate(['settings']);
    }

    ngOnDestroy(): void {
        if (this.event$) {
            this.event$.unsubscribe();
        }
    }
}
