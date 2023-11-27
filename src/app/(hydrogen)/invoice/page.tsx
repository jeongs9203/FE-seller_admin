import Link from 'next/link';
import { routes } from '@/config/routes';
import { Button } from '@/components/ui/button';
import PageHeader from '@/app/shared/page-header';
import InvoiceTable from '@/app/shared/invoice/invoice-list/table';
import { PiPlusBold } from 'react-icons/pi';
// import { invoiceData } from '@/data/invoice-data';
import { exportToCSV } from '@/utils/export-to-csv';
import ExportButton from '@/app/shared/export-button';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';
import { SellerSettlementDailyType } from 'types/responseData';

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

async function getInvoiceData() {

  const session = await getServerSession(authOptions)
  let toDay = new Date()
  toDay.setDate(toDay.getDate() - 1)
  const myDate = toDay.toISOString().slice(0,10)
  console.log(session?.user.accessToken)
  console.log(session?.user.vendorEmail)
  console.log(myDate)
  if(!session) return;
  const res = await fetch(`${process.env.BASE_API_URL}api/v1/settlement/daily?date=${myDate}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session?.user.accessToken}`,
      'vendorEmail' : session?.user.vendorEmail
    },
  
  });
  const data = await res.json();
  console.log(data)
  return data;

}

const InvoiceListPage = async () => {

  const invoiceData:any = await getInvoiceData();
  if(!invoiceData) return;
  const myData:SellerSettlementDailyType = invoiceData.result

  // function handleExportData() {
  //   exportToCSV(
  //     invoiceData,
  //     'dailySettlementAmount,dailyCommissionAmount,Username,Avatar,Email,Due Date,Amount,Status,Created At',
  //     'invoice_data'
  //   );
  // }

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          {/* <ExportButton onClick={() => handleExportData()} /> */}
          <Link href={routes.invoice.create} className="w-full @lg:w-auto">
          </Link>
        </div>
      </PageHeader>

      <InvoiceTable resData={myData} />
    </>
  );
}

export default InvoiceListPage;