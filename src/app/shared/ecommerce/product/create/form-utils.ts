import { z } from 'zod';

export const customFields = [
  {
    label: '',
    value: '',
  },
];
export const locationShipping = [
  {
    name: '',
    shippingCharge: '',
  },
];
export const productVariants = [
  {
    label: '',
    value: '',
  },
];

export const sizeFields = [
  {
    name: '',
    value: '',
  },
];

export const colorFields = [
  {
    name: '',
    value: '',
  },
];

export const colorName = []
export const sizeName = []

// export function defaultValues(product?: CreateProductInput) {
//   return {
//     title: product?.title ?? '',
//     sku: product?.sku ?? '',
//     type: product?.type ?? '',
//     categories: product?.categories ?? '',
//     description: product?.description ?? '',
//     price: product?.price ?? '',
//     costPrice: product?.costPrice ?? '',
//     retailPrice: product?.retailPrice ?? '',
//     salePrice: product?.salePrice ?? '',
//     inventoryTracking: product?.inventoryTracking ?? '',
//     currentStock: product?.currentStock ?? '',
//     lowStock: product?.lowStock ?? '',
//     productAvailability: product?.productAvailability ?? '',
//     tradeNumber: product?.tradeNumber ?? '',
//     manufacturerNumber: product?.manufacturerNumber ?? '',
//     brand: product?.brand ?? '',
//     upcEan: product?.upcEan ?? '',
//     customFields:
//       product?.customFields.length === 0 ? customFields : product?.customFields,

//     freeShipping: product?.freeShipping ?? false,
//     shippingPrice: product?.shippingPrice ?? '',
//     locationBasedShipping: product?.locationBasedShipping ?? false,
//     locationShipping:
//       product?.locationShipping.length === 0
//         ? locationShipping
//         : product?.locationShipping,
//     pageTitle: product?.pageTitle ?? '',
//     metaDescription: product?.metaDescription ?? '',
//     metaKeywords: product?.metaKeywords ?? '',
//     productUrl: product?.productUrl ?? '',
//     isPurchaseSpecifyDate: product?.isPurchaseSpecifyDate ?? false,
//     isLimitDate: product?.isLimitDate ?? false,
//     dateFieldName: product?.dateFieldName ?? '',
//     productVariants:
//       product?.productVariants.length === 0
//         ? productVariants
//         : product?.productVariants,
//     tags: product?.tags ?? [],
//   };
// }


export const explainImageUrl = {
  imageName: '',
  imageUrl: ''
}
export const thumbnailsImageUrl = {
  imageName: '',
  imageUrl: ''
}
export const mainImageUrl = {
  imageName: '',
  imageUrl: ''
}

export function defaultValues(product?: CreateProductGentleInput) {
  return {
    productName: '',
    productPrice: '',
    parentCategoryName: '',
    childCategoryName: '',
    sizeName: [],
    colorName: [],
  };
}

export const productFormData = z.object({
  productName: z.string().min(1, { message: '필수 입력 값입니다.' }),
  productPrice: z.string().min(1, { message: '필수 입력 값입니다.' }),
  parentCategoryName: z.string().min(1, { message: '필수 입력 값입니다.' }),
  childCategoryName: z.string().optional(),
  sizeName: z.array(z.string()).optional(),
  colorName: z.array(z.string()).optional(),
})

// export const productFormSchema = z.object({
//   title: z.string().min(1, { message: 'This field is required' }),
//   sku: z.string().optional(),
//   type: z.string().min(1, { message: 'This field is required' }),
//   categories: z.string().min(1, { message: 'This field is required' }),
//   description: z.string().optional(),
//   price: z
//     .number()
//     .min(0, { message: 'This field is required' })
//     .or(z.string().min(1, { message: 'This field is required' })),
//   costPrice: z.number().optional().or(z.string().optional()),
//   retailPrice: z
//     .number()
//     .min(0, { message: 'This field is required' })
//     .or(z.string().min(1, { message: 'This field is required' })),
//   salePrice: z
//     .number()
//     .min(0, { message: 'This field is required' })
//     .or(z.string().min(1, { message: 'This field is required' })),
//   inventoryTracking: z.string().optional(),
//   currentStock: z.number().or(z.string()).optional(),
//   lowStock: z.number().or(z.string()).optional(),
//   productAvailability: z.string().optional(),
//   tradeNumber: z.number().or(z.string()).optional(),
//   manufacturerNumber: z.number().or(z.string()).optional(),
//   brand: z.string().min(1, { message: 'This field is required' }),
//   upcEan: z.number().or(z.string()).optional(),
//   customFields: z.array(
//     z.object({
//       label: z.string().optional(),
//       value: z.string().optional(),
//     })
//   ),

//   freeShipping: z.boolean().optional(),
//   shippingPrice: z
//     .number()
//     .min(0, { message: 'This field is required' })
//     .or(z.string().min(1, { message: 'This field is required' })),
//   locationBasedShipping: z.boolean().optional(),
//   locationShipping: z.array(
//     z.object({
//       name: z.string().optional(),
//       shippingCharge: z.number().or(z.string()).optional(),
//     })
//   ),
//   pageTitle: z.string().min(1, { message: 'This field is required' }),
//   metaDescription: z.string().min(1, { message: 'This field is required' }),
//   metaKeywords: z.string().min(1, { message: 'This field is required' }),
//   productUrl: z.string().min(1, { message: 'This field is required' }),
//   isPurchaseSpecifyDate: z.boolean().optional(),
//   isLimitDate: z.boolean().optional(),
//   dateFieldName: z.string().optional(),
//   availableDate: z.date().min(new Date('1900-01-01')).optional(),
//   endDate: z.date().min(new Date('1900-01-02')).optional(),
//   productVariants: z.array(
//     z.object({
//       name: z.string().optional(),
//       value: z.string().optional(),
//     })
//   ),
//   tags: z.array(z.string()).optional(),
// });

// export type CreateProductInput = z.infer<typeof productFormSchema>;
export type CreateProductGentleInput = z.infer<typeof productFormData>;

export const menuItems = [
  {
    label: 'Summary',
    value: 'summary',
  },
  {
    label: 'Images & Gallery',
    value: 'images_gallery',
  },
  {
    label: 'Pricing & Inventory',
    value: 'pricing_inventory',
  },
  {
    label: 'Product Identifiers & Custom Fields',
    value: 'product_identifiers',
  },
  {
    label: 'Shipping & Availability',
    value: 'shipping_availability',
  },
  {
    label: 'SEO',
    value: 'seo',
  },
  {
    label: 'Variant Options',
    value: 'variant_options',
  },
];

// 종류카테고리
export const typeOption = [
  {
    value: 'physical product',
    name: '전체',
  },
  {
    value: 'physical product',
    name: '신상',
  },
  {
    value: 'physical product',
    name: '아우터',
  },
  {
    value: 'physical product',
    name: '원피스',
  },
  {
    value: 'physical product',
    name: '티셔츠',
  },
  {
    value: 'physical product',
    name: '신발',
  },
  {
    value: 'physical product',
    name: '커플옷',
  },
  {
    value: 'physical product',
    name: '기타',
  },
];

// 소재 카테고리
export const categoryOption = [
  {
    value: 'categoryOption',
    name: '전체',
  },
  {
    value: 'categoryOption',
    name: '후드',
  },
  {
    value: 'categoryOption',
    name: '패딩',
  },
  {
    value: 'categoryOption',
    name: '자켓',
  },
  {
    value: 'categoryOption',
    name: '면',
  },
  {
    value: 'categoryOption',
    name: '나일론',
  },
];

export const sizeOption = [
  {
    value: 'fruits',
    name: '핑크',
  },
  {
    value: 'grocery',
    name: '노랑',
  },
  {
    value: 'meat',
    name: '초록',
  },
  {
    value: 'cat food',
    name: '파랑',
  },
];

export const colorOption = [
  {
    value: 'fruits',
    name: '핑크',
  },
  {
    value: 'grocery',
    name: '노랑',
  },
  {
    value: 'meat',
    name: '초록',
  },
  {
    value: 'cat food',
    name: '파랑',
  },
];

// Variant option
export const variantOption1 = [
  {
    value: 'single',
    name: '빨',
  },
  {
    value: 'multiple',
    name: '주',
  },
  {
    value: 'multiple',
    name: '노',
  },
  {
    value: 'multiple',
    name: '초',
  },
  {
    value: 'multiple',
    name: '파',
  },
  {
    value: 'multiple',
    name: '남',
  },
  {
    value: 'multiple',
    name: '보',
  }
];

export const variantOption2 = [
  {
    value: 'single',
    name: 'xs',
  },
  {
    value: 'multiple',
    name: 's',
  },
  {
    value: 'multiple',
    name: 'm',
  },
  {
    value: 'multiple',
    name: 'l',
  },
  {
    value: 'multiple',
    name: 'xl',
  },
  {
    value: 'multiple',
    name: 'xxl',
  },
];
