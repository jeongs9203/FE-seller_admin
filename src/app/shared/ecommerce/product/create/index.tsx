'use client';

import { use, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Element } from 'react-scroll';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import cn from '@/utils/class-names';
import { Title, Text } from '@/components/ui/text';
import FormNav, {
  formParts,
} from '@/app/shared/ecommerce/product/create/form-nav';
import ProductSummary from '@/app/shared/ecommerce/product/create/product-summary';
import {
  productFormData,
  CreateProductGentleInput,
  defaultValues,
} from '@/app/shared/ecommerce/product/create/form-utils';
import ProductMedia from '@/app/shared/ecommerce/product/create/product-media';
import PricingInventory from '@/app/shared/ecommerce/product/create/pricing-inventory';
import ProductIdentifiers from '@/app/shared/ecommerce/product/create/product-identifiers';
import ShippingInfo from '@/app/shared/ecommerce/product/create/shipping-info';
import ProductSeo from '@/app/shared/ecommerce/product/create/product-seo';
import ProductImage from '@/app/shared/ecommerce/product/create/product-images';
import ProductVariants from '@/app/shared/ecommerce/product/create/product-variants';
import ProductTaxonomies from '@/app/shared/ecommerce/product/create/product-tags';
import FormFooter from '@/components/form-footer';
import { ProductRegistrationType } from 'types/responseData';
import { useSession } from 'next-auth/react';
import { data } from '@/app/shared/logistics/shipment/details/tracking-history';
import { productCreateImageType } from 'types/product/product';

const MAP_STEP_TO_COMPONENT = {
  [formParts.summary]: ProductSummary,
  [formParts.media]: ProductMedia,
  [formParts.pricingInventory]: PricingInventory,
  [formParts.productImg]: ProductImage,
  // [formParts.productIdentifiers]: ProductIdentifiers,
  // [formParts.shipping]: ShippingInfo,
  // [formParts.seo]: ProductSeo,
  // [formParts.deliveryEvent]: DeliveryEvent,
  [formParts.variantOptions]: ProductVariants,
  // [formParts.tagsAndCategory]: ProductTaxonomies,
};

interface IndexProps {
  id?: string;
  product?: CreateProductGentleInput;
  className?: string;
}

/**
 * 상품 등록 폼
 */
export default function CreateProduct({ id, product, className }: IndexProps) {

  const [isLoading, setLoading] = useState(false);
  const [productImage, setProductImage] = useState<productCreateImageType[]>([]);
  const [detailImage, setDetailImage] = useState<productCreateImageType[]>([]);

  const methods = useForm<CreateProductGentleInput>({
    defaultValues: defaultValues(product),
    resolver: zodResolver(productFormData),
  });
      
  const session = useSession();
  const onSubmit: SubmitHandler<CreateProductGentleInput> = () => {


    console.log("inputdata", product);
    console.log(session?.data?.user.accessToken);
    const pyaload = {
      productImage: productImage,
      detailImage: detailImage,

    }

    console.log('pyaload', pyaload);
    // fetch(`${process.env.BASE_API_URL}api/v1/product/product-create`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization' : `Bearer ${session?.data?.user.accessToken}`
    //   },
    //   body: JSON.stringify(product),
    // })
    // .then(response =>   {
    //   const contentType = response.headers.get('content-type');
      
    //   if (contentType && contentType.includes('application/json')) {
    //     return response.json();
    //   } else {
    //     throw new TypeError('Oops, we haven\'t got JSON!');
    //   }
    // })
    // .then(json => { /* process your JSON further */ })
    // .catch(error => console.error(error));
    // setLoading(true);
    // setTimeout(() => {
    //   setLoading(false);
    //   console.log('product_data', data);
    //   toast.success(
    //     <Text as="b">Product successfully {id ? 'updated' : 'created'}</Text>
    //   );
    //   methods.reset();
    // }, 600);
  };

  return (
    <div className="@container">
      <FormNav />
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className={cn('[&_label.block>span]:font-medium', className)}
          style={{ minHeight: '3000px' }}
        >
          <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
            {Object.entries(MAP_STEP_TO_COMPONENT).map(([key, Component]) => (
              <Element
                key={key}
                name={formParts[key as keyof typeof formParts]}
              >
                {
                 <Component className="pt-7 @2xl:pt-9 @3xl:pt-11" 
                  setProductImage = {setProductImage} productImage = {productImage} 
                  setDetailImage = {setDetailImage} detailImage = {detailImage}
                 /> 
                }
              </Element>
            ))}
          </div>

          <FormFooter
            isLoading={isLoading}
            submitBtnText={id ? '상품수정' : '상품등록'}
          />
        </form>
      </FormProvider>
    </div>
  );
}