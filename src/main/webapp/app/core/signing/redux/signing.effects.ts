import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {SigningService} from "../signing.service";
import {map, switchMap} from "rxjs/operators";
import {ServiceResponse} from "../../../shared/domain/ServiceResponse";
import {
    HandleFilesByCredentials,
    HandleSignFileByCredentials,
    LoadFilesByCredentials,
    SignFileByCredentials,
    SigningActionTypes
} from "./signing.actions";

@Injectable()
export class SigningEffects {

    constructor(
        private actions$: Actions,
        private signingService: SigningService
    ) { }

    @Effect() findDocuments$ = this.actions$.pipe(
        ofType<LoadFilesByCredentials>(SigningActionTypes.LoadFilesByCredentials),
        switchMap(action => {
            return this.signingService.findDocuments(action.payload.key, action.payload.code, action.payload.captcha);
        }),
        map((response: ServiceResponse) => new HandleFilesByCredentials(response))
    );

    @Effect() signFile$ = this.actions$.pipe(
        ofType<SignFileByCredentials>(SigningActionTypes.SignFileByCredentials),
        switchMap(action => {
            return this.signingService.signFile(action.payload.fileId, action.payload.sign,
                action.payload.key, action.payload.code);
        }),
        map((response: ServiceResponse) => new HandleSignFileByCredentials(response))
    );
}
