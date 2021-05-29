import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {AppConfigService} from "../../core/app-load/services/app-config.service";
import {Store} from "@ngrx/store";
import {GeneralState} from "../redux/general.reducer";

@Component({
    selector: 'otus-architect-unauthorized-footer',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './unauthorized-footer.component.html',
    styleUrls: ['./unauthorized-footer.component.scss']
})
export class UnauthorizedFooterComponent implements OnInit, OnDestroy {

    private config: any;

    copyrightTitle = '';
    licenseTitle = '';

    constructor(private router: Router, private configService: AppConfigService,
                private store: Store<GeneralState>,
                private cd: ChangeDetectorRef) {
        this.configService.config$.subscribe(config => {
            this.config = config;
            if (!!config.application && !!config.application.bank) {
                this.copyrightTitle = `© ${config.application.bank.title}, ${new Date().getFullYear()}`;
                this.licenseTitle = config.application.bank.license;
            }
        });
    }

    ngOnInit() {

    }

    ngOnDestroy(): void {
    }

}

