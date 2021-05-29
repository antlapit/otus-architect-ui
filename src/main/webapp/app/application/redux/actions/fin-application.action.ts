import {Action} from '@ngrx/store';
import {
    Contract,
    CreateFinApplicationRequest,
    FinApplication,
    FinApplicationFilter,
    FinApplicationForm,
    FinApplicationProcessData
} from '../../models/fin-application.model';
import {ServiceResponse} from '../../../shared/domain/ServiceResponse';
import {ContactInfo, DeliveryInfo, PersonForm} from '../../models/general.model';

export enum FinApplicationTypes {
    CreateFinApplication = '[FinApplication] CreateFinApplication',
    HandleCreateFinApplication = '[FinApplication] HandleCreateFinApplication',
    GetFinApplicationList = '[FinApplication] GetFinApplicationList',
    HandleFinApplicationList = '[FinApplication] HandleFinApplicationList',
    GetFinApplicationCounters = '[FinApplication] GetFinApplicationCounters',
    HandleFinApplicationCounters = '[FinApplication] HandleFinApplicationCounters',
    ChangeFinApplicationFilter = '[FinApplication] ChangeFinApplicationFilter',
    LoadFinApplication = '[FinApplication] LoadFinApplication',
    HandleFinApplication = '[FinApplication] HandleFinApplication',
    LoadFinApplicationForm = '[FinApplication] LoadFinApplicationForm',
    HandleFinApplicationForm = '[FinApplication] HandleFinApplicationForm',
    LoadFinApplicationPrototypes = '[FinApplication] LoadFinApplicationPrototypes',
    HandleFinApplicationPrototypes = '[FinApplication] FinApplicationPrototypes',
    ClearFinApplicationPrototypes = '[FinApplication] ClearFinApplicationPrototypes',
    GetFinApplicationPrototype = '[FinApplication] GetFinApplicationPrototype',
    HandleGetFinApplicationPrototype = '[FinApplication] HandleGetFinApplicationPrototype',
    SaveFinApplication = '[FinApplication] SaveFinApplication',
    HandleSaveFinApplication = '[FinApplication] HandleSaveFinApplication',
    ProcessFinApplication = '[FinApplication] ProcessFinApplication',
    HandleProcessFinApplication = '[FinApplication] HandleProcessFinApplication',
    MarkApplicationProcessed = '[FinApplication] MarkApplicationProcessed',
    ClearApplicationProcessed = '[FinApplication] ClearApplicationProcessed',
    LoadFinApplicationPersonContainer = '[FinApplication] LoadFinApplicationPersonContainer',
    HandleFinApplicationPersonContainer = '[FinApplication] HandleFinApplicationPersonContainer',
    UpdateFinApplicationPersonForm = '[FinApplication] UpdateFinApplicationPersonForm',
    HandleFinApplicationPersonUpdate = '[FinApplication] HandleFinApplicationPersonUpdate',
    CreateBeneficiaryForm = '[FinApplication] CreateBeneficiaryForm',
    HandleCreateBeneficiaryForm = '[FinApplication] HandleCreateBeneficiaryForm',
    DeleteBeneficiaryForm = '[FinApplication] DeleteBeneficiaryForm',
    HandleDeleteBeneficiaryForm = '[FinApplication] HandleDeleteBeneficiaryForm',
    LoadContactInfo = '[FinApplication] LoadContactInfo',
    HandleContactInfo = '[FinApplication] HandleContactInfo',
    UpdateContactInfo = '[FinApplication] UpdateContactInfo',
    HandleContactInfoUpdate = '[FinApplication] HandleContactInfoUpdate',
    UpdateFinApplicationForm = '[FinApplication] UpdateFinApplicationForm',
    HandleFinApplicationFormUpdate = '[FinApplication] HandleFinApplicationFormUpdate',
    LoadContract = '[FinApplication] LoadContract',
    HandleContract = '[FinApplication] HandleContract',
    UpdateContract = '[FinApplication] UpdateContract',
    HandleContractUpdate = '[FinApplication] HandleContractUpdate',
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

export class GetFinApplicationCounters implements Action {
    readonly type = FinApplicationTypes.GetFinApplicationCounters;
    constructor(public payload: FinApplicationFilter) {}
}

export class HandleFinApplicationCounters implements Action {
    readonly type = FinApplicationTypes.HandleFinApplicationCounters;
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

export class LoadFinApplicationForm implements Action {
    readonly type = FinApplicationTypes.LoadFinApplicationForm;
    constructor(public payload: {
        id: string
    }) {}
}

export class HandleFinApplicationForm implements Action {
    readonly type = FinApplicationTypes.HandleFinApplicationForm;
    constructor(public response: ServiceResponse) {}
}

export class LoadContract implements Action {
    readonly type = FinApplicationTypes.LoadContract;
    constructor(public payload: {
        id: string
    }) {}
}

export class HandleContract implements Action {
    readonly type = FinApplicationTypes.HandleContract;
    constructor(public response: ServiceResponse) {}
}

export class UpdateContract implements Action {
    readonly type = FinApplicationTypes.UpdateContract;
    constructor(public payload: {
        id: string,
        contract: Contract
    }) {}
}

export class HandleContractUpdate implements Action {
    readonly type = FinApplicationTypes.HandleContractUpdate;
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

/** Загрузить Suggest по гарантиям */
export class LoadFinApplicationPrototypes implements Action {
    readonly type = FinApplicationTypes.LoadFinApplicationPrototypes;

    constructor(public payload: { query: string, count: number }) {}
}

/** Обработать Suggest по гарантиям */
export class HandleFinApplicationPrototypes implements Action {
    readonly type = FinApplicationTypes.HandleFinApplicationPrototypes;

    constructor(public response: ServiceResponse) {}
}

/** Почистить Suggest по гарантиям */
export class ClearFinApplicationPrototypes implements Action {
    readonly type = FinApplicationTypes.ClearFinApplicationPrototypes;

}

/** Загрузить Suggest по гарантиям */
export class GetFinApplicationPrototype implements Action {
    readonly type = FinApplicationTypes.GetFinApplicationPrototype;

    constructor(public payload: { id: string }) {}
}

/** Обработать Suggest по гарантиям */
export class HandleGetFinApplicationPrototype implements Action {
    readonly type = FinApplicationTypes.HandleGetFinApplicationPrototype;

    constructor(public response: ServiceResponse) {}
}

export class SaveFinApplication implements Action {
    readonly type = FinApplicationTypes.SaveFinApplication;
    constructor(public payload: FinApplication,
                public silent: boolean,
                public data: FinApplicationProcessData,
                public redirectToRoot: boolean) {}
}

export class HandleSaveFinApplication implements Action {
    readonly type = FinApplicationTypes.HandleSaveFinApplication;
    constructor(public response: ServiceResponse) {}
}

export class ProcessFinApplication implements Action {
    readonly type = FinApplicationTypes.ProcessFinApplication;
    constructor(public payload: {
        id: string,
        data: FinApplicationProcessData
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

export class LoadFinApplicationPersonContainer implements Action {
    readonly type = FinApplicationTypes.LoadFinApplicationPersonContainer;
    constructor(public payload: {
        id: string
    }) {}
}

export class HandleFinApplicationPersonContainer implements Action {
    readonly type = FinApplicationTypes.HandleFinApplicationPersonContainer;
    constructor(public response: ServiceResponse) {}
}

export class UpdateFinApplicationPersonForm implements Action {
    readonly type = FinApplicationTypes.UpdateFinApplicationPersonForm;
    constructor(public payload: {
        id: string,
        personId: string,
        form: PersonForm
    }) {}
}

export class HandleFinApplicationPersonUpdate implements Action {
    readonly type = FinApplicationTypes.HandleFinApplicationPersonUpdate;
    constructor(public response: ServiceResponse) {}
}

export class CreateBeneficiaryForm implements Action {
    readonly type = FinApplicationTypes.CreateBeneficiaryForm;
    constructor(public payload: {
        id: string,
        role: string
    }) {}
}

export class HandleCreateBeneficiaryForm implements Action {
    readonly type = FinApplicationTypes.HandleCreateBeneficiaryForm;
    constructor(public response: ServiceResponse) {}
}

export class DeleteBeneficiaryForm implements Action {
    readonly type = FinApplicationTypes.DeleteBeneficiaryForm;
    constructor(public payload: {
        id: string,
        personId: string,
        role: string
    }) {}
}

export class HandleDeleteBeneficiaryForm implements Action {
    readonly type = FinApplicationTypes.HandleDeleteBeneficiaryForm;
    constructor(public response: ServiceResponse) {}
}

export class LoadContactInfo implements Action {
    readonly type = FinApplicationTypes.LoadContactInfo;
    constructor(public payload: {
        id: string
    }) {}
}

export class HandleContactInfo implements Action {
    readonly type = FinApplicationTypes.HandleContactInfo;
    constructor(public response: ServiceResponse) {}
}

export class UpdateContactInfo implements Action {
    readonly type = FinApplicationTypes.UpdateContactInfo;
    constructor(public payload: {
        id: string,
        contactInfo: ContactInfo
    }) {}
}

export class HandleContactInfoUpdate implements Action {
    readonly type = FinApplicationTypes.HandleContactInfoUpdate;
    constructor(public response: ServiceResponse) {}
}

export class UpdateFinApplicationForm implements Action {
    readonly type = FinApplicationTypes.UpdateFinApplicationForm;
    constructor(public payload: {
        id: string,
        form: FinApplicationForm
    }) {}
}

export class HandleFinApplicationFormUpdate implements Action {
    readonly type = FinApplicationTypes.HandleFinApplicationFormUpdate;
    constructor(public response: ServiceResponse) {}
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
    | GetFinApplicationCounters
    | HandleFinApplicationCounters
    | ChangeFinApplicationFilter
    | LoadFinApplication
    | HandleFinApplication
    | LoadFinApplicationForm
    | HandleFinApplicationForm
    | LoadFinApplicationPrototypes
    | HandleFinApplicationPrototypes
    | ClearFinApplicationPrototypes
    | GetFinApplicationPrototype
    | HandleGetFinApplicationPrototype
    | SaveFinApplication
    | HandleSaveFinApplication
    | ProcessFinApplication
    | HandleProcessFinApplication
    | MarkApplicationProcessed
    | ClearApplicationProcessed
    | LoadFinApplicationPersonContainer
    | HandleFinApplicationPersonContainer
    | UpdateFinApplicationPersonForm
    | HandleFinApplicationPersonUpdate
    | CreateBeneficiaryForm
    | HandleCreateBeneficiaryForm
    | DeleteBeneficiaryForm
    | HandleDeleteBeneficiaryForm
    | LoadContactInfo
    | HandleContactInfo
    | UpdateContactInfo
    | HandleContactInfoUpdate
    | UpdateFinApplicationForm
    | HandleFinApplicationFormUpdate
    | LoadContract
    | HandleContract
    | UpdateContract
    | HandleContractUpdate
    | LoadDeliveryInfo
    | HandleDeliveryInfo
    | UpdateDeliveryInfo
    | HandleDeliveryInfoUpdate
    | RevokeFinApplication
    | ClearFinApplication;
