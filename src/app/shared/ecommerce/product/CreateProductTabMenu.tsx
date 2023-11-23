import React from 'react'
import SimpleBar from '@/components/ui/simplebar';
import { Link } from 'react-scroll';

export const menuItems = [
    {
      id: 1,
      label: '상품정보',
      value: 'summary',
    },
    {
      id: 2,
      label: '상품이미지',
      value: 'productImg'
    },
    {
      id: 3,
      label: '가격/할인',
      value: 'pricingInventory',
    },
    {
      id: 4,
      label: '상세이미지',
      value: 'descriptionImg',
    },
    {
      id: 5,
      label: '배송정보',
      value: 'shipping',
    },
    {
      id: 6,
      label: '옵션',
      value: 'variantOptions'
    },
    {
      id: 7,
      label: '상품키워드',
      value: 'tagsAndCategory'
    },
  ];
function CreateProductTabMenu() {
  return (
    <div
        className="sticky top-[68px] z-20 border-b border-gray-300 bg-white py-0 font-medium text-gray-500 @2xl:top-[72px] dark:bg-gray-50 2xl:top-20"
    >
        <SimpleBar>
        <div className="inline-grid grid-flow-col gap-5 md:gap-7 lg:gap-10">
          {menuItems.map((tab) => (
            <Link
              key={tab.value}
              to={tab.value}
              spy={true}
              hashSpy={true}
              smooth={true}
              offset={tab.id === 0 ? -250 : -150}
              duration={500}
              className="relative cursor-pointer whitespace-nowrap py-4 hover:text-gray-1000"
              activeClass="active before:absolute before:bottom-0 before:left-0 before:z-[1] before:h-0.5 before:w-full before:bg-gray-1000 font-semibold text-gray-1000"
            >
              {tab.label}
            </Link>
          ))}
        </div>
      </SimpleBar>
    </div>
  )
}

export default CreateProductTabMenu