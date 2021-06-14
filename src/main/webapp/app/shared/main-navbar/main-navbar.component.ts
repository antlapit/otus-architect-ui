import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {AppConfigService} from "../../core/app-load/services/app-config.service";
import {Observable} from "rxjs";
import {UserIdentity} from "../../core/domain/UserIdentity";
import {Workspace, WorkspaceMenuItem} from "../domain/Workspace";
import {select, Store} from "@ngrx/store";
import * as GeneralSelectors from "../redux/general.selectors";
import {GeneralState} from "../redux/general.reducer";
import * as AuthActions from "../../core/auth/redux/auth.actions";

@Component({
    selector: 'otus-architect-main-navbar',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './main-navbar.component.html',
    styleUrls: ['./main-navbar.component.scss']
})
export class MainNavbarComponent implements OnInit, OnDestroy {

    private config: any;
    public userIdentity$: Observable<UserIdentity>;
    public workspace: Workspace;
    public appName: string;

    constructor(private router: Router, private configService: AppConfigService,
                private store: Store<GeneralState>) {
        this.configService.config$.subscribe(config => {
            this.config = config;
            if (!!this.config && !!this.config.application) {
                this.appName = this.config.application.name;
            }
        });
    }

    ngOnInit() {
        this.userIdentity$ = this.store.pipe(select(GeneralSelectors.getUserInfo));
        this.workspace = new Workspace(
            [],
            [
                new WorkspaceMenuItem(
                    "",
                    "Каталог",
                    '/catalog'
                ),
                new WorkspaceMenuItem(
                    "",
                    "Заказы",
                    '/dashboard'
                )
            ]
        )
    }

    ngOnDestroy(): void {
    }

    public logout() {
        this.store.dispatch(new AuthActions.Logout());
    }

    goToRoot() {
        this.router.navigate(['']);
    }
}
