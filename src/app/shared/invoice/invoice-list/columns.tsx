'use client';

import Link from 'next/link';
import { type Invoice } from '@/data/invoice-data';
import { routes } from '@/config/routes';
import { Title, Text } from '@/components/ui/text';
import { Badge } from '@/components/ui/badge';
import { Tooltip } from '@/components/ui/tooltip';
import { HeaderCell } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { ActionIcon } from '@/components/ui/action-icon';
import EyeIcon from '@/components/icons/eye';
import PencilIcon from '@/components/icons/pencil';
import AvatarCard from '@/components/ui/avatar-card';
import DateCell from '@/components/ui/date-cell';
import DeletePopover from '@/app/shared/delete-popover';
import { SellerSettlementProductType } from 'types/responseData';

function getStatusBadge(status: string) {
  switch (status.toLowerCase()) {
    case 'pending':
      return (
        <div className="flex items-center">
          <Badge color="warning" renderAsDot />
          <Text className="ms-2 font-medium text-orange-dark">{status}</Text>
        </div>
      );
    case 'paid':
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">{status}</Text>
        </div>
      );
    case 'overdue':
      return (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot />
          <Text className="ms-2 font-medium text-red-dark">{status}</Text>
        </div>
      );
    default:
      return (
        <div className="flex items-center">
          <Badge renderAsDot className="bg-gray-400" />
          <Text className="ms-2 font-medium text-gray-600">{status}</Text>
        </div>
      );
  }
}

type Columns = {
  data: any[];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
};

export const getSettleColumns = ({
  data,
  sortConfig,
  checkedItems,
  onDeleteItem,
  onHeaderCellClick,
  handleSelectAll,
  onChecked,
}: Columns) => [
  {
    title: (
      <div className="ps-1">
        <Checkbox
          title={'Select All'}
          onChange={handleSelectAll}
          checked={checkedItems.length === data.length}
          className="cursor-pointer"
        />
      </div>
    ),
    dataIndex: 'checked',
    key: 'checked',
    width: 30,
    render: (_: any, row: any) => (
      <div className="inline-flex ps-2">
        <Checkbox
          className="cursor-pointer"
          checked={checkedItems.includes(row.id)}
          {...(onChecked && { onChange: () => onChecked(row.id) })}
        />
      </div>
    ),
  },
  {
    title: <HeaderCell title="정산" />,
    dataIndex: 'Settle',
    key: 'Settle',
    width: 400,
    hidden: 'Settle',

    render: (_: string, row: SellerSettlementProductType) => (
      <AvatarCard
        src={row.mainImageUrl}
        name={row.productName}
        description={`Settlement-${row.productName}`}
      />
    ),
  },
  {
    title: <HeaderCell title="상품코드" />,
    dataIndex: 'productCode',
    key: 'productCode',
    width: 200,
    render: (productCode: string) => productCode.toLowerCase(),
  },
  // {
  //   title: (
  //     <HeaderCell
  //       title="정산일"
  //       sortable
  //       ascending={
  //         sortConfig?.direction === 'asc' && sortConfig?.key === 'createdAt'
  //       }
  //     />
  //   ),
  //   onHeaderCell: () => onHeaderCellClick('createdAt'),
  //   dataIndex: 'createdAt',
  //   key: 'createdAt',
  //   width: 200,
  //   render: (value: Date) => <DateCell date={value} />,
  // },
  // {
  //   title: (
  //     <HeaderCell
  //       title="배송날짜"
  //       sortable
  //       ascending={
  //         sortConfig?.direction === 'asc' && sortConfig?.key === 'dueDate'
  //       }
  //     />
  //   ),
  //   onHeaderCell: () => onHeaderCellClick('dueDate'),
  //   dataIndex: 'dueDate',
  //   key: 'dueDate',
  //   width: 200,
  //   render: (value: Date) => <DateCell date={value} />,
  // },
  {
    title: (
      <HeaderCell
        title="총 매출"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'productDailyTotalAmount'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('productDailyTotalAmount'),
    dataIndex: 'productDailyTotalAmount',
    key: 'productDailyTotalAmount',
    width: 200,
    render: (value: string) => (
      <Text className="font-medium text-gray-700 dark:text-gray-600">
        ￦{value}
      </Text>
    ),
  },
  {
    title: (
      <HeaderCell
        title="일일 카드 매출"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'dailyCardAmount'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('dailyCardAmount'),
    dataIndex: 'dailyCardAmount',
    key: 'dailyCardAmount',
    width: 200,
    render: (value: string) => (
      <Text className="font-medium text-gray-700 dark:text-gray-600">
        ￦{value}
      </Text>
    ),
  },
  {
    title: (
      <HeaderCell
        title="일일 기타 매출"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'dailyPayAmount'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('dailyPayAmount'),
    dataIndex: 'dailyPayAmount',
    key: 'dailyPayAmount',
    width: 200,
    render: (value: string) => (
      <Text className="font-medium text-gray-700 dark:text-gray-600">
        ￦{value}
      </Text>
    ),
  },
  {
    title: (
      <HeaderCell
        title="개수"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'count'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('count'),
    dataIndex: 'count',
    key: 'count',
    width: 150,
    render: (value: string) => (
      <Text className="font-medium text-gray-700 dark:text-gray-600">
        {value}개
      </Text>
    ),
  },
  // {
  //   title: <HeaderCell title="Card" />,
  //   dataIndex: 'status',
  //   key: 'status',
  //   width: 120,
  //   render: (value: string) => getStatusBadge(value),
  // },
  // {
  //   title: <HeaderCell title="Pay" />,
  //   dataIndex: 'status',
  //   key: 'status',
  //   width: 120,
  //   render: (value: string) => getStatusBadge(value),
  // },
  {
    title: <></>,
    dataIndex: 'action',
    key: 'action',
    width: 140,
    render: (_: string, row: any) => (
      <div className="flex items-center justify-end gap-3 pe-3">
        <Tooltip
          size="sm"
          content={() => 'Edit Invoice'}
          placement="top"
          color="invert"
        >
          <Link href={routes.invoice.edit(row.id)}>
            <ActionIcon
              tag="span"
              size="sm"
              variant="outline"
              className="hover:!border-gray-900 hover:text-gray-700"
            >
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <Tooltip
          size="sm"
          content={() => 'View Invoice'}
          placement="top"
          color="invert"
        >
          <Link href={routes.invoice.details(row.id)}>
            <ActionIcon
              tag="span"
              size="sm"
              variant="outline"
              className="hover:!border-gray-900 hover:text-gray-700"
            >
              <EyeIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <DeletePopover
          title={`Delete the invoice`}
          description={`Are you sure you want to delete this #${row.id} invoice?`}
          onDelete={() => onDeleteItem(row.id)}
        />
      </div>
    ),
  },
];
