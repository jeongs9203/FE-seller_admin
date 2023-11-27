export interface SellerSignUpType {
    vendorEmail: string,
    businessNumber: string,
    password: string,
    confirmPassword: string,
    mailOrderNumber: string,
    brandName: string,
    brandLogoImageUrl: string,
    brandContent: string,
    homepageUrl: string,
    businessType: string,
    companyName: string,
    companyAddress: string,
    openedAt: Date,
    vendorName: string,
    callCenterNumber: string,
    managerName: string,
    managerPhoneNumber: string
}

export interface SellerLoginType {
    sellerEmail: string;
    sellerPassword: string;
}

export interface SellerFindIdType {
    sellerEmail: string;
    phoneNumber: string;
}

export interface SellerFindPasswordType {
    sellerEmail: string;
}

export interface SellerStatisticType {
    sellerId: number;
    sellerName: string;
    sellerEmail: string;
    salesCount: number;
    salesPrice: number;
    salesDate: Date;
    totalFee: number;
    totalFavorite: number;
}

export interface SellerMypageModefyType {
    sellerEmail: string;
    businessNumber: string;
    mailOrderNumber: string;
    brandName: string;
    brandLogoImageUrl: string;
    homepageUrl: string;
    businessType: string;
    companyName: string;
    companyAddress: string;
    sellerName: string;
    callCenterNumber: string;
    managerName: string;
    mansgerPhoneNumber: string;
}

export interface SellerMainType {
    sellerId: number;
    sellerName: string;
    sellerEmail: string;
    salesCount: number;
    salesPrice: number;
    salesDate: Date;
    totalFee: number;
    totalFavorite: number;
    settlementAmount: number;
    expectedSettlementAmount: number;
}