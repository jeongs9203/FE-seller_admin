'use client';

import dynamic from 'next/dynamic';
import { routes } from '@/config/routes';
import { Button } from '@/components/ui/button';
import PageHeader from '@/app/shared/page-header';
import { useDrawer } from '@/app/shared/drawer-views/use-drawer';
import { PiSliders } from 'react-icons/pi';
import ProductFeed from '@/app/shared/ecommerce/shop/product-feed';
const ShopFilters = dynamic(
  () => import('@/app/shared/ecommerce/shop/shop-filters'),
  {
    ssr: false,
  }
);

const pageHeader = {
  title: '후기관리',
  breadcrumb: [
    {
      name: 'Home',
    },
    {
      href: routes.eCommerce.dashboard,
      name: '후기',
    },
    {
      name: '관리',
    },
  ],
};

export default function ReviewsPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
      </PageHeader>
    </>
  );
}
