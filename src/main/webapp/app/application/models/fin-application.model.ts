export class CreateFinApplicationRequest {
    constructor(
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
        public orderId?: string,
        public status?: string,
    ) {
    }
}
