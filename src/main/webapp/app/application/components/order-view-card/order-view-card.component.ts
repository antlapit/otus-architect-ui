import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ApplicationState} from '../../redux/application-state';
import {FinApplication} from '../../models/fin-application.model';
import {combineLatest, Subscription} from 'rxjs';
import {deliveryTypes} from '../../redux/selectors';
import {userRoles} from '../../../shared/redux/general.selectors';
import {GetDeliveryTypes} from '../../redux/actions';
import {DeliveryInfo} from '../../models/general.model';
import {DeliveryType} from '../../models/references.model';

@Component({
    selector: 'otus-architect-order-view-card',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './order-view-card.component.html',
    styleUrls: ['./order-view-card.component.scss']
})
export class OrderViewCardComponent implements OnInit, OnDestroy {

    @Input()
    application: FinApplication;

    @Input()
    loading: boolean;

    @Input()
    deliveryInfo: DeliveryInfo;

    deliveryTypes: DeliveryType[];
    kinds: any[];
    deliveryType: DeliveryType;
    kind: any;

    userRoles: String[];

    private all$: Subscription = new Subscription();

    constructor(private changeDetector: ChangeDetectorRef,
                private store: Store<ApplicationState>) {

    }

    ngOnDestroy(): void {
        this.all$.unsubscribe();
    }

    ngOnInit(): void {
        this.all$.add(
            combineLatest(
                this.store.pipe(select(deliveryTypes))
            ).subscribe(([deliveryTypes]) => {
                this.deliveryTypes = deliveryTypes;
                if (!!this.deliveryTypes && !!this.deliveryInfo) {
                    this.deliveryType = this.findByValue(this.deliveryTypes, this.deliveryInfo.type);
                }

                this.changeDetector.detectChanges();
            })
        );

        this.all$.add(combineLatest(
            this.store.pipe(select(userRoles))
        ).subscribe(([userRoles]) => {
            this.userRoles = userRoles;
        }));

        this.store.dispatch(new GetDeliveryTypes());
    }

    private findByValue(refs: any[], value: string): any {
        if (value) {
            for (const ref of refs) {
                if (ref['value'] === value) {
                    return ref;
                }
            }
        }
        return null;
    }

}
