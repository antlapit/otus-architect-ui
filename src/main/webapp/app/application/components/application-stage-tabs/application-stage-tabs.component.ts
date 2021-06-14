import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output
} from '@angular/core';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../../redux/application-state';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'otus-architect-application-stage-tabs',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './application-stage-tabs.component.html',
    styleUrls: ['./application-stage-tabs.component.scss']
})
export class ApplicationStageTabsComponent implements OnInit, OnDestroy {

    @Input()
    activeStage: FormControl;

    @Output() selectStageEvent = new EventEmitter<String>();

    all$: Subscription = new Subscription();
    isLoadingApplicationStageGroups: boolean;
    tabs = [
        {
            code: 'NEW',
            title: 'Черновик'
        }, {
            code: 'REJECTED',
            title: 'Отменен'
        }, {
            code: 'ROLLED_BACK',
            title: 'Отказ'
        }, {
            code: 'PREPARED',
            title: 'В обработке'
        }, {
            code: 'CONFIRMED',
            title: 'Ожидает оплаты'
        },
        {
            code: 'COMPLETED',
            title: 'Завершен'
        }
    ]

    constructor(private cd: ChangeDetectorRef,
                private store: Store<ApplicationState>,
                private route: ActivatedRoute,
                private router: Router) {

    }

    ngOnDestroy(): void {
        this.all$.unsubscribe();
    }

    ngOnInit(): void {
    }

    isStageActive(stage: any) {
        const activeStageLabel = this.activeStage.value;
        if (!stage && !activeStageLabel) {
            return true;
        }
        return !!activeStageLabel && stage && activeStageLabel === stage.code;
    }

    selectStage(stage: any) {
        this.selectStageEvent.emit(!stage ? null : stage.code);
    }

}
