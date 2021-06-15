import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {GeneralState} from '../../../shared/redux/general.reducer';
import {Subscription} from 'rxjs';
import {LoadUserInfo, ShowGeneralToastMessage} from '../../../shared/redux/general.actions';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomErrorStateMatcher} from "../../../shared/form-validator/custom-error-state.matcher";
import {GeneralDataService} from "../../../shared/services/general-data.service";
import {OrderItem} from "../../models/fin-application.model";
import {MatTableDataSource} from "@angular/material";
import {Router} from "@angular/router";

@Component({
    selector: 'otus-architect-user-notification-panel',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './user-notification-panel.component.html',
    styleUrls: ['./user-notification-panel.component.scss']
})
export class UserNotificationPanelComponent implements OnInit, OnDestroy {

    all$ = new Subscription();

    displayedColumns: string[] = ['rowNum', 'eventId', 'eventType', 'orderId', 'eventData'];
    dataSource = new MatTableDataSource<OrderItem>();
    items: any[];

    constructor(private store: Store<GeneralState>,
                private cd: ChangeDetectorRef,
                private _fb: FormBuilder,
                private dataService: GeneralDataService,
                private router: Router) {

    }

    ngOnInit() {
    }

    ngOnDestroy(): void {
        this.all$.unsubscribe();
    }


    refresh() {
        const sub$ = this.dataService.getNotifications().subscribe(
            notifications => {
                sub$.unsubscribe();
                this.items = notifications.reverse();
                this.dataSource.data = this.items;
                this.cd.detectChanges();
            }
        )
    }

    goToOrder(orderId: any) {
        this.router.navigate(['applications', orderId]);
    }

    prettyPrint(eventData: any) {
        return JSON.stringify(JSON.parse(eventData),null,'\t')
    }
}
