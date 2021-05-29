import {AppAddress, AppCommunication, ContactInfo, DeliveryInfo, PersonForm, Stage, Status} from './general.model';

export class CreateFinApplicationRequest {
    constructor(
        public clientInn?: string,
        public contractRegistryNumber?: string,
        public sourceHelperInn?: string
    ) {}
}

export class FinApplicationFilter {
    constructor(
        public query?: string,
        public stage?: string,
        public contactIds?: string[],
        public datePickerType?: string,
        public dateFrom?: string,
        public dateTo?: string,
        public limitFrom?: string,
        public limitTo?: string,
    ) {}
}

export class FinApplication {
    constructor(
        public id?: string,
        public number?: string,
        public contactId?: string,
        public contactName?: string,
        public clientName?: string,
        public clientInn?: string,
        public clientKpp?: string,
        public createdOn?: string,
        public modifiedOn?: string,
        public stage?: Stage,
        public status?: Status,
        public comment?: string,
        public lastError?: string,
        public kind?: string,
        public limit?: number,
        public startDate?: string,
        public endDate?: string,
        public rateFact?: number,
        public commission?: number,
        public formStatus?: string,
        public canRevoke?: boolean,
        public hasChanges?: boolean,
        public processing?: boolean,
        public multiplier?: boolean,
        public docsEditable?: boolean,
        public agentCommission?: number
    ) {
    }
}

export class FinApplicationForm {
    constructor(
        public id?: string,
        public name?: string,
        public inn?: string,
        public ogrn?: string,
        public ip?: boolean,
        public registrationDate?: string,
        public phone?: AppCommunication,
        public mail?: AppCommunication,
        public site?: AppCommunication,
        public regAddress?: AppAddress,
        public factAddress?: AppAddress,
        public equalAddress?: boolean,
        public birthDate?: string,
        public placeOfBirth?: string,
        public series?: string,
        public number?: string,
        public issueDate?: string,
        public issuedBy?: string,
        public codeDivision?: string,
        public resident?: boolean,
        public migrationCardSeries?: string,
        public migrationCardNumber?: string,
        public migrationCardFromDate?: string,
        public migrationCardToDate?: string,
        public migrationCardAbsenceReason?: string,
        public visaSeries?: string,
        public visaNumber?: string,
        public visaFromDate?: string,
        public visaToDate?: string,
        public visaAbsenceReason?: string,
        public citizenshipId?: string,
        public migrationCardPresented?: boolean,
        public visaPresented?: boolean,
        public regDocumentTypeId?: string,
        public visaDocumentTypeId?: string,
        public taxationSystemId?: string,
        public taxationSystemEditable?: boolean
    ) {
    }
}

export class Contract {
    constructor(
        public id?: string,
        public number?: string,
        public customerId?: string,
        public customerName?: string,
        public customerInn?: string,
        public customerRegAddress?: string,
        public customerFactAddress?: string,
        public contractObject?: string,
        public advance?: boolean,
        public lot?: string,
        public contractFillingRequired?: boolean) {}
}

export class PersonFormContainer {
    constructor(public head?: PersonForm,
                public beneficiaries: PersonForm[] = []) {}
}

export class FinApplicationCounters {
    constructor(public counters: FinApplicationStageCounter[] = []) {}
}

export class FinApplicationStageCounter {
    constructor(
        public stage?: string,
        public count?: number
    ) {}
}

export class FinApplicationProcessData {
    constructor(
        public application?: FinApplication,
        public form?: FinApplicationForm,
        public contract?: Contract,
        public contactInfo?: ContactInfo,
        public deliveryInfo?: DeliveryInfo,
        public head?: PersonForm,
        public beneficiaries?: PersonForm[]
    ) {
    }
}
