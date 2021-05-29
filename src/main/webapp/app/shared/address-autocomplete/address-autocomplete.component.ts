import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {combineLatest, Subscription} from 'rxjs';
import {debounceTime, startWith} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import {GeneralState} from '../redux/general.reducer';
import {getAddressesSuggest, isLoadingAddresses} from '../redux/general.selectors';
import {ClearAddressSuggest, LoadAddressSuggest} from '../redux/general.actions';
import {FormValidatorService} from '../form-validator/form-validator.service';

@Component({
    selector: 'otus-architect-address-autocomplete',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './address-autocomplete.component.html',
    styleUrls: ['./address-autocomplete.component.scss']
})
export class AddressAutocompleteComponent implements OnInit, OnDestroy {

    @Input('group')
    group: FormGroup;

    @Input('label')
    label: string;

    options: any[];
    loading: boolean;

    private suggest$: Subscription;
    private changes$: Subscription;

    constructor(private cd: ChangeDetectorRef,
                private store: Store<GeneralState>,
                private formValidatorService: FormValidatorService) { }

    ngOnInit() {
        this.suggest$ = combineLatest(
            this.store.pipe(select(getAddressesSuggest)),
            this.store.pipe(select(isLoadingAddresses)),
        ).subscribe(([addressesSuggest, isLoadingAddresses]) => {
            this.options = addressesSuggest;
            this.loading = isLoadingAddresses;
            if (!!this.options && !this.loading) {
                this.cd.detectChanges();
            }
        });

        this.changes$ = this.group.controls.value.valueChanges.pipe(
            startWith(''),
            debounceTime(700)
        ).subscribe(
            value =>
                this.store.dispatch(new LoadAddressSuggest({
                    query: value,
                    count: 10
                }))
        );
    }

    ngOnDestroy(): void {
        this.suggest$.unsubscribe();
        this.changes$.unsubscribe();
    }


    selectOption(value: any) {
        this.group.controls.value.setValue(value);

        this.store.dispatch(new ClearAddressSuggest());
    }

    valid() {
        this.formValidatorService.validateAllFormFields(this.group);
        this.cd.detectChanges();
        return this.group.valid;
    }
}
