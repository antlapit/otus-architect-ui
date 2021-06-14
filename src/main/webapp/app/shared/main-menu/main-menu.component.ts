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

    @Input('appName') set appName(value: string) {
        if (!!value) {
            this.app = value;
            if (!!this.menuItems) {
                this.calcSelectedIndex();
            }
        }
    }

    @ViewChild(MatTabGroup) tabGroup: MatTabGroup;

    app: string;
    appSelectedIndex: number;

    @Input() set workspace(value: Workspace) {
        if (!!value) {
            this.menuItems = value.items;
            if (!!this.app) {
                this.calcSelectedIndex();
            }
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
        this.menuItems.forEach((v, index) => {
            if (v.appName === this.app) {
                this.appSelectedIndex = index;
                this.tabs.selectedIndex = index;
            }
        });

        this.calcLocalRoute(this.router.url);
    }

    navigateTo($event: any) {
        if ($event.index === this.menuItems.length) {
            // игнорируем
        } else if ($event.index === this.appSelectedIndex) {
            this.router.navigate(['']);
        } else {
            this.router.navigate([this.menuItems[$event.index].url]);
            this.tabs.selectedIndex = this.appSelectedIndex;
            this.cdRef.detectChanges();
        }
    }

    private calcLocalRoute(url: any) {
        this.isSettingsRoute = url.indexOf('/settings') > -1 || url.indexOf('/agent-contracts/') > -1;
        if (this.isSettingsRoute) {
            this.tabs.selectedIndex = this.menuItems.length;
            this.cdRef.detectChanges();
        }
    }

    navigateOnClick(index: number) {
        if (index === this.appSelectedIndex) {
            this.router.navigate(['']);
        }
    }
}
