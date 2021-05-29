import {SigningActionsUnion, SigningActionTypes} from "./signing.actions";
import {ApplicationMessage} from "../../../shared/domain/ApplicationMessage";
import {SimpleDocument} from "../../../shared/domain/SimpleDocument";

export interface SigningState {
    signingMessage: ApplicationMessage
    signingToastMessage: ApplicationMessage
    isLoadingFilesForSigning: boolean;
    docsForSigning: SimpleDocument[]
    isCaptchaRequired: boolean;
    signingFiles: number;
}

export const initialState: SigningState = {
    signingMessage: null,
    signingToastMessage: null,
    isLoadingFilesForSigning: false,
    docsForSigning: [],
    isCaptchaRequired: false,
    signingFiles: 0
};

export function reducer(state: SigningState = initialState, action: SigningActionsUnion): SigningState {
    switch (action.type) {
        case SigningActionTypes.LoadFilesByCredentials: {
            return {
                ...state,
                isLoadingFilesForSigning: true
            };
        }
        case SigningActionTypes.HandleFilesByCredentials: {
            if (action.response.success) {
                return {
                    ...state,
                    isLoadingFilesForSigning: false,
                    docsForSigning: action.response.data,
                    isCaptchaRequired: false,
                    signingToastMessage: !!action.response.data && action.response.data.length === 0 ? {
                        severity: '',
                        summary: 'Файлы не найдены',
                        detail: ''
                    } : null
                };
            } else {
                return {
                    ...state,
                    isLoadingFilesForSigning: false,
                    isCaptchaRequired: true,
                    signingToastMessage: action.response.message
                };
            }
        }
        case SigningActionTypes.ClearFilesByCredentials: {
            return {
                ...state,
                isLoadingFilesForSigning: false,
                isCaptchaRequired: false,
                docsForSigning: []
            };
        }
        case SigningActionTypes.SignFileByCredentials: {
            return {
                ...state,
                signingFiles: state.signingFiles + 1,
            };
        }
        case SigningActionTypes.HandleSignFileByCredentials: {
            if (action.response.success) {
                return {
                    ...state,
                    signingFiles: state.signingFiles - 1,
                    signingToastMessage: state.signingFiles === 1 ? {
                        severity: '',
                        summary: 'Файлы подписаны',
                        detail: ''
                    } : null
                };
            } else {
                return {
                    ...state,
                    signingFiles: state.signingFiles - 1,
                    signingToastMessage: action.response.message
                };
            }
        }
        default: {
            return state;
        }
    }
}
