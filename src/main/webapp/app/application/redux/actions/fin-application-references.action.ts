import {Action} from '@ngrx/store';
import {ServiceResponse} from '../../../shared/domain/ServiceResponse';

export enum FinApplicationReferencesTypes {
    GetFormStatuses = '[FinApplicationReferences] GetFormStatuses',
    HandleFormStatuses = '[FinApplicationReferences] HandleFormStatuses',
    GetStageGroups = '[FinApplicationReferences] GetStageGroups',
    HandleStageGroups = '[FinApplicationReferences] HandleStageGroups',
    GetDefaultStages = '[FinApplicationReferences] GetDefaultStages',
    HandleDefaultStages = '[FinApplicationReferences] HandleDefaultStages',
    GetDeliveryTypes = '[FinApplicationReferences] GetDeliveryTypes',
    HandleDeliveryTypes = '[FinApplicationReferences] HandleDeliveryTypes',
    GetKinds = '[FinApplicationReferences] GetKinds',
    HandleKinds = '[FinApplicationReferences] HandleKinds'
}

export class GetFinApplicationFormStatuses implements Action {
    readonly type = FinApplicationReferencesTypes.GetFormStatuses;
    constructor() {}
}

export class HandleFinApplicationFormStatuses implements Action {
    readonly type = FinApplicationReferencesTypes.HandleFormStatuses;
    constructor(public response: ServiceResponse) {}
}

export class GetFinApplicationStageGroups implements Action {
    readonly type = FinApplicationReferencesTypes.GetStageGroups;
    constructor() {}
}

export class HandleApplicationStageGroups implements Action {
    readonly type = FinApplicationReferencesTypes.HandleStageGroups;
    constructor(public response: ServiceResponse) {}
}

export class GetDefaultFinApplicationStages implements Action {
    readonly type = FinApplicationReferencesTypes.GetDefaultStages;
    constructor() {}
}

export class HandleDefaultApplicationStages implements Action {
    readonly type = FinApplicationReferencesTypes.HandleDefaultStages;
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

export class GetKinds implements Action {
    readonly type = FinApplicationReferencesTypes.GetKinds;
    constructor() {}
}

export class HandleKinds implements Action {
    readonly type = FinApplicationReferencesTypes.HandleKinds;
    constructor(public response: ServiceResponse) {}
}

export type FinApplicationReferencesActionUnion =
    | GetFinApplicationFormStatuses
    | HandleFinApplicationFormStatuses
    | GetFinApplicationStageGroups
    | HandleApplicationStageGroups
    | GetDefaultFinApplicationStages
    | HandleDefaultApplicationStages
    | GetDeliveryTypes
    | HandleDeliveryTypes
    | GetKinds
    | HandleKinds;
