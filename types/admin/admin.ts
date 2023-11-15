export interface CategoryRegistrationType {
    parentCategoryId: number;
    categoryName: string;
}

export interface CategoryInquiryType {
    categoryId: number;
    parentCategoryId: number;
    categoryName: string;
}