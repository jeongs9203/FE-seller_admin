export interface productListType {
    mainImageUrl: string;
    productName: string;
    productId: number;
    productCode: string;
    productDetailId: number;
    productDetailCode: string;
    salesCount: number;
    price: number;
    totalFavoriteCount: number
    displayStatus: string;
    salesStatus: string;
}

export interface productCreateType {
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

export interface productCreateImageType {
    imageName: string;
    imageUrl: string;
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
    discount: number;
    discountType: number;
    categoryId: number;
    registerDate: Date;
    colorCodeId: number;
    sizeCodeId: number;
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
    productCode: number;
}