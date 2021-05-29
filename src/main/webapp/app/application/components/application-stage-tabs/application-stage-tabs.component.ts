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
import {select, Store} from '@ngrx/store';
import {ApplicationState} from '../../redux/application-state';
import {ActivatedRoute, Router} from '@angular/router';
import {combineLatest, Subscription} from 'rxjs';
import {
    finApplicationCounters,
    finApplicationStageGroups,
    isLoadingFinApplicationCounters,
    isLoadingFinApplicationStageGroups
} from '../../redux/selectors';
import {FormControl} from '@angular/forms';
import {FinApplicationCounters} from '../../models/fin-application.model';

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
    tabs: any[];

    finApplicationCounters: FinApplicationCounters;
    isLoadingFinApplicationCounters: boolean;

    constructor(private cd: ChangeDetectorRef,
                private store: Store<ApplicationState>,
                private route: ActivatedRoute,
                private router: Router) {

    }

    ngOnDestroy(): void {
        this.all$.unsubscribe();
    }

    ngOnInit(): void {
        this.all$.add(
            combineLatest(
                this.store.pipe(select(isLoadingFinApplicationStageGroups)),
                this.store.pipe(select(finApplicationStageGroups)),
            ).subscribe(([isLoadingApplicationStageGroups, applicationStageGroups]) => {
                this.isLoadingApplicationStageGroups = isLoadingApplicationStageGroups;
                this.tabs = applicationStageGroups;
                this.cd.detectChanges();
            })
        );

        this.all$.add(
            combineLatest(
                this.store.pipe(select(isLoadingFinApplicationCounters)),
                this.store.pipe(select(finApplicationCounters)),
            ).subscribe(([isLoadingFinApplicationCounters, finApplicationCounters]) => {
                this.isLoadingFinApplicationCounters = isLoadingFinApplicationCounters;
                this.finApplicationCounters = finApplicationCounters;
                this.cd.detectChanges();
            })
        );
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

    getStageCounter(stage: any): number {
        if (!this.finApplicationCounters || !this.finApplicationCounters.counters) {
            return 0;
        }
        for (const counter of this.finApplicationCounters.counters) {
            if (stage.code === counter.stage) {
                return counter.count;
            }
        }
        return 0;
    }
}
