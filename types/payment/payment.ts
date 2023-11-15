export interface PaymentType {
    paymentKey:string;
    paymentMethod:string;
    paymentStatus:string;
    paymentTotalAmount:number;
    isPartial:boolean;
    receiptUrl:string;
    requestedAt:string;
    approvedAt:string;
}

export interface PaymentCancelType {
    cancelAmount:number;
    transactionKey:string;
    receiptKey:string;
    paymentKey:string;
    canceledAt:string;
}
