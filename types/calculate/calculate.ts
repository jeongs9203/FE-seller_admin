export interface CalculateType {
    guestName: string;
    guestPhoneNumber: string;
    guestEmail: string;
    orderNumber: string;
    createdAt: Date;
    totalFree: number;
    paymentMethod: string;
}

export interface CalculateDetailType {
    sellerEmail: string;
    businessNumber: string;
    mailOrderNumber: string;
    brandName: string;
    brandLogoImageUrl: string;
    homepageUrl: string;
    businessType: string;
    companyName: string;
    sellerName: string;
    settlementStartDay: Date;
    settlementEndDay: Date;
    settlementstatus: number;
    settlementAmount: number;
    commissionAmount: number;
    expectedSettlement: number;
    productTotalPrice: number;
}