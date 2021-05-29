import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {GeneralState} from '../../../shared/redux/general.reducer';
import * as GeneralSelectors from '../../../shared/redux/general.selectors';
import {UserIdentity} from '../../../core/domain/UserIdentity';
import {Subscription} from 'rxjs';
import {ModifyUserInfo} from '../../../shared/redux/general.actions';

@Component({
    selector: 'otus-architect-user-profile-panel',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './user-profile-panel.component.html',
    styleUrls: ['./user-profile-panel.component.scss']
})
export class UserProfilePanelComponent implements OnInit, OnDestroy {

    user: UserIdentity;

    public userIdentity$: Subscription;

    constructor(private store: Store<GeneralState>,
                private cd: ChangeDetectorRef) {

    }

    ngOnInit() {
        this.userIdentity$ = this.store.pipe(select(GeneralSelectors.getUserInfo))
            .subscribe(value => {
                this.user = value;
                this.cd.detectChanges();
            });
    }

    ngOnDestroy(): void {
        this.userIdentity$.unsubscribe();
    }

    changeEmail() {
        this.user.emailNotUsed = !this.user.emailNotUsed;
        this.store.dispatch(new ModifyUserInfo({
            userInfo: this.user
        }));
    }

    changeSms() {
        this.user.smsNotUsed = !this.user.smsNotUsed;
        this.store.dispatch(new ModifyUserInfo({
            userInfo: this.user
        }));
    }
}
