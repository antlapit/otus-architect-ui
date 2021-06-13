import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../../redux/application-state';
import {Location} from '@angular/common';

@Component({
    selector: 'otus-architect-catalog',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './catalog.component.html',
    styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit, OnDestroy {

    private all$: Subscription = new Subscription();

    constructor(private cd: ChangeDetectorRef,
                private router: Router,
                private store: Store<ApplicationState>,
                private activatedRoute: ActivatedRoute,
                private location: Location) {
    }

    ngOnDestroy(): void {
        this.all$.unsubscribe();
    }

    ngOnInit(): void {
    }

}
