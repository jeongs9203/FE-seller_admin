'use client';

import Link from 'next/link';
import { routes } from '@/config/routes';
import { Button } from '@/components/ui/button';
import PageHeader from '@/app/shared/page-header';
import ProductsTable from '@/app/shared/ecommerce/product/product-list/table';
import { PiArrowLineDownBold, PiPlusBold } from 'react-icons/pi';
import { productsData } from '@/data/products-data';
import { exportToCSV } from '@/utils/export-to-csv';
import { productListType } from 'types/product/product';
import { use, useEffect, useState } from 'react';
import { responseDataType } from 'types/responseData';

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

export default function ProductsPage() {

  const [adminProductDatas, setAdminProductDatas] = useState<productListType[]>();

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('/api/product');
      const data:responseDataType = await response.json() as any;
      setAdminProductDatas(data.result);
    }
    getData();
  }, []);

  function handleExportData() {
    exportToCSV(
      productsData,
      'loginId, count, product_name, price, product_code, img_url, brand_name, brand_logo_url, main_img_used, thumbnail_img_used, discount, discount_type, parent_category, category_name, color, size,',
      'product_data'
    );
  }

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <Button
            variant="outline"
            className="w-full @lg:w-auto"
            onClick={() => handleExportData()}
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
      <ProductsTable data={productsData} />
    </>
  );
}