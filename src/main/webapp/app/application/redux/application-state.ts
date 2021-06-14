import {ApplicationMessage} from '../../shared/domain/ApplicationMessage';
import {
    FinApplication,
    FinApplicationFilter,
} from '../models/fin-application.model';
import {ContactInfo, DeliveryInfo, ExternalChange} from '../models/general.model';
import {DeliveryType} from '../models/references.model';
import {Product, ProductsFilter} from "../models/product.model";

export interface ApplicationState {
    applicationMessage: ApplicationMessage;
    applicationToastMessage: ApplicationMessage;
    isCreatingFinApplication: boolean;
    isLoadingFinApplications: boolean;
    finApplications: FinApplication[];
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
    deliveryInfo: DeliveryInfo;
    isLoadingDeliveryInfo: boolean;
    isSavingDeliveryInfo: boolean;
    createdFinApplicationPersonForms: string[];
    isProcessingFinApplicationForm: boolean;
    redirectToFinApplicationProcessedView: boolean;
    redirectToRoot: boolean;
    isSavingFinApplicationForm: boolean;
    finApplicationCreatingErrorMessage: ApplicationMessage;
    isLoadingProducts: boolean;
    products: Product[];
    isLoadingProduct: boolean;
    selectedProduct: Product;
    productsFilter: ProductsFilter
}

export const initialState: ApplicationState = {
    applicationMessage: null,
    applicationToastMessage: null,
    isCreatingFinApplication: false,
    isLoadingFinApplications: false,
    finApplications: null,
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
    deliveryInfo: null,
    isLoadingDeliveryInfo: false,
    isSavingDeliveryInfo: false,
    createdFinApplicationPersonForms: [],
    isProcessingFinApplicationForm: false,
    redirectToFinApplicationProcessedView: false,
    redirectToRoot: false,
    isSavingFinApplicationForm: false,
    finApplicationCreatingErrorMessage: null,
    isLoadingProducts: false,
    products: [],
    isLoadingProduct: false,
    selectedProduct: null,
    productsFilter: null,
};
