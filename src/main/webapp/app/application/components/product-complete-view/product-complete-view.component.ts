import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../../redux/application-state';
import {Subscription} from 'rxjs';
import {AppConfigService} from '../../../core/app-load/services/app-config.service';
import {PlatformLocation} from '@angular/common';
import {Product} from "../../models/product.model";

@Component({
    selector: 'otus-architect-product-complete-view',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './product-complete-view.component.html',
    styleUrls: ['./product-complete-view.component.scss']
})
export class ProductCompleteViewComponent implements OnInit, OnDestroy {

    private all$: Subscription = new Subscription();

    @Input('product')
    selectedProduct: Product;

    @Input('loading')
    loading: boolean;

    constructor(private cd: ChangeDetectorRef,
                private store: Store<ApplicationState>,
                private configService: AppConfigService,
                private platformLocation: PlatformLocation) {
    }

    ngOnDestroy(): void {
        this.all$.unsubscribe();
    }

    ngOnInit(): void {
    }

    parseDetails(details: string) {
        return JSON.parse(details);
    }
}
