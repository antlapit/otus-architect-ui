import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from "@angular/core";

@Component({
    selector: 'otus-architect-simple-form-container',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './simple-form-container.component.html',
    styleUrls: ['./simple-form-container.component.scss']
})
export class SimpleFormContainerComponent implements OnInit, OnDestroy {
    ngOnDestroy(): void {
    }

    ngOnInit(): void {
    }

}
