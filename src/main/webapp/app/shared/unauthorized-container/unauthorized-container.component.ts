import {ChangeDetectionStrategy, Component} from "@angular/core";

@Component({
    selector: 'otus-architect-unauthorized-container',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './unauthorized-container.component.html',
    styleUrls: ['./unauthorized-container.component.scss']
})
export class UnauthorizedContainerComponent {

}
