import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {AppConfigService} from "../../core/app-load/services/app-config.service";

@Component({
    selector: 'otus-architect-unauthorized-navbar',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './unauthorized-navbar.component.html',
    styleUrls: ['./unauthorized-navbar.component.scss']
})
export class UnauthorizedNavbarComponent implements OnInit, OnDestroy {

    config: any;

    constructor(private router: Router, private configService: AppConfigService) {
        this.configService.config$.subscribe(config => this.config = config);
    }

    ngOnInit() {

    }

    ngOnDestroy(): void {
    }
}
