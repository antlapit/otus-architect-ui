import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {combineLatest, Subscription} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {getSettingsTab} from '../../redux/selectors';
import {userRoles} from '../../../shared/redux/general.selectors';
import {ApplicationState} from '../../redux/application-state';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {MatTabChangeEvent, MatTabGroup} from '@angular/material';

@Component({
    selector: 'otus-architect-settings',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {

    private all$: Subscription = new Subscription();
    private tabKeys: any[];

    userRoles: String[];

    @ViewChild('tabs')
    tabs: MatTabGroup;

    selectedTab: string;

    constructor(private cd: ChangeDetectorRef,
                private router: Router,
                private store: Store<ApplicationState>,
                private activatedRoute: ActivatedRoute,
                private location: Location) {
        this.tabKeys = [
            {
                name: 'profile',
                index: 0
            },
            {
                name: 'money',
                index: 1
            },
            {
                name: 'notification',
                index: 2
            }
        ];
    }

    ngOnDestroy(): void {
        this.all$.unsubscribe();
    }

    ngOnInit(): void {

    }

    navigateTo($event: MatTabChangeEvent) {
        const normalizeUrl = this.router.url.split('?')[0];
        const queryParams = {...this.activatedRoute.snapshot.queryParams};
        queryParams['settingsTab'] = this.tabKeys.find(key => key.index === $event.index).name;
        let queryParamsString = '?';
        for (const key in queryParams) {
            if (queryParams.hasOwnProperty(key)) {
                const substr = queryParamsString === '?' ? '' : '&';
                queryParamsString = queryParamsString.concat(`${substr}${key}=${queryParams[key]}`);
            }
        }
        this.location.replaceState(normalizeUrl, queryParamsString);
    }


    private addRouteListener() {
        this.all$.add(
            combineLatest(
                this.store.pipe(select(getSettingsTab))
            ).subscribe(
                ([selectedTab]) => {
                    this.selectedTab = selectedTab;
                    if (!!this.selectedTab) {
                        console.log(this.selectedTab);
                        const refTab = this.tabKeys.find(key => {
                            return key.name === this.selectedTab;
                        });
                        this.tabs.selectedIndex = refTab.index;
                    } else {
                        this.tabs.selectedIndex = 0;
                    }
                    this.cd.detectChanges();
                }
            ));
    }
}
