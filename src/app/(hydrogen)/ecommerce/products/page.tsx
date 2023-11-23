import Link from 'next/link';
import { routes } from '@/config/routes';
import { Button } from '@/components/ui/button';
import PageHeader from '@/app/shared/page-header';
import ProductsTable from '@/app/shared/ecommerce/product/product-list/table';
import { PiArrowLineDownBold, PiPlusBold } from 'react-icons/pi';
import { productsData } from '@/data/products-data';
import { exportToCSV } from '@/utils/export-to-csv';
import { ProductSizeType } from 'types/responseData';
import { useEffect, useState } from 'react';
import { productListType } from 'types/product/product';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';

const pageHeader = {
  title: '상품목록',
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

async function getAdminProductDatas() {
  const session = await getServerSession(authOptions);
  console.log(session?.user?.accessToken)
  const response = await fetch('https://gentledog-back.duckdns.org/api/v1/vendor-product/vendor-products'
  ,{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session?.user?.accessToken}`,
      'email' : `${session?.user?.email}`
    }
  
  });
  const data:any = await response.json() as any;
  console.log(data.result);
  return data.result;
}

export default async function ProductsPage() {

  const productsData = await getAdminProductDatas();
  
  // function handleExportData() {
  //   exportToCSV(
  //     productsData,
  //     'vendorEmail, productName, productPrice, brandName, brandLogoUrl, categoryCode, sizeCodeId, colorCodeId, mainImageUsed, imageUrl, thumbnailImageUsed, salesCount, productCode, productId, discount, discountType,',
  //     'product_data'
  //   );
  // }

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <Button
            variant="outline"
            className="w-full @lg:w-auto"
            // onClick={() => handleExportData()}
          >
            <PiArrowLineDownBold className="me-1.5 h-[17px] w-[17px]" />
            다운로드
          </Button>
          <Link
            href={routes.eCommerce.createProduct}
            className="w-full @lg:w-auto"
          >
            <Button
              tag="span"
              className="w-full @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
            >
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              상품등록
            </Button>
          </Link>
        </div>
      </PageHeader>
      {
        productsData && productsData.length > 0 ? (<ProductsTable data={productsData} />) : null
      }
      
    </>
  );
}