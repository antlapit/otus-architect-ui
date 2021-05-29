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

@Component({
    selector: 'otus-architect-date-range-picker',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './date-range-picker.component.html',
    styleUrls: ['./date-range-picker.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DateRangePickerComponent implements OnInit, OnDestroy {

    items = [
        {
            type: 'ALL',
            title: 'Все время',
            from: () => null,
            to: () => null
        },
        {
            type: 'TODAY',
            title: 'Сегодня',
            from: () => {
                const today = new Date();
                today.setUTCHours(0, 0, 0, 0);
                return today.toISOString();
            },
            to: () => null
        },
        {
            type: 'YESTERDAY',
            title: 'Вчера',
            from: () => {
                const today = new Date();
                today.setUTCHours(0, 0, 0, 0);
                today.setTime(today.getTime() - 24 * 60 * 60 * 1000);
                return today.toISOString();
            },
            to: () => {
                const today = new Date();
                today.setUTCHours(0, 0, 0, 0);
                today.setTime(today.getTime() - 1000);
                return today.toISOString();
            }
        },
        {
            type: 'WEEK',
            title: 'За неделю',
            from: () => {
                const today = new Date();
                today.setUTCHours(0, 0, 0, 0);
                today.setTime(today.getTime() - (today.getUTCDay() - 1) * 24 * 60 * 60 * 1000);
                return today.toISOString();
            },
            to: () => null
        },
        {
            type: 'CURRENT_MONTH',
            title: 'За текущий месяц',
            from: () => {
                const today = new Date();
                today.setUTCHours(0, 0, 0, 0);
                today.setDate(1);
                return today.toISOString();
            },
            to: () => null
        },
        {
            type: 'PREVIOUS_MONTH',
            title: 'За прошлый месяц',
            from: () => {
                const today = new Date();
                today.setUTCHours(0, 0, 0, 0);
                today.setUTCFullYear(today.getUTCFullYear() - (today.getUTCMonth() === 0 ? 1 : 0), today.getUTCMonth() === 0 ? 11 : (today.getUTCMonth() - 1), 1);
                return today.toISOString();
            },
            to: () => {
                const today = new Date();
                today.setUTCHours(0, 0, 0, 0);
                today.setDate(1);
                today.setTime(today.getTime() - 1000);
                return today.toISOString();
            }
        },
        {
            type: 'YEAR',
            title: 'За год',
            from: () => {
                const today = new Date();
                today.setUTCHours(0, 0, 0, 0);
                today.setUTCFullYear(today.getFullYear(), 0, 1);
                return today.toISOString();
            },
            to: () => null
        },
        {
            type: 'CUSTOM',
            title: 'Произвольный период',
            from: () => {
                console.log(this._dateFrom);
                if (!this._dateFrom) {
                    return null;
                }
                const temp = new Date(Date.UTC(this._dateFrom.getFullYear(), this._dateFrom.getMonth(), this._dateFrom.getDate(), 0, 0, 0));
                console.log(temp);
                return temp.toISOString();
            },
            to: () => {
                console.log(this._dateTo);
                if (!this._dateTo) {
                    return null;
                }
                const temp = new Date(Date.UTC(this._dateTo.getFullYear(), this._dateTo.getMonth(), this._dateTo.getDate(), 23, 59, 59));
                console.log(temp);
                return temp.toISOString();
            }
        }
    ];

    selectedDateRangeItem: any;
    menuOpened = false;
    customDateControl = new FormControl();
    _dateFrom = new Date();
    _dateTo = new Date();

    @Input('datePickerType')
    set datePickerType(val: any) {
        this.selectedDateRangeItem = this.findItemByType(!!val ? val : 'ALL');
    }

    @Input('dateFrom')
    set dateFrom(valStr: any) {
        console.log(valStr);
        if (!!valStr) {
            const val = new Date(valStr);
            this._dateFrom = new Date(val.getUTCFullYear(), val.getUTCMonth(), val.getUTCDate(), 0, 0, 0);
            this.patchDatePicker();
        }
    }

    @Input('dateTo')
    set dateTo(valStr: any) {
        console.log(valStr);
        if (!!valStr) {
            const val = new Date(valStr);
            this._dateTo = new Date(val.getUTCFullYear(), val.getUTCMonth(), val.getUTCDate(), 0, 0, 0);
            this.patchDatePicker();
        }
    }

    @Output('onChangeDateRange')
    onChangeDateRange = new EventEmitter<any>();

    all$ = new Subscription();

    ngOnDestroy(): void {
        this.all$.unsubscribe();
    }

    ngOnInit(): void {
        this.all$.add(
            this.customDateControl.valueChanges.pipe(
                debounceTime(500),
                distinctUntilChanged()
            ).subscribe(value => {
                if (!!value) {
                    this.selectedDateRangeItem = this.findItemByType('CUSTOM');
                    this._dateFrom = value['begin'];
                    this._dateTo = value['end'];
                    this.emitChangeEvent();
                }
            })
        );
    }

    selectItem(type: string) {
        this.selectedDateRangeItem = this.findItemByType(type);
        if (type !== 'CUSTOM') {
            this._dateFrom = null;
            this._dateTo = null;
            this.patchDatePicker();
        }
        this.emitChangeEvent();
    }

    findItemByType(type: string) {
        return this.items.find((value, index) => value.type === type);
    }

    patchDatePicker() {
        this.customDateControl.patchValue({
            begin: this._dateFrom,
            end: this._dateTo
        }, {
            emitEvent: false
        });
    }

    private emitChangeEvent() {
        this.onChangeDateRange.emit({
            type: this.selectedDateRangeItem.type,
            from: this.selectedDateRangeItem.from(),
            to: this.selectedDateRangeItem.to()
        });
    }
}
