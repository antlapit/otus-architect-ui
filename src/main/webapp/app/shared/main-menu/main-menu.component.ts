import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnDestroy,
    OnInit,
    ViewChild
} from '@angular/core';
import {Workspace, WorkspaceMenuItem} from '../domain/Workspace';
import {NavigationEnd, Router} from '@angular/router';
import {MatTabGroup} from '@angular/material';
import {Subscription} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
    selector: 'otus-architect-main-menu',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './main-menu.component.html',
    styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit, OnDestroy {

    @Input() menuItems: WorkspaceMenuItem[] = [];
    private event$: Subscription;

    @ViewChild('tabs')
    tabs: MatTabGroup;

    isSettingsRoute: boolean;

    @ViewChild(MatTabGroup) tabGroup: MatTabGroup;

    @Input() set workspace(value: Workspace) {
        if (!!value) {
            this.menuItems = value.items;
            this.calcSelectedIndex();
        }
    }


    constructor(private router: Router, private cdRef: ChangeDetectorRef) {
    }

    ngOnInit() {
        // check active url after navigation end
        this.event$ = this.router.events
            .pipe(
                map(e => {
                    if (e instanceof NavigationEnd) {
                        return e.urlAfterRedirects;
                    } else {
                        return null;
                    }
                })
            )
            .pipe(
                startWith(this.router.url)
            ).subscribe(url => {
                if (!!url) {
                    this.calcLocalRoute(url);
                }
            });
    }

    ngOnDestroy(): void {
        this.event$.unsubscribe();
    }


    private calcSelectedIndex() {
        this.calcLocalRoute(this.router.url);
    }

    navigateTo($event: any) {
        if ($event.index === this.menuItems.length) {
            // игнорируем
        } else {
            console.log(this.menuItems[$event.index].url);
            this.router.navigate([this.menuItems[$event.index].url]);
            this.tabs.selectedIndex = $event.index;
            this.cdRef.detectChanges();
        }
    }

    private calcLocalRoute(url: any) {
        if (url.indexOf('/settings') > -1) {
            this.tabs.selectedIndex = this.menuItems.length;
        } else if (url.indexOf('/catalog') > -1) {
            this.tabs.selectedIndex = 0;
        } else if (url.indexOf('/dashboard') > -1 || url.indexOf('/applications') > -1) {
            this.tabs.selectedIndex = 1;
        }
        this.cdRef.detectChanges();
    }
}
