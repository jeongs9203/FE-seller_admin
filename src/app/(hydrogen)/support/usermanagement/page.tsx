import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import UsermanagementTable from '@/app/shared/support/usermanagement/table';
import HeaderAction from '../header-action';

const pageHeader = {
  title: '유저관리',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'Home',
    },
    {
      href: routes.support.dashboard,
      name: '유저',
    },
    {
      name: '관리',
    },
  ],
};

export default function SupportUsermanagementPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <HeaderAction title="template" />
      </PageHeader>
      <UsermanagementTable />
    </>
  );
}
