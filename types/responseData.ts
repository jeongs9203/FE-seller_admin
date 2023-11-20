export interface ProductColorType {
    colorCodeId: number;
    colorName: string;
}

export interface ProductSizeType {
    sizeCodeId: number;
    sizeName: string;
}

export interface ProductCategoryType {
    categoryId: number; 
    categoryName: string;
}

export interface ProductRegistrationType {
    vendorEmail: string;
    productName: string;
    productPrice: number;
    brandName: string;
    brandLogoUrl: string;
    categoryCode: number;
    sizeCodeId: number;
    colorCodeId: number;
    mainImageUsed: string;
    imageUrl: string;
    thumbnailImageUsed: string;
    salesCount: number;
    productCode: number;
    productId: number;
    discount: number;
    discountType: number;
}

export interface ImageUploadType {
    productId: number;
    imageUrl: string;
    imageComent: string;
    mainImageUsed: string;
    thumbnailImageUsed: string;
    price: number;
}

export interface ProductModifyType {
    loginId: string;
    salesCount: number;
    productId: number;
    productName: string;
    price: number;
    productCode: number;
    imageUrl: string;
    mainImageUsed: string;
    thumbnailImageUsed: string;
    discount: number;
    discountType: number;
    categoryId: number;
    colorCodeId: number;
    sizeCodeId: number;
    updateDate: Date;
}

export interface ProductInquiryType {
    couponCount: number;
    loginId: string;
    code: number;
    productId: number; 
    productName: string;
    productCode: string;
    price: number;
    imageUrl: string;
    brandName: string;
    brandLogoUrl: string;
    mainImageUsed: string;
    discount: number;
    discountType: number;
    CategoryId: number;
    categoryName: number;
    colorCodeId: number;
    sizeCodeId: number;
}

export interface ProductDeleteType {
    productId: number;
    productCode: number;
}

export interface SellerSignUpType {
    sellerName: string;
    sellerPassword: string;
    sellerEmail: string;
    businessNumber: string;
    businessType: string;
    mailOrderNumber: string;
    brandName: string;
    brandLogoUrl: string;
    brandContent: string;
    homepageUrl: string;
    companyName: string;
    companyAddress: string;
    opendAt: Date;
    cellCenterNumber: string;
    phoneNumber: string;

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
}