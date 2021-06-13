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
import {Subscription} from 'rxjs';

@Component({
    selector: 'otus-architect-category-picker',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './category-picker.component.html',
    styleUrls: ['./category-picker.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CategoryPickerComponent implements OnInit, OnDestroy {

    @Input('title')
    title: string;

    @Input('categories')
    categories: any[];

    @Input('selectedCategories')
    set selectedCategories(val: string[]) {
        if (!val) {
            this._selectedCategories = [];
        } else {
            this._selectedCategories = val;
        }
    }

    _selectedCategories: string[] = [];

    menuOpened = false;

    @Output('onCategoryListChanged')
    onCategoryListChanged = new EventEmitter<string[]>();

    all$ = new Subscription();

    ngOnDestroy(): void {
        this.all$.unsubscribe();
    }

    ngOnInit(): void {

    }

    changeSelectItem(id: string) {
        const elIndex = this._selectedCategories.indexOf(id);
        if (elIndex > -1) {
            this._selectedCategories.splice(elIndex, 1);
        } else {
            this._selectedCategories.push(id);
        }
        this.emitNewChangeEvent();
    }

    selectAll() {
        this._selectedCategories = [];
        this.emitNewChangeEvent();
    }

    emitNewChangeEvent() {
        this.onCategoryListChanged.emit(this._selectedCategories);
    }
}
