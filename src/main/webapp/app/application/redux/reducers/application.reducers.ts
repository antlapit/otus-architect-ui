import {ApplicationActionsUnion, FinApplicationReferencesTypes, FinApplicationTypes, MessageTypes,} from './../actions';
import {ApplicationState, initialState} from './../application-state';

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
                    finApplications: !action.response.data ? [] : action.response.data.content
                };
            } else {
                return {
                    ...state,
                    isLoadingFinApplications: false,
                    applicationToastMessage: action.response.message
                };
            }
        }
        case FinApplicationTypes.GetFinApplicationCounters: {
            return {
                ...state,
                isLoadingFinApplicationCounters: true,
            };
        }
        case FinApplicationTypes.HandleFinApplicationCounters: {
            if (action.response.success) {
                return {
                    ...state,
                    isLoadingFinApplicationCounters: false,
                    finApplicationCounters: action.response.data
                };
            } else {
                return {
                    ...state,
                    isLoadingFinApplicationCounters: false,
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
                    selectedFinApplicationForm: !!state.selectedFinApplication && state.selectedFinApplication.id === action.response.data.id ? state.selectedFinApplicationForm : null,
                    // tslint:disable-next-line:max-line-length
                    contract: !!state.selectedFinApplication && state.selectedFinApplication.id === action.response.data.id ? state.contract : null,
                    // tslint:disable-next-line:max-line-length
                    deliveryInfo: !!state.selectedFinApplication && state.selectedFinApplication.id === action.response.data.id ? state.deliveryInfo : null,
                    // tslint:disable-next-line:max-line-length
                    contactInfo: !!state.selectedFinApplication && state.selectedFinApplication.id === action.response.data.id ? state.contactInfo : null,
                    // tslint:disable-next-line:max-line-length
                    finApplicationPersons: !!state.selectedFinApplication && state.selectedFinApplication.id === action.response.data.id ? state.finApplicationPersons : null, // очистка ФЛ при смене заявки
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
                selectedFinApplicationForm: null,
                // tslint:disable-next-line:max-line-length
                contract: null,
                // tslint:disable-next-line:max-line-length
                deliveryInfo: null,
                // tslint:disable-next-line:max-line-length
                contactInfo: null,
                // tslint:disable-next-line:max-line-length
                finApplicationPersons: null, // очистка ФЛ при смене заявки
            };
        }
        case FinApplicationTypes.LoadFinApplicationPrototypes: {
            return {
                ...state,
                isLoadingFinApplicationPrototypes: true,
            };
        }
        case FinApplicationTypes.HandleFinApplicationPrototypes: {
            if (action.response.success) {
                return {
                    ...state,
                    isLoadingFinApplicationPrototypes: false,
                    finApplicationPrototypes: action.response.data
                };
            } else {
                return {
                    ...state,
                    isLoadingFinApplicationPrototypes: false,
                    finApplicationPrototypes: []
                };
            }
        }
        case FinApplicationTypes.GetFinApplicationPrototype: {
            return {
                ...state,
                isLoadingFinApplicationPrototypes: true,
            };
        }
        case FinApplicationTypes.HandleGetFinApplicationPrototype: {
            if (action.response.success) {
                return {
                    ...state,
                    isLoadingFinApplicationPrototypes: false,
                    finApplicationPrototypes: [action.response.data]
                };
            } else {
                return {
                    ...state,
                    isLoadingFinApplicationPrototypes: false,
                    finApplicationPrototypes: []
                };
            }
        }
        case FinApplicationTypes.ClearFinApplicationPrototypes: {
            return {
                ...state,
                isLoadingFinApplicationPrototypes: false,
                finApplicationPrototypes: []
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
        case FinApplicationReferencesTypes.GetStageGroups: {
            return {
                ...state,
                isLoadingFinApplicationStageGroups: true,
            };
        }
        case FinApplicationReferencesTypes.HandleStageGroups: {
            if (action.response.success) {
                return {
                    ...state,
                    isLoadingFinApplicationStageGroups: false,
                    finApplicationStageGroups: action.response.data
                };
            } else {
                return {
                    ...state,
                    isLoadingFinApplicationStageGroups: false,
                    finApplicationStageGroups: []
                };
            }
        }
        case FinApplicationReferencesTypes.GetDefaultStages: {
            return {
                ...state,
                isLoadingDefaultFinApplicationStages: true,
            };
        }
        case FinApplicationReferencesTypes.HandleDefaultStages: {
            if (action.response.success) {
                return {
                    ...state,
                    isLoadingDefaultFinApplicationStages: false,
                    defaultFinApplicationStages: action.response.data
                };
            } else {
                return {
                    ...state,
                    isLoadingDefaultFinApplicationStages: false,
                    defaultFinApplicationStages: []
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
        case FinApplicationReferencesTypes.GetKinds: {
            return {
                ...state,
                isLoadingKinds: true,
            };
        }
        case FinApplicationReferencesTypes.HandleKinds: {
            if (action.response.success) {
                return {
                    ...state,
                    isLoadingKinds: false,
                    kinds: action.response.data
                };
            } else {
                return {
                    ...state,
                    isLoadingKinds: false,
                    kinds: []
                };
            }
        }
        case FinApplicationTypes.LoadFinApplicationForm: {
            return {
                ...state,
                isLoadingFinApplicationForm: true,
            };
        }
        case FinApplicationTypes.HandleFinApplicationForm: {
            if (action.response.success) {
                return {
                    ...state,
                    isLoadingFinApplicationForm: false,
                    selectedFinApplicationForm: action.response.data
                };
            } else {
                return {
                    ...state,
                    isLoadingFinApplicationForm: false,
                    applicationToastMessage: action.response.message
                };
            }
        }
        case FinApplicationTypes.LoadContract: {
            return {
                ...state,
                isLoadingContract: true,
            };
        }
        case FinApplicationTypes.HandleContract: {
            if (action.response.success) {
                return {
                    ...state,
                    isLoadingContract: false,
                    contract: action.response.data
                };
            } else {
                return {
                    ...state,
                    isLoadingContract: false,
                    applicationToastMessage: action.response.message
                };
            }
        }
        case FinApplicationTypes.UpdateContract: {
            return {
                ...state,
                isSavingContract: true,
            };
        }
        case FinApplicationTypes.HandleContractUpdate: {
            if (action.response.success) {
                return {
                    ...state,
                    isSavingContract: false,
                    applicationToastMessage: {
                        severity: '',
                        summary: 'Изменения сохранены',
                        detail: ''
                    }
                };
            } else {
                return {
                    ...state,
                    isSavingContract: false,
                    applicationToastMessage: action.response.message
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
        case FinApplicationTypes.LoadFinApplicationPersonContainer: {
            return {
                ...state,
                isLoadingFinApplicationPersons: true,
            };
        }
        case FinApplicationTypes.HandleFinApplicationPersonContainer: {
            if (action.response.success) {
                return {
                    ...state,
                    isLoadingFinApplicationPersons: false,
                    finApplicationPersons: action.response.data
                };
            } else {
                return {
                    ...state,
                    isLoadingFinApplicationPersons: false,
                    applicationToastMessage: action.response.message
                };
            }
        }
        case FinApplicationTypes.CreateBeneficiaryForm: {
            return {
                ...state,
                isCreatingFinApplicationPerson: true,
            };
        }
        case FinApplicationTypes.HandleCreateBeneficiaryForm: {
            if (action.response.success) {
                return {
                    ...state,
                    isCreatingFinApplicationPerson: false,
                    createdFinApplicationPersonForms: state.createdFinApplicationPersonForms.concat(action.response.data.id),
                    finApplicationPersons: {
                        ...state.finApplicationPersons,
                        beneficiaries: state.finApplicationPersons.beneficiaries.concat(action.response.data)
                    }
                };
            } else {
                return {
                    ...state,
                    isCreatingFinApplicationPerson: false,
                    applicationToastMessage: action.response.message
                };
            }
        }
        case FinApplicationTypes.DeleteBeneficiaryForm: {
            return {
                ...state,
                deletingFinApplicationPersonForms: state.deletingFinApplicationPersonForms + 1,
            };
        }
        case FinApplicationTypes.HandleDeleteBeneficiaryForm: {
            if (action.response.success) {
                return {
                    ...state,
                    deletingFinApplicationPersonForms: state.deletingFinApplicationPersonForms - 1,
                    applicationToastMessage: state.deletingFinApplicationPersonForms === 1 ? {
                        severity: '',
                        summary: 'Анкета удалена',
                        detail: ''
                    } : null,
                    finApplicationPersons: {
                        ...state.finApplicationPersons,
                        beneficiaries: state.finApplicationPersons.beneficiaries.filter(value => value.id !== action.response.data)
                    }
                };
            } else {
                return {
                    ...state,
                    deletingFinApplicationPersonForms: state.deletingFinApplicationPersonForms - 1,
                    applicationToastMessage: action.response.message
                };
            }
        }
        case FinApplicationTypes.SaveFinApplication: {
            return {
                ...state,
                isProcessingFinApplicationForm: !action.silent,
                redirectToRoot: action.redirectToRoot,
            };
        }
        case FinApplicationTypes.HandleSaveFinApplication: {
            if (action.response.success) {
                return {
                    ...state,
                    isProcessingFinApplicationForm: false,
                    selectedFinApplication: state.isProcessingFinApplicationForm ? action.response.data : state.selectedFinApplication,
                    applicationToastMessage: {
                        severity: '',
                        summary: 'Изменения сохранены',
                        detail: ''
                    },
                    redirectToRoot: false
                };
            } else {
                return {
                    ...state,
                    isProcessingFinApplicationForm: false,
                    redirectToRoot: false,
                    applicationToastMessage: state.isProcessingFinApplicationForm ? action.response.message : null
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
        case FinApplicationTypes.UpdateFinApplicationPersonForm: {
            return {
                ...state,
                savingFinApplicationPersonForms: state.savingFinApplicationPersonForms + 1,
            };
        }
        case FinApplicationTypes.HandleFinApplicationPersonUpdate: {
            if (action.response.success) {
                return {
                    ...state,
                    savingFinApplicationPersonForms: state.savingFinApplicationPersonForms - 1,
                    applicationToastMessage: state.savingFinApplicationPersonForms === 1 ? {
                        severity: '',
                        summary: 'Изменения сохранены',
                        detail: ''
                    } : null
                };
            } else {
                return {
                    ...state,
                    savingFinApplicationPersonForms: state.savingFinApplicationPersonForms - 1,
                    applicationToastMessage: action.response.message
                };
            }
        }
        case FinApplicationTypes.LoadContactInfo: {
            return {
                ...state,
                isLoadingContactInfo: true,
            };
        }
        case FinApplicationTypes.HandleContactInfo: {
            if (action.response.success) {
                return {
                    ...state,
                    isLoadingContactInfo: false,
                    contactInfo: action.response.data
                };
            } else {
                return {
                    ...state,
                    isLoadingContactInfo: false,
                    applicationToastMessage: action.response.message
                };
            }
        }
        case FinApplicationTypes.UpdateContactInfo: {
            return {
                ...state,
                isSavingContactInfo: true,
            };
        }
        case FinApplicationTypes.HandleContactInfoUpdate: {
            if (action.response.success) {
                return {
                    ...state,
                    isSavingContactInfo: false,
                    applicationToastMessage: {
                        severity: '',
                        summary: 'Изменения сохранены',
                        detail: ''
                    }
                };
            } else {
                return {
                    ...state,
                    isSavingContactInfo: false,
                    applicationToastMessage: action.response.message
                };
            }
        }
        case FinApplicationTypes.UpdateFinApplicationForm: {
            return {
                ...state,
                isSavingFinApplicationForm: true,
            };
        }
        case FinApplicationTypes.HandleFinApplicationFormUpdate: {
            if (action.response.success) {
                return {
                    ...state,
                    isSavingFinApplicationForm: false,
                    applicationToastMessage: state.savingFinApplicationPersonForms === 1 ? {
                        severity: '',
                        summary: 'Изменения сохранены',
                        detail: ''
                    } : null
                };
            } else {
                return {
                    ...state,
                    isSavingFinApplicationForm: false,
                    applicationToastMessage: action.response.message
                };
            }
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
