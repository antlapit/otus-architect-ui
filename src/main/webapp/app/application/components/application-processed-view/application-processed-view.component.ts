import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'otus-architect-application-processed-view',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './application-processed-view.component.html',
    styleUrls: ['./application-processed-view.component.scss']
})
export class ApplicationProcessedViewComponent {

    constructor(private router: Router) {

    }

    goToDashboard() {
        this.router.navigate(['dashboard']);
    }
}
