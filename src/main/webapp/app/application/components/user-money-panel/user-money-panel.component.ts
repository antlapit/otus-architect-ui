import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {GeneralState} from '../../../shared/redux/general.reducer';
import {Subscription} from 'rxjs';
import {LoadUserInfo, ShowGeneralToastMessage} from '../../../shared/redux/general.actions';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomErrorStateMatcher} from "../../../shared/form-validator/custom-error-state.matcher";
import {GeneralDataService} from "../../../shared/services/general-data.service";

@Component({
    selector: 'otus-architect-user-money-panel',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './user-money-panel.component.html',
    styleUrls: ['./user-money-panel.component.scss']
})
export class UserMoneyPanelComponent implements OnInit, OnDestroy {

    saving: boolean;
    fg: FormGroup;
    matcher = new CustomErrorStateMatcher();
    all$ = new Subscription();

    constructor(private store: Store<GeneralState>,
                private cd: ChangeDetectorRef,
                private _fb: FormBuilder,
                private dataService: GeneralDataService) {

    }

    ngOnInit() {
        this.fg = this._fb.group({
            money: ['', [Validators.required]]
        });
    }

    ngOnDestroy(): void {
        this.all$.unsubscribe();
    }

    addMoney() {
        this.all$.add(
            this.dataService.addMoney(this.fg.getRawValue()['money'])
                .subscribe(resp => {
                    this.store.dispatch(new LoadUserInfo());
                    this.store.dispatch(new ShowGeneralToastMessage({
                        severity: 'info',
                        summary: 'Деньги будут зачислены через несколько секунд',
                        detail: ''
                    }))
                })
        );
    }
}
