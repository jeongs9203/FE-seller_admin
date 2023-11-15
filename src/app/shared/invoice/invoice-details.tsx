import Image from 'next/image';
import { QRCodeSVG } from 'qrcode.react';
import { Badge } from '@/components/ui/badge';
import { Title, Text } from '@/components/ui/text';
import Table from '@/components/ui/table';
import { siteConfig } from '@/config/site.config';

const invoiceItems = [
  {
    id: '1',
    product: {
      title: '대형견',
      description:
        '대형견 카테고리에서 판매한 수입내역입니다',
    },
    quantity: 2,
    unitPrice: 100,
    total: 200,
  },
  {
    id: '2',
    product: {
      title: '중형견',
      description:
        '중형견 카테고리에서 판매한 수입내역입니다',
    },
    quantity: 2,
    unitPrice: 100,
    total: 200,
  },
  {
    id: '3',
    product: {
      title: '소형견',
      description:
        '소형견 카테고리에서 판매한 수입내역입니다',
    },
    quantity: 3,
    unitPrice: 100,
    total: 300,
  },
  {
    id: '4',
    product: {
      title: '수수료',
      description:
        '수수료 내역입니다',
    },
    quantity: 3,
    unitPrice: 100,
    total: 300,
  },
];

const columns = [
  {
    title: '#',
    dataIndex: 'id',
    key: 'id',
    width: 50,
  },
  {
    title: 'Item',
    dataIndex: 'product',
    key: 'product',
    width: 250,
    render: (product: any) => (
      <>
        <Title as="h6" className="mb-0.5 text-sm font-medium">
          {product.title}
        </Title>
        <Text
          as="p"
          className=" max-w-[250px] overflow-hidden truncate text-sm text-gray-500"
        >
          {product.description}
        </Text>
      </>
    ),
  },

  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
    width: 200,
  },
  {
    title: 'Unit Price',
    dataIndex: 'unitPrice',
    key: 'unitPrice',
    width: 200,
    render: (value: string) => <Text className="font-medium">￦{value}</Text>,
  },
  {
    title: 'Total',
    dataIndex: 'total',
    key: 'total',
    width: 200,
    render: (value: string) => <Text className="font-medium">￦{value}</Text>,
  },
];

function InvoiceDetailsListTable() {
  return (
    <Table
      data={invoiceItems}
      columns={columns}
      variant="minimal"
      rowKey={(record) => record.id}
      scroll={{ x: 660 }}
      className="mb-11"
    />
  );
}

export default function InvoiceDetails() {
  return (
    <div className="w-full rounded-xl border border-gray-200 p-5 text-sm sm:p-6 lg:p-8 2xl:p-10">
      <div className="mb-12 flex flex-col-reverse items-start justify-between md:mb-16 md:flex-row">
        <Image
          src={siteConfig.logo}
          alt={siteConfig.title}
          className="dark:invert"
          priority
        />
        <div className="mb-4 md:mb-0">
          <Badge
            variant="flat"
            color="success"
            rounded="md"
            className="mb-3 md:mb-2"
          >
            code
          </Badge>
          <Title as="h6">판매자 Email</Title>
          <Text className="mt-0.5 text-gray-500">Invoice Number</Text>
        </div>
      </div>

      <div className="mb-12 grid gap-4 xs:grid-cols-2 sm:grid-cols-3 sm:grid-rows-1">
        <div className="">
          <Title as="h6" className="mb-3.5 font-semibold">
            From
          </Title>
          <Text className="mb-1.5 text-sm font-semibold uppercase">
            GentleDog
          </Text>
          <Text className="mb-1.5">https://gentledog.store</Text>
          <Text className="mb-1.5">
          부산광역시 해운대구 APEC로 17 (우동) <br /> 리더스마크 4층
          </Text>
          <Text className="mb-4 sm:mb-6 md:mb-8">1670-3038</Text>
          <div>
            <Text className="mb-2 text-sm font-semibold">Creation Date</Text>
            <Text>Date</Text>
          </div>
        </div>

        <div className="mt-4 xs:mt-0">
          <Title as="h6" className="mb-3.5 font-semibold">
            Bill To
          </Title>
          <Text className="mb-1.5 text-sm font-semibold uppercase">
            Brand Name
          </Text>
          <Text className="mb-1.5">Albert Flores</Text>
          <Text className="mb-1.5">
            address <br />
            South Dakota 83475
          </Text>
          <Text className="mb-4 sm:mb-6 md:mb-8">(671) 555-0110</Text>
          <div>
            <Text className="mb-2 text-sm font-semibold">Due Date</Text>
            <Text>Mar 22, 2013</Text>
          </div>
        </div>

        <div className="mt-4 flex sm:mt-6 md:mt-0 md:justify-end">
          <QRCodeSVG
            value="https://reactjs.org/"
            className="h-28 w-28 lg:h-32 lg:w-32"
          />
        </div>
      </div>

      <InvoiceDetailsListTable />

      <div className="flex flex-col-reverse items-start justify-between border-t border-gray-200 pb-4 pt-8 xs:flex-row">
        <div className="mt-6 max-w-md pe-4 xs:mt-0">
          <Title
            as="h6"
            className="mb-1 text-xs font-semibold uppercase xs:mb-2 xs:text-sm"
          >
            영수증
          </Title>
          <Text className="leading-[1.7]">
            본 정산서는 GentleDog에서 발행한 정산서로 법적 효력이 없음을 알려드립니다.
          </Text>
        </div>
        <div className=" w-full max-w-sm">
          <Text className="flex items-center justify-between border-b border-gray-200 pb-3.5 lg:pb-5">
            총 금액{' '}
            <Text as="span" className="font-semibold">
            ￦700
            </Text>
          </Text>
          <Text className="flex items-center justify-between border-b border-gray-200 py-3.5 lg:py-5">
            배달료{' '}
            <Text as="span" className="font-semibold">
            ￦142
            </Text>
          </Text>
          <Text className="flex items-center justify-between border-b border-gray-200 py-3.5 lg:py-5">
            할인{' '}
            <Text as="span" className="font-semibold">
            ￦250
            </Text>
          </Text>
          <Text className="flex items-center justify-between border-b border-gray-200 py-3.5 lg:py-5">
            수수료
            <Text as="span" className="font-semibold">
              10%
            </Text>
          </Text>
          <Text className="flex items-center justify-between pt-4 text-base font-semibold text-gray-900 lg:pt-5">
            Total <Text as="span">￦659.5</Text>
          </Text>
        </div>
      </div>
    </div>
  );
}
