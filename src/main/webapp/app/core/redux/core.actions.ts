import {UserIdentity} from '../domain/UserIdentity';
import {Action} from '@ngrx/store';

export enum CoreActionTypes {
    Initialize = '[Core] Initialize',
}

export interface InitializationPayload {
    UserIdentity: UserIdentity;
}

export class Initialize<Payload extends InitializationPayload> implements Action {
    type = CoreActionTypes.Initialize;
    constructor(public payload: Payload) {}
}

export type CoreActionsUnion =
    | Initialize<InitializationPayload>;
