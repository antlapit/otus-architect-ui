import {DeliveryInfo} from "./general.model";

export class CreateFinApplicationRequest {
    constructor(
    ) {}
}

export class FinApplicationFilter {
    constructor(
        public orderId?: string[],
        public status?: string[],
        public dateFrom?: string,
        public dateTo?: string,
        public totalFrom?: string,
        public totalTo?: string,
        public datePickerType?: string,
    ) {}
}

export class FinApplication {
    constructor(
        public orderId?: string,
        public status?: string,
        public date?: string,
        public deliveryConfirmed?: string,
        public warehouseConfirmed?: string,
        public total?: string,
        public userId?: string,
        public items?: {
            items: OrderItem[]
        },
        public delivery?: DeliveryInfo,
        public billing?: BillingInfo,
    ) {
    }
}

export class OrderItem {
    constructor(
        public basePrice?: string,
        public calcPrice?: string,
        public itemId?: number,
        public productId?: number,
        public quantity?: number,
        public total?: string
    ) {
    }
}
export class BillingInfo {
    constructor(
    ) {
    }
}
