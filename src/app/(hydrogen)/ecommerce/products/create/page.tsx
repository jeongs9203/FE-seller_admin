'use client';
import Link from 'next/link';
import { routes } from '@/config/routes';
import { Button } from '@/components/ui/button';
import { PiPlusBold } from 'react-icons/pi';
import PageHeader from '@/app/shared/page-header';
import CreateProduct from '@/app/shared/ecommerce/product/create';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { SubmitHandler } from 'react-hook-form';
import { productCreateType } from 'types/product/product';
import { string } from 'zod/lib/types';

const pageHeader = {
  title: '상품등록',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'Home',
    },
    {
      href: routes.eCommerce.products,
      name: '상품조회',
    },
    {
      name: '등록',
    },
  ],
};

export default function CreateProductPage() {
  const [product, setProduct] = useState<any>();

  const createProduct = async () => {
    console.log('data', product);
    try {
      const response = await fetch('/api/v1/product/product-create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Link
          href={routes.eCommerce.createProduct}
          className="mt-4 w-full @lg:mt-0 @lg:w-auto"
        >
          <Button
            tag="span"
            className="w-full @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
            onClick={() => { 
              console.log('Button clicked!'); // 콘솔에 메시지를 출력합니다.
              createProduct();
            }}
          >
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            상품등록
          </Button>
        </Link>
      </PageHeader>
      <CreateProduct />
    </>
  );
}
