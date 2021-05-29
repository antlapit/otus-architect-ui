import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../../application/redux/application-state';
import {ActivatedRoute, Router} from '@angular/router';
import {ContactInfo} from '../../application/models/general.model';

@Component({
    selector: 'otus-architect-contact-view-card',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './contact-view-card.component.html',
    styleUrls: ['./contact-view-card.component.scss']
})
export class ContactViewCardComponent implements OnInit, OnDestroy {

    @Input()
    contactInfo: ContactInfo;

    @Input()
    loading: boolean;

    constructor(private changeDetector: ChangeDetectorRef,
                private store: Store<ApplicationState>,
                private route: ActivatedRoute,
                private router: Router) {

    }

    ngOnDestroy(): void {

    }

    ngOnInit(): void {

    }
}
