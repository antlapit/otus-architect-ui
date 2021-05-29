import {ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit} from "@angular/core";

@Component({
    selector: 'otus-architect-two-titles-panel',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './two-titles-panel.component.html',
    styleUrls: ['./two-titles-panel.component.scss']
})
export class TwoTitlesPanelComponent implements OnInit, OnDestroy {

    @Input('title')
    title: string;

    @Input('titleClass')
    titleClass: string;

    @Input('subTitle')
    subTitle: string;

    @Input('subTitleClass')
    subTitleClass: string;

    ngOnDestroy(): void {
    }

    ngOnInit(): void {
    }

}
