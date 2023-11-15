export interface productListType {
    productId: number;
    productName: string;
    productPrice: number;
    productImage: string;
    productCategory: string;
    productStock: number;
    productMinStock: number;
    productRating: number;
    productStatus: string;
    productReviewCount: number;
}

export interface productCreateType {
    salesCount: number,
    productName: string,
    price: number,
    productCode: string,
    mainImgUrl: string,
    productImgUrl: string[],
    productExplainImgUrl: string[],  
    discount: number,
    discountType: number,
    childCategoryId: number,
    parentCategoryId: number,
    colorCodeId : number[],
    sizeId: number[],
    shippingFee: number,
    isShippingFree: boolean,
    isDisplay: number,
}

export interface productImageType {
    productImageId: number;
    productImage: string;
}

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
    loginId: string;
    salesCount: number;
    productName: string;
    price: number;
    productCode: number;
    productId: number;
    imageUrl: string;
    mainImageUsed: string;
    ImageUrl: string;
    thumbnailImageUsed: string;
    discount: number;
    discountType: number;
    categoryId: number;
    colorCodeId: number;
    sizeCodeId: number;
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