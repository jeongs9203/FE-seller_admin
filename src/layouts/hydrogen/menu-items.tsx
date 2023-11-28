import { routes } from '@/config/routes';
import { DUMMY_ID } from '@/config/constants';
import {
  PiShoppingCartDuotone,
  PiHeadsetDuotone,
  PiPackageDuotone,
  PiChartBarDuotone,
  PiFileImageDuotone,
  PiCurrencyDollarDuotone,
  PiSquaresFourDuotone,
  PiGridFourDuotone,
  PiFeatherDuotone,
  PiChartLineUpDuotone,
  // PiImageDuotone,
  PiMapPinLineDuotone,
  PiUserGearDuotone,
  PiBellSimpleRingingDuotone,
  PiUserDuotone,
  PiEnvelopeSimpleOpenDuotone,
  PiStepsDuotone,
  PiCreditCardDuotone,
  PiStackDuotone,
  PiTableDuotone,
  PiBrowserDuotone,
  PiBoundingBoxDuotone,
  PiHourglassSimpleDuotone,
  PiUserCircleDuotone,
  PiShootingStarDuotone,
  PiRocketLaunchDuotone,
  PiFolderLockDuotone,
  PiBinocularsDuotone,
  PiHammerDuotone,
  PiNoteBlankDuotone,
  PiUserPlusDuotone,
  PiShieldCheckDuotone,
  PiLockKeyDuotone,
  PiChatCenteredDotsDuotone,
  PiMagicWandDuotone,
} from 'react-icons/pi';

// Note: do not add href in the label object, it is rendering as label
export const menuItems = [
  // label start
  {
    name: '상품/주문',
    href: '#',
    icon: <PiShoppingCartDuotone />,
    dropdownItems: [
      {
        name: '상품목록',
        href: routes.eCommerce.products,
      },
      // {
      //   name: '상품상세',
      //   href: routes.eCommerce.productDetails(DUMMY_ID),
      // },
      {
        name: '상품등록',
        href: routes.eCommerce.createProduct,
      },
      {
        name: '상품수정',
        href: routes.eCommerce.ediProduct(DUMMY_ID),
      },
      {
        name: '카테고리',
        href: routes.eCommerce.categories,
      },
      // {
      //   name: '카테고리 추가',
      //   href: routes.eCommerce.createCategory,
      // },
      // {
      //   name: '카테고리 수정',
      //   href: routes.eCommerce.editCategory(DUMMY_ID),
      // },
      {
        name: '주문목록',
        href: routes.eCommerce.orders,
      },
      {
        name: '주문상세',
        href: routes.eCommerce.orderDetails(DUMMY_ID),
      },
      // {
      //   name: '주문등록#삭제예정',
      //   href: routes.eCommerce.createOrder,
      // },
      {
        name: '주문수정',
        href: routes.eCommerce.editOrder(DUMMY_ID),
      },
      {
        name: '후기',
        href: routes.eCommerce.reviews,
      },
      // {
      //   name: '후기관리',
      //   href: routes.eCommerce.shop,
      // },
      // {
      //   name: '삭제예정',
      //   href: routes.eCommerce.cart,
      // },
      // {
      //   name: '삭제예정',
      //   href: routes.eCommerce.checkout,
      // },
    ],
  },
  // {
  //   name: 'CS',
  //   href: '#',
  //   icon: <PiHeadsetDuotone />,
  //   dropdownItems: [
  //     {
  //       name: '1:1상담',
  //       href: routes.support.inbox,
  //     },
  //     {
  //       name: 'FAQ',
  //       href: routes.support.snippets,
  //     },
  //     {
  //       name: '판매자관리',
  //       href: routes.support.templates,
  //     },
  //     {
  //       name: '유저관리',
  //       href: routes.support.usermanagement,
  //     },
  //   ],
  // },
  {
    name: '정산',
    href: '#',
    icon: <PiCurrencyDollarDuotone />,
    dropdownItems: [
      {
        name: '일일정산',
        href: routes.invoice.home,
      },
      {
        name: '월간정산',
        href: routes.invoice.details(DUMMY_ID),
      },
      // {
      //   name: 'Create',
      //   href: routes.invoice.create,
      // },
      // {
      //   name: 'Edit',
      //   href: routes.invoice.edit(DUMMY_ID),
      // },
    ],
  },
  {
    name: '배송관리',
    href: '#',
    icon: <PiPackageDuotone />,
    dropdownItems: [
      {
        name: '배송관리',
        href: routes.logistics.shipmentList,
      },
      {
        name: '배송내역',
        href: routes.logistics.shipmentDetails(DUMMY_ID),
      },
      {
        name: '배송대기',
        href: routes.logistics.createShipment,
      },
      // {
      //   name: '배송지수정',
      //   href: routes.logistics.editShipment(DUMMY_ID),
      // },
      {
        name: '교환/환불',
        href: routes.logistics.customerProfile,
      },
      // {
      //   name: '배송추적',
      //   href: routes.logistics.tracking(DUMMY_ID),
      // },
    ],
  },
  // label start
  
];
