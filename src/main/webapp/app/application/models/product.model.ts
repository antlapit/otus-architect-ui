import {AppAddress, AppCommunication, ContactInfo, DeliveryInfo, PersonForm, Stage, Status} from './general.model';

export class ProductsFilter {
    constructor(
        public nameInfix?: string,
        public descriptionInfix?: string;
        public categoryId?: string[],
        public minPrice?: string,
        public maxPrice?: string,
    ) {}
}

export class Product {
    constructor(
        public productId?: string,
        public name?: string,
        public description?: string,
        public minPrice?: number,
        public maxPrice?: number,
        public categoryId?: string[]
    ) {
    }
}

export class ProductForm {
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
