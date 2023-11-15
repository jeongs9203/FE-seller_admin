import CreateCategory from '@/app/shared/ecommerce/category/create-category';
import PageHeader from '@/app/shared/page-header';
import { Button } from '@/components/ui/button';
import { routes } from '@/config/routes';
import Link from 'next/link';

const pageHeader = {
  title: '카테고리 등록',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'Home',
    },
    {
      href: routes.eCommerce.categories,
      name: '카테고리',
    },
    {
      name: '등록',
    },
  ],
};

export default function CreateCategoryPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Link
          href={routes.eCommerce.categories}
          className="mt-4 w-full @lg:mt-0 @lg:w-auto"
        >
          <Button tag="span" className="w-full @lg:w-auto" variant="outline">
            Cancel
          </Button>
        </Link>
      </PageHeader>
      <CreateCategory />
    </>
  );
}
