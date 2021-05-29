export class DeliveryType {
    constructor(
        public value?: string,
        public title?: string,
        public addressRequired?: boolean,
        public validateFio?: boolean,
        public defaultValue?: string,
        public displayValue?: string) {}
}
