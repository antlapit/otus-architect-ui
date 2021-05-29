import {ApplicationMessage} from '../../shared/domain/ApplicationMessage';
import {
    Contract,
    FinApplication,
    FinApplicationCounters,
    FinApplicationFilter,
    FinApplicationForm,
    PersonFormContainer
} from '../models/fin-application.model';
import {ContactInfo, DeliveryInfo, ExternalChange} from '../models/general.model';
import {DeliveryType} from '../models/references.model';

export interface ApplicationState {
    applicationMessage: ApplicationMessage;
    applicationToastMessage: ApplicationMessage;
    isCreatingFinApplication: boolean;
    isLoadingFinApplications: boolean;
    finApplications: FinApplication[];
    isLoadingFinApplicationCounters: boolean;
    finApplicationCounters: FinApplicationCounters;
    finApplicationsFilter: FinApplicationFilter;
    isLoadingFinApplication: boolean;
    selectedFinApplication: FinApplication;
    finApplicationPrototypes: any[];
    isLoadingFinApplicationPrototypes: boolean;
    finApplicationFormStatuses: any[];
    isLoadingFinApplicationFormStatuses: boolean;
    finApplicationStageGroups: any[];
    isLoadingFinApplicationStageGroups: boolean;
    defaultFinApplicationStages: any[];
    isLoadingDefaultFinApplicationStages: boolean;
    deliveryTypes: DeliveryType[];
    isLoadingDeliveryTypes: boolean;
    kinds: any[];
    isLoadingKinds: boolean;
    selectedFinApplicationForm: FinApplicationForm;
    isLoadingFinApplicationForm: boolean;
    contract: Contract;
    isLoadingContract: boolean;
    isSavingContract: boolean;
    deliveryInfo: DeliveryInfo;
    isLoadingDeliveryInfo: boolean;
    isSavingDeliveryInfo: boolean;
    createdFinApplicationPersonForms: string[];
    finApplicationPersons: PersonFormContainer;
    isLoadingFinApplicationPersons: boolean;
    isCreatingFinApplicationPerson: boolean;
    isProcessingFinApplicationForm: boolean;
    savingFinApplicationPersonForms: number;
    deletingFinApplicationPersonForms: number;
    isSendingForSigningFinApplication: boolean;
    savingSignsFinApplication: number;
    redirectToFinApplicationProcessedView: boolean;
    redirectToRoot: boolean;
    isLoadingContactInfo: boolean;
    contactInfo: ContactInfo;
    isSavingContactInfo: boolean;
    isSavingFinApplicationForm: boolean;
    isLoadingApplicationChanges: boolean;
    applicationChanges: ExternalChange[];
    isLoadingContractChanges: boolean;
    contractChanges: ExternalChange[];
    finApplicationCreatingErrorMessage: ApplicationMessage;
}

export const initialState: ApplicationState = {
    applicationMessage: null,
    applicationToastMessage: null,
    isCreatingFinApplication: false,
    isLoadingFinApplications: false,
    finApplications: null,
    isLoadingFinApplicationCounters: false,
    finApplicationCounters: null,
    finApplicationsFilter: null,
    isLoadingFinApplication: false,
    selectedFinApplication: null,
    finApplicationPrototypes: [],
    isLoadingFinApplicationPrototypes: false,
    finApplicationFormStatuses: [],
    isLoadingFinApplicationFormStatuses: false,
    finApplicationStageGroups: [],
    isLoadingFinApplicationStageGroups: false,
    defaultFinApplicationStages: [],
    isLoadingDefaultFinApplicationStages: false,
    deliveryTypes: [],
    isLoadingDeliveryTypes: false,
    kinds: [],
    isLoadingKinds: false,
    selectedFinApplicationForm: null,
    isLoadingFinApplicationForm: false,
    contract: null,
    isLoadingContract: false,
    isSavingContract: false,
    deliveryInfo: null,
    isLoadingDeliveryInfo: false,
    isSavingDeliveryInfo: false,
    createdFinApplicationPersonForms: [],
    finApplicationPersons: null,
    isLoadingFinApplicationPersons: false,
    isCreatingFinApplicationPerson: false,
    isProcessingFinApplicationForm: false,
    savingFinApplicationPersonForms: 0,
    deletingFinApplicationPersonForms: 0,
    isSendingForSigningFinApplication: false,
    savingSignsFinApplication: 0,
    redirectToFinApplicationProcessedView: false,
    redirectToRoot: false,
    isLoadingContactInfo: false,
    contactInfo: null,
    isSavingContactInfo: false,
    isSavingFinApplicationForm: false,
    isLoadingApplicationChanges: false,
    applicationChanges: [],
    isLoadingContractChanges: false,
    contractChanges: [],
    finApplicationCreatingErrorMessage: null,
};
