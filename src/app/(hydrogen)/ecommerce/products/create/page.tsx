import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import CreateProduct from '@/app/shared/ecommerce/product/create';
import { CreateProductGentleInput } from '@/app/shared/ecommerce/product/create/form-utils';

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
  
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <CreateProduct />
    </>
  );
}
