import { Button } from '@/components/ui/button';
import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import Link from 'next/link';
import OrderView from '@/app/shared/ecommerce/order/order-view';

export default function OrderDetailsPage({ params }: any) {
  const pageHeader = {
    title: `주문상세 #${params.id}`,
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
        name: params.id,
      },
    ],
  };
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Link
          href={routes.eCommerce.editCategory(params.id)}
          className="mt-4 w-full @lg:mt-0 @lg:w-auto"
        >
          <Button
            tag="span"
            className="w-full @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
          >
            주문수정
          </Button>
        </Link>
      </PageHeader>
      <OrderView />
    </>
  );
}
