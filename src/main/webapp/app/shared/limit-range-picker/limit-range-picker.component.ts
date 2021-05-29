import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
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
import {Options} from 'ng5-slider';

@Component({
    selector: 'otus-architect-limit-range-picker',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './limit-range-picker.component.html',
    styleUrls: ['./limit-range-picker.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LimitRangePickerComponent implements OnInit, OnDestroy {

    menuOpened = false;

    @Input('max')
    set max(val: number) {
        this._max = val;
        this.initSliderOptions();
    }

    @Input('min')
    set min(val: number) {
        this._min = val;
        this.initSliderOptions();
    }

    @Input('from')
    set from(val: any) {
        if (!!val) {
            this._from = val;
        } else {
            this._from = this._min;
        }
        this.fromControl.setValue(this._from, {emitEvent: false});
    }

    @Input('to')
    set to(val: any) {
        if (!!val) {
            this._to = val;
        } else {
            this._to = this._max;
        }
        this.toControl.setValue(this._to, {emitEvent: false});
    }

    _max: number;
    _min: number;
    _from: number;
    _to: number;

    fromControl = new FormControl();
    toControl = new FormControl();

    @Output('onChangeLimitRange')
    onChangeLimitRange = new EventEmitter<any>();

    sliderOptions: Options = {
        floor: 0,
        ceil: 1000,
        step: 1000
    };

    all$ = new Subscription();

    currencyMaskConfig: CurrencyMaskConfig = {
        align: 'left',
        allowNegative: false,
        decimal: ',',
        precision: 0,
        prefix: '',
        suffix: ' ₽',
        thousands: ' '
    };

    public manualRefresh = new EventEmitter<void>();

    constructor(private cd: ChangeDetectorRef) {

    }

    ngOnDestroy(): void {
        this.all$.unsubscribe();
    }

    ngOnInit(): void {
        this.all$.add(
            this.fromControl.valueChanges.pipe(
                debounceTime(1000),
                distinctUntilChanged()
            ).subscribe(val => {
                if (!!val && val < this._min) {
                    this.fromControl.patchValue(this._min);
                    return;
                } else if (!!val && val > this._max) {
                    this.fromControl.patchValue(this._max);
                    return;
                } else if (!!val && val > this._to) {
                    this.fromControl.patchValue(this._to);
                    return;
                }
                this._from = val;
                this.emitNewRangeEvent();
                this.cd.detectChanges();
            })
        );
        this.all$.add(
            this.toControl.valueChanges.pipe(
                debounceTime(1000),
                distinctUntilChanged()
            ).subscribe(val => {
                if (!!val && val < this._min) {
                    this.toControl.patchValue(this._min);
                    return;
                } else if (!!val && val > this._max) {
                    this.toControl.patchValue(this._max);
                    return;
                } else if (!!val && val < this._from) {
                    this.toControl.patchValue(this._from);
                    return;
                }
                this._to = val;
                this.emitNewRangeEvent();
                this.cd.detectChanges();
            })
        );
    }

    clearRange() {
        this._from = this._min;
        this._to = this._max;
        this.emitNewRangeEvent();
    }

    emitNewRangeEvent() {
        this.onChangeLimitRange.emit({
            from: this._from,
            to: this._to,
        });
    }

    initSliderOptions() {
        this.sliderOptions = {
            floor: this._min,
            ceil: this._max,
            step: 1000,
            noSwitching: true,
            hideLimitLabels: true,
            hidePointerLabels: true
        };
    }

    changeLeftSliderValue(val: number) {
        this.fromControl.patchValue(val);
    }

    changeRightSliderValue(val: number) {
        this.toControl.patchValue(val);
    }

    afterMenuOpened($event: void) {
        setTimeout(() => {
            this.manualRefresh.emit();
        }, 500);
    }
}
