'use client';

import Link from 'next/link';
import { routes } from '@/config/routes';
import { Button } from '@/components/ui/button';
import PageHeader from '@/app/shared/page-header';
import OrdersTable from '@/app/shared/ecommerce/order/order-list/table';
import { PiArrowLineDownBold, PiPlusBold } from 'react-icons/pi';
import { orderData } from '@/data/order-data';
import { exportToCSV } from '@/utils/export-to-csv';

const pageHeader = {
  title: '주문목록',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'Home',
    },
    {
      href: routes.eCommerce.orders,
      name: '주문',
    },
    {
      name: '목록',
    },
  ],
};

export default function OrdersPage() {
  function handleExportData() {
    exportToCSV(
      orderData,
      ',Name,Email,Avatar,Items,Price,Status,Created At,Updated At',
      'order_data'
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
              새 주문
            </Button>
          </Link>
        </div>
      </PageHeader>

      <OrdersTable data={orderData} />
    </>
  );
}
