import {Component, Input} from "@angular/core";
import {Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
    selector: 'otus-architect-go-to-welcome',
    templateUrl: './go-to-welcome.component.html',
    styleUrls: ['./go-to-welcome.component.scss']
})
export class GoToWelcomeComponent {

    @Input('border')
    border: boolean = true;

    @Input('title')
    title: string = 'Список заявок';

    @Input('route')
    route: string;

    constructor(private router: Router,
                private location: Location) {
    }

    onButtonClick() {
        if (this.route && this.route !== '') {
            this.router.navigate([this.route]);
        } else {
            this.location.back();
        }
    }
}
