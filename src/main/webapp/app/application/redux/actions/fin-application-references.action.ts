import {Action} from '@ngrx/store';
import {ServiceResponse} from '../../../shared/domain/ServiceResponse';

export enum FinApplicationReferencesTypes {
    GetFormStatuses = '[FinApplicationReferences] GetFormStatuses',
    HandleFormStatuses = '[FinApplicationReferences] HandleFormStatuses',
    GetDeliveryTypes = '[FinApplicationReferences] GetDeliveryTypes',
    HandleDeliveryTypes = '[FinApplicationReferences] HandleDeliveryTypes',
}

export class GetFinApplicationFormStatuses implements Action {
    readonly type = FinApplicationReferencesTypes.GetFormStatuses;
    constructor() {}
}

export class HandleFinApplicationFormStatuses implements Action {
    readonly type = FinApplicationReferencesTypes.HandleFormStatuses;
    constructor(public response: ServiceResponse) {}
}

export class GetDeliveryTypes implements Action {
    readonly type = FinApplicationReferencesTypes.GetDeliveryTypes;
    constructor() {}
}

export class HandleDeliveryTypes implements Action {
    readonly type = FinApplicationReferencesTypes.HandleDeliveryTypes;
    constructor(public response: ServiceResponse) {}
}

export type FinApplicationReferencesActionUnion =
    | GetFinApplicationFormStatuses
    | HandleFinApplicationFormStatuses
    | GetDeliveryTypes
    | HandleDeliveryTypes
