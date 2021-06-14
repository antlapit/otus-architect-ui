import {ApplicationActionsUnion, FinApplicationReferencesTypes, FinApplicationTypes, MessageTypes,} from './../actions';
import {ApplicationState, initialState} from './../application-state';
import {ProductTypes} from "../actions/product.action";

export function reducer(state: ApplicationState = initialState, action: ApplicationActionsUnion): ApplicationState {
    switch (action.type) {
        case MessageTypes.HandleMessage: {
            return {
                ...state,
                applicationMessage: action.payload,
            };
        }
        case MessageTypes.HandleToastMessage: {
            return {
                ...state,
                applicationToastMessage: action.payload,
            };
        }
        case FinApplicationTypes.GetFinApplicationList: {
            return {
                ...state,
                isLoadingFinApplications: true,
            };
        }
        case FinApplicationTypes.HandleFinApplicationList: {
            if (action.response.success) {
                return {
                    ...state,
                    isLoadingFinApplications: false,
                    finApplications: !action.response.data.items ? [] : action.response.data.items
                };
            } else {
                return {
                    ...state,
                    isLoadingFinApplications: false,
                    applicationToastMessage: action.response.message
                };
            }
        }
        case FinApplicationTypes.ChangeFinApplicationFilter: {
            return {
                ...state,
                finApplicationsFilter: action.payload
            };
        }
        case ProductTypes.GetProductList: {
            return {
                ...state,
                isLoadingProducts: true,
            };
        }
        case ProductTypes.HandleProductList: {
            if (action.response.success) {
                return {
                    ...state,
                    isLoadingProducts: false,
                    products: !action.response.data ? [] : action.response.data.items
                };
            } else {
                return {
                    ...state,
                    isLoadingProducts: false,
                    applicationToastMessage: action.response.message
                };
            }
        }
        case ProductTypes.ChangeProductFilter: {
            return {
                ...state,
                productsFilter: action.payload
            };
        }
        case ProductTypes.LoadProduct: {
            return {
                ...state,
                isLoadingProduct: true,
            };
        }
        case ProductTypes.HandleProduct: {
            if (action.response.success) {
                return {
                    ...state,
                    isLoadingProduct: false,
                    selectedProduct: action.response.data,
                };
            } else {
                return {
                    ...state,
                    isLoadingProduct: false,
                    applicationToastMessage: action.response.message
                };
            }
        }
        case ProductTypes.ClearProduct: {
            return {
                ...state,
                isLoadingProduct: false,
                selectedProduct: null,
            };
        }
        case FinApplicationTypes.CreateFinApplication: {
            return {
                ...state,
                isCreatingFinApplication: true,
            };
        }
        case FinApplicationTypes.HandleCreateFinApplication: {
            if (action.response.success) {
                return {
                    ...state,
                    isCreatingFinApplication: false,
                    finApplicationCreatingErrorMessage: null
                };
            } else {
                return {
                    ...state,
                    isCreatingFinApplication: false,
                    finApplicationCreatingErrorMessage: action.response.message
                };
            }
        }
        case FinApplicationTypes.LoadFinApplication: {
            return {
                ...state,
                isLoadingFinApplication: true,
            };
        }
        case FinApplicationTypes.HandleFinApplication: {
            if (action.response.success) {
                return {
                    ...state,
                    isLoadingFinApplication: false,
                    selectedFinApplication: action.response.data,
                    // tslint:disable-next-line:max-line-length
                    deliveryInfo: !!state.selectedFinApplication && state.selectedFinApplication.orderId === action.response.data.orderId ? state.deliveryInfo : null,
                };
            } else {
                return {
                    ...state,
                    isLoadingFinApplication: false,
                    applicationToastMessage: action.response.message
                };
            }
        }
        case FinApplicationTypes.ClearFinApplication: {
            return {
                ...state,
                isLoadingFinApplication: false,
                selectedFinApplication: null,
                // tslint:disable-next-line:max-line-length
                deliveryInfo: null,
            };
        }
        case FinApplicationReferencesTypes.GetFormStatuses: {
            return {
                ...state,
                isLoadingFinApplicationFormStatuses: true,
            };
        }
        case FinApplicationReferencesTypes.HandleFormStatuses: {
            if (action.response.success) {
                return {
                    ...state,
                    isLoadingFinApplicationFormStatuses: false,
                    finApplicationFormStatuses: action.response.data
                };
            } else {
                return {
                    ...state,
                    isLoadingFinApplicationFormStatuses: false,
                    finApplicationFormStatuses: []
                };
            }
        }
        case FinApplicationReferencesTypes.GetDeliveryTypes: {
            return {
                ...state,
                isLoadingDeliveryTypes: true,
            };
        }
        case FinApplicationReferencesTypes.HandleDeliveryTypes: {
            if (action.response.success) {
                return {
                    ...state,
                    isLoadingDeliveryTypes: false,
                    deliveryTypes: action.response.data
                };
            } else {
                return {
                    ...state,
                    isLoadingDeliveryTypes: false,
                    deliveryTypes: []
                };
            }
        }
        case FinApplicationTypes.LoadDeliveryInfo: {
            return {
                ...state,
                isLoadingDeliveryInfo: true,
            };
        }
        case FinApplicationTypes.HandleDeliveryInfo: {
            if (action.response.success) {
                return {
                    ...state,
                    isLoadingDeliveryInfo: false,
                    deliveryInfo: action.response.data
                };
            } else {
                return {
                    ...state,
                    isLoadingDeliveryInfo: false,
                    applicationToastMessage: action.response.message
                };
            }
        }
        case FinApplicationTypes.UpdateDeliveryInfo: {
            return {
                ...state,
                isSavingDeliveryInfo: true,
            };
        }
        case FinApplicationTypes.HandleDeliveryInfoUpdate: {
            if (action.response.success) {
                return {
                    ...state,
                    isSavingDeliveryInfo: false,
                    applicationToastMessage: {
                        severity: '',
                        summary: 'Изменения сохранены',
                        detail: ''
                    }
                };
            } else {
                return {
                    ...state,
                    isSavingDeliveryInfo: false,
                    applicationToastMessage: action.response.message
                };
            }
        }
        case FinApplicationTypes.ProcessFinApplication: {
            return {
                ...state,
                isProcessingFinApplicationForm: true,
                redirectToFinApplicationProcessedView: action.redirectToProcessedView
            };
        }
        case FinApplicationTypes.HandleProcessFinApplication: {
            if (action.response.success) {
                return {
                    ...state,
                    isProcessingFinApplicationForm: false,
                    selectedFinApplication: action.response.data
                };
            } else {
                return {
                    ...state,
                    isProcessingFinApplicationForm: false,
                    applicationToastMessage: action.response.message,
                    redirectToFinApplicationProcessedView: false
                };
            }
        }
        case FinApplicationTypes.MarkApplicationProcessed: {
            return {
                ...state,
                redirectToFinApplicationProcessedView: true,
            };
        }
        case FinApplicationTypes.ClearApplicationProcessed: {
            return {
                ...state,
                redirectToFinApplicationProcessedView: false,
            };
        }
        case FinApplicationTypes.RevokeFinApplication: {
            return {
                ...state,
                isLoadingFinApplication: true,
            };
        }
        default: {
            return state;
        }
    }
}
