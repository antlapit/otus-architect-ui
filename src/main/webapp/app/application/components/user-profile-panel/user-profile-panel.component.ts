import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {GeneralState} from '../../../shared/redux/general.reducer';
import * as GeneralSelectors from '../../../shared/redux/general.selectors';
import {UserIdentity} from '../../../core/domain/UserIdentity';
import {Subscription} from 'rxjs';
import {LoadUserInfo, ModifyUserInfo} from '../../../shared/redux/general.actions';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomErrorStateMatcher} from "../../../shared/form-validator/custom-error-state.matcher";
import {NAME_PATTERN} from "../../../app.constants";

@Component({
    selector: 'otus-architect-user-profile-panel',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './user-profile-panel.component.html',
    styleUrls: ['./user-profile-panel.component.scss']
})
export class UserProfilePanelComponent implements OnInit, OnDestroy {

    user: UserIdentity;
    editing: boolean;
    saving: boolean;
    fg: FormGroup;
    matcher = new CustomErrorStateMatcher();
    all$ = new Subscription();

    public userIdentity$: Subscription;
    private lastUserInfo: UserIdentity;

    constructor(private store: Store<GeneralState>,
                private cd: ChangeDetectorRef,
                private _fb: FormBuilder) {

    }

    ngOnInit() {
        this.fg = this._fb.group({
            id: ['', []],
            firstName: ['', [Validators.required, Validators.pattern(NAME_PATTERN)]],
            lastName: ['', [Validators.required, Validators.pattern(NAME_PATTERN)]],
            phone: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
        });
        this.userIdentity$ = this.store.pipe(select(GeneralSelectors.getUserInfo))
            .subscribe(value => {
                this.user = value;
                if (!!this.user) {
                    if (this.saving) {
                        if (value.firstName !== this.lastUserInfo.firstName
                            || value.lastName !== this.lastUserInfo.lastName
                            || value.email !== this.lastUserInfo.email
                            || value.phone !== this.lastUserInfo.phone) {
                            const store = this.store;
                            setTimeout(function () {
                                // after 1000 ms we add the class animated to the login/register card
                                store.dispatch(new LoadUserInfo());
                            }, 2000);
                        } else {
                            this.saving = false;
                            this.editing = false;
                            this.fg.patchValue(this.user);
                            this.fg.enable();
                        }
                    } else {
                        this.fg.patchValue(this.user);
                    }
                }
                this.cd.detectChanges();
            });
    }

    ngOnDestroy(): void {
        this.userIdentity$.unsubscribe();
        this.all$.unsubscribe();
    }

    saveChanges() {
        this.saving = true;
        this.lastUserInfo = this.fg.getRawValue();
        this.fg.disable();
        this.store.dispatch(new ModifyUserInfo({
            userInfo: this.fg.getRawValue()
        }));
    }

    edit() {
        this.editing = true;
    }
}
