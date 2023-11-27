'use client';

import Link from 'next/link';
import { routes } from '@/config/routes';
import { Button } from '@/components/ui/button';
import PageHeader from '@/app/shared/page-header';
import InvoiceTable from '@/app/shared/invoice/invoice-list/table';
import { PiPlusBold } from 'react-icons/pi';
import { invoiceData } from '@/data/invoice-data';
import { exportToCSV } from '@/utils/export-to-csv';
import ExportButton from '@/app/shared/export-button';

const pageHeader = {
  title: '일일정산',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'Home',
    },
    {
      href: routes.invoice.home,
      name: '정산',
    },
    {
      name: '내역',
    },
  ],
};

export default function InvoiceListPage() {
  function handleExportData() {
    exportToCSV(
      invoiceData,
      'ID,Name,Username,Avatar,Email,Due Date,Amount,Status,Created At',
      'invoice_data'
    );
  }

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ExportButton onClick={() => handleExportData()} />
          <Link href={routes.invoice.create} className="w-full @lg:w-auto">
          </Link>
        </div>
      </PageHeader>

      <InvoiceTable data={invoiceData} />
    </>
  );
}