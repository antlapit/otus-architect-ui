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
import {ActivatedRoute, Router} from '@angular/router';
import {Contract} from '../../models/fin-application.model';
import {ApplicationState} from '../../redux/application-state';

@Component({
    selector: 'otus-architect-contract-view-card',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './contract-view-card.component.html',
    styleUrls: ['./contract-view-card.component.scss']
})
export class ContractViewCardComponent implements OnInit, OnDestroy {

    @Input()
    contract: Contract;

    @Input()
    loading: boolean;

    @Input()
    editable: boolean;

    @Output()
    changes = new EventEmitter<Contract>();

    constructor(private changeDetector: ChangeDetectorRef,
                private store: Store<ApplicationState>,
                private route: ActivatedRoute,
                private router: Router) {

    }

    ngOnDestroy(): void {

    }

    ngOnInit(): void {

    }

    changeAdvance() {
        this.contract.advance = !this.contract.advance;
        this.changes.emit(this.contract);
    }
}
