import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import ProductDetails from '@/app/shared/ecommerce/product/product-details';

export default function ProductDetailsPage({ params }: any) {
  const pageHeader = {
    title: '상품상세',
    breadcrumb: [
      {
        href: routes.eCommerce.dashboard,
        name: 'Home',
      },
      {
        href: routes.eCommerce.shop,
        name: 'product',
      },
      {
        name: params.id,
      },
    ],
  };
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <ProductDetails />
    </>
  );
}
