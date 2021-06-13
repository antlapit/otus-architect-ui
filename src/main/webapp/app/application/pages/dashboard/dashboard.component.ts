import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {getDashboardTab} from '../../redux/selectors';
import {ApplicationState} from '../../redux/application-state';
import {MatTabChangeEvent, MatTabGroup} from '@angular/material';
import {Location} from '@angular/common';

@Component({
    selector: 'otus-architect-dashboard',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

    private all$: Subscription = new Subscription();
    private tabKeys: any[];

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
                name: 'applications',
                index: 0
            }
        ];
    }

    ngOnDestroy(): void {
        this.all$.unsubscribe();
    }

    ngOnInit(): void {
        this.all$.add(
            this.store.pipe(select(getDashboardTab)).subscribe(
                selectedTab => {
                    this.changeTab(selectedTab);
                }
            ));
    }

    createNew() {
        this.router.navigate(['/applications/new']);
    }

    navigateTo($event: MatTabChangeEvent) {
        const normalizeUrl = this.router.url.split('?')[0];
        const queryParams = {...this.activatedRoute.snapshot.queryParams};
        const name = this.tabKeys.find(key => key.index === $event.index).name;
        this.selectedTab = name;
        queryParams['dashboardTab'] = name;
        let queryParamsString = '?';
        for (const key in queryParams) {
            if (queryParams.hasOwnProperty(key)) {
                const substr = queryParamsString === '?' ? '' : '&';
                queryParamsString = queryParamsString.concat(`${substr}${key}=${queryParams[key]}`);
            }
        }
        this.location.replaceState(normalizeUrl, queryParamsString);
    }

    changeTab(selectedTab: string) {
        this.selectedTab = selectedTab;
        this.tabs.selectedIndex = selectedTab ? this.tabKeys.find(key => key.name === selectedTab).index : 0;
        this.cd.detectChanges();
    }
}
