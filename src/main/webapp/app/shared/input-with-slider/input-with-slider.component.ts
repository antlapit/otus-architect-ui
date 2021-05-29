import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {CurrencyMaskConfig} from 'ng2-currency-mask/src/currency-mask.config';
import {MatSliderChange} from '@angular/material';

@Component({
    selector: 'otus-architect-input-with-slider',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './input-with-slider.component.html',
    styleUrls: ['./input-with-slider.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class InputWithSliderComponent implements OnInit, OnDestroy {

    @Input('label')
    label: string;

    @Input('min')
    min: number;

    @Input('max')
    max: number;

    @Input('step')
    step: number;

    @Input('initialValue')
    set initialValue(val: number) {
        this.control.patchValue(val);
    }

    @Input('precision')
    set precision(val: number) {
        this.inputMask.precision = val;
    }

    @Input('suffix')
    set suffix(val: string) {
        this.inputMask.suffix = val;
    }

    inputMask: CurrencyMaskConfig = {
        align: 'left',
        allowNegative: false,
        decimal: ',',
        precision: 2,
        prefix: '',
        suffix: '',
        thousands: ' '
    };

    @Output('onChange')
    onChange = new EventEmitter<number>();

    all$ = new Subscription();
    control = new FormControl();

    ngOnDestroy(): void {
        this.all$.unsubscribe();
    }

    ngOnInit(): void {
        this.all$.add(
            this.control.valueChanges.pipe(
                debounceTime(50),
                distinctUntilChanged()
            ).subscribe(val => {
                if (!!val) {
                    if (val < this.min) {
                        this.control.patchValue(this.min);
                    } else if (val > this.max) {
                        this.control.patchValue(this.max);
                    } else {
                        this.onChange.emit(val);
                    }
                }
            })
        );
    }

    onSliderInput(change: MatSliderChange) {
        this.control.patchValue(change.value);
    }

}
