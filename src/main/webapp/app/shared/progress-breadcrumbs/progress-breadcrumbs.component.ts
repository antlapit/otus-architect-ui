import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../../application/redux/application-state';
import {ActivatedRoute, Router} from '@angular/router';
import {Stage} from '../../application/models/general.model';

@Component({
    selector: 'otus-architect-progress-breadcrumbs',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './progress-breadcrumbs.component.html',
    styleUrls: ['./progress-breadcrumbs.component.scss']
})
export class ProgressBreadcrumbsComponent implements OnInit, OnDestroy {

    @Input('stages')
    stages: any[];

    @Input('stage')
    stage: Stage;

    constructor(private changeDetector: ChangeDetectorRef,
                private store: Store<ApplicationState>,
                private route: ActivatedRoute,
                private router: Router) {

    }

    ngOnDestroy(): void {

    }

    ngOnInit(): void {

    }

    calcStepClass(stageTab: any) {
        const left = (stageTab.groupIndex + 1) * 10;
        const right = (stageTab.groupIndex + 2) * 10;
        if (this.stage.numCode < left) {
            return 'future-step';
        } else if (this.stage.numCode < right) {
            if (this.stage.error) {
                return 'error-step';
            } else if (this.stage.success) {
                return '';
            } else {
                if (this.stage.final) {
                    return 'future-step';
                } else {
                    return 'active-step';
                }
            }
        } else {
            return '';
        }
    }

    calcWidth(stageTabTitle: any) {
        return 100.0 / this.stages.length;
    }

    private recalcTotalTextLength() {
        let totalTextLength = 0;
        for (const tab of this.stages) {
            totalTextLength = totalTextLength + this.getStageTitle(tab).length;
        }
        return totalTextLength;
    }

    getStageTitle(stageTab: any) {
        const left = (stageTab.groupIndex + 1) * 10;
        const right = (stageTab.groupIndex + 2) * 10;
        if (left <= this.stage.numCode && this.stage.numCode < right) {
            return this.stage.name;
        } else {
            if (this.stage.numCode < left  && this.stage.final) {
                return '          '; // шаги в будущем, которые не будут достигнуты
            } else {
                return stageTab.title;
            }
        }
    }
}
