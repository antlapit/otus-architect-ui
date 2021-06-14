export class Stage {
    constructor(
        public code?: string,
        public name?: string,
        public message?: string,
        public extCode?: string,
        public extName?: string,
        public numCode?: number,
        public final?: boolean,
        public error?: boolean,
        public success?: boolean
    ) {}
}

export class Status {
    constructor(
        public message?: string,
        public forceMessage?: boolean,
        public extCode?: string,
        public extName?: string,
        public numCode?: number
    ) {}
}

export class DeliveryInfo {
    constructor(
        public address?: string,
        public date?: string) {}
}

export class AppCommunication {
    constructor(
        public id?: string,
        public communicationTypeId?: string,
        public value?: string
    ) {
    }
}

export class AppAddress {
    constructor(
        public id?: string,
        public addressTypeId?: string,
        public value?: string
    ) {
    }
}

export class PersonForm {
    constructor(
        public id?: string,
        public name?: string,
        public inn?: string,
        public birthDate?: string,
        public placeOfBirth?: string,
        public series?: string,
        public number?: string,
        public issueDate?: string,
        public issuedBy?: string,
        public codeDivision?: string,
        public roleId?: string,
        public percent?: string,
        public resident?: boolean,
        public externalId?: string,
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
        public phone?: AppCommunication,
        public mail?: AppCommunication,
        public regAddress?: AppAddress,
        public factAddress?: AppAddress,
        public equalAddress?: boolean,
        public migrationCardPresented?: boolean,
        public visaPresented?: boolean,
        public regDocumentTypeId?: string,
        public visaDocumentTypeId?: string
    ) {
    }
}

export class ContactInfo {
    constructor(
        public id?: string,
        public name?: string,
        public phone?: AppCommunication,
        public mail?: AppCommunication
    ) {
    }
}

export class ExternalChange {
    constructor(
        public id?: string,
        public number?: string,
        public stage?: string,
        public status?: string
    ) {
    }
}
