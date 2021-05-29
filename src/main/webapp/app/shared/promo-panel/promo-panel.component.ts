import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";

@Component({
    selector: 'otus-architect-promo-panel',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './promo-panel.component.html',
    styleUrls: ['./promo-panel.component.scss']
})
export class PromoPanelComponent implements OnInit {
    ngOnInit(): void {
    }

}
