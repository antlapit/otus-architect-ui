import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import * as CoreActions from './core.actions';
import {tap} from "rxjs/operators";

@Injectable()
export class CoreEffects {
    constructor(private actions$: Actions) {}

    @Effect() initialization$ = this.actions$.pipe(
        ofType<CoreActions.Initialize<CoreActions.InitializationPayload>>(CoreActions.CoreActionTypes.Initialize),
        tap(action => console.log('InitializationPayload'))
    );
}
