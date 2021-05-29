import {ChangeDetectionStrategy, Component, Input} from "@angular/core";

@Component({
    selector: 'otus-architect-center-spinner',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './center-spinner.component.html',
    styleUrls: ['./center-spinner.component.scss']
})
export class CenterSpinnerComponent {
    @Input()
    diameter = 60;
}
