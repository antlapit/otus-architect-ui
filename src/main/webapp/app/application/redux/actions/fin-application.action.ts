import {Action} from '@ngrx/store';
import {CreateFinApplicationRequest, FinApplicationFilter} from '../../models/fin-application.model';
import {ServiceResponse} from '../../../shared/domain/ServiceResponse';
import {DeliveryInfo} from '../../models/general.model';

export enum FinApplicationTypes {
    CreateFinApplication = '[FinApplication] CreateFinApplication',
    HandleCreateFinApplication = '[FinApplication] HandleCreateFinApplication',
    GetFinApplicationList = '[FinApplication] GetFinApplicationList',
    HandleFinApplicationList = '[FinApplication] HandleFinApplicationList',
    ChangeFinApplicationFilter = '[FinApplication] ChangeFinApplicationFilter',
    LoadFinApplication = '[FinApplication] LoadFinApplication',
    HandleFinApplication = '[FinApplication] HandleFinApplication',
    ProcessFinApplication = '[FinApplication] ProcessFinApplication',
    HandleProcessFinApplication = '[FinApplication] HandleProcessFinApplication',
    MarkApplicationProcessed = '[FinApplication] MarkApplicationProcessed',
    ClearApplicationProcessed = '[FinApplication] ClearApplicationProcessed',
    LoadDeliveryInfo = '[FinApplication] LoadDeliveryInfo',
    HandleDeliveryInfo = '[FinApplication] HandleDeliveryInfo',
    UpdateDeliveryInfo = '[FinApplication] UpdateDeliveryInfo',
    HandleDeliveryInfoUpdate = '[FinApplication] HandleDeliveryInfoUpdate',
    RevokeFinApplication = '[FinApplication] RevokeFinApplication',
    ClearFinApplication = '[FinApplication] ClearFinApplication',
}

export class CreateFinApplication implements Action {
    readonly type = FinApplicationTypes.CreateFinApplication;
    constructor(public payload: CreateFinApplicationRequest) {}
}

export class HandleCreateFinApplication implements Action {
    readonly type = FinApplicationTypes.HandleCreateFinApplication;
    constructor(public response: ServiceResponse) {}
}

export class GetFinApplicationList implements Action {
    readonly type = FinApplicationTypes.GetFinApplicationList;
    constructor(public payload: FinApplicationFilter) {}
}

export class HandleFinApplicationList implements Action {
    readonly type = FinApplicationTypes.HandleFinApplicationList;
    constructor(public response: ServiceResponse) {}
}

export class ChangeFinApplicationFilter implements Action {
    readonly type = FinApplicationTypes.ChangeFinApplicationFilter;
    constructor(public payload: FinApplicationFilter) {}
}

export class LoadFinApplication implements Action {
    readonly type = FinApplicationTypes.LoadFinApplication;
    constructor(public payload: {
        id: string
    }) {}
}

export class HandleFinApplication implements Action {
    readonly type = FinApplicationTypes.HandleFinApplication;
    constructor(public response: ServiceResponse) {}
}

export class LoadDeliveryInfo implements Action {
    readonly type = FinApplicationTypes.LoadDeliveryInfo;
    constructor(public payload: {
        id: string
    }) {}
}

export class HandleDeliveryInfo implements Action {
    readonly type = FinApplicationTypes.HandleDeliveryInfo;
    constructor(public response: ServiceResponse) {}
}

export class UpdateDeliveryInfo implements Action {
    readonly type = FinApplicationTypes.UpdateDeliveryInfo;
    constructor(public payload: {
        id: string,
        deliveryInfo: DeliveryInfo
    }) {}
}

export class HandleDeliveryInfoUpdate implements Action {
    readonly type = FinApplicationTypes.HandleDeliveryInfoUpdate;
    constructor(public response: ServiceResponse) {}
}

export class ProcessFinApplication implements Action {
    readonly type = FinApplicationTypes.ProcessFinApplication;
    constructor(public payload: {
        id: string,
    },
    public redirectToProcessedView: boolean) {}
}

export class HandleProcessFinApplication implements Action {
    readonly type = FinApplicationTypes.HandleProcessFinApplication;
    constructor(public response: ServiceResponse) {}
}

export class MarkApplicationProcessed implements  Action {
    readonly type = FinApplicationTypes.MarkApplicationProcessed;
}

export class ClearApplicationProcessed implements  Action {
    readonly type = FinApplicationTypes.ClearApplicationProcessed;
}

export class RevokeFinApplication implements Action {
    readonly type = FinApplicationTypes.RevokeFinApplication;
    constructor(public payload: {
        id: string
    }) {}
}

export class ClearFinApplication implements Action {
    readonly type = FinApplicationTypes.ClearFinApplication;
}

export type FinApplicationActionUnion =
    | CreateFinApplication
    | HandleCreateFinApplication
    | GetFinApplicationList
    | HandleFinApplicationList
    | ChangeFinApplicationFilter
    | LoadFinApplication
    | HandleFinApplication
    | ProcessFinApplication
    | HandleProcessFinApplication
    | MarkApplicationProcessed
    | ClearApplicationProcessed
    | LoadDeliveryInfo
    | HandleDeliveryInfo
    | UpdateDeliveryInfo
    | HandleDeliveryInfoUpdate
    | RevokeFinApplication
    | ClearFinApplication;
