import {MessageActionUnion} from './message.actions';
import {FinApplicationActionUnion} from './fin-application.action';
import {FinApplicationReferencesActionUnion} from './fin-application-references.action';
import {ProductActionUnion} from "./product.action";

export * from './message.actions';
export * from './fin-application.action';
export * from './fin-application-references.action';

export type ApplicationActionsUnion =
    | MessageActionUnion
    | FinApplicationActionUnion
    | FinApplicationReferencesActionUnion
    | ProductActionUnion;
