import Link from 'next/link';
import Image from 'next/image';
import { routes } from '@/config/routes';
import { Button } from '@/components/ui/button';
import WelcomeBanner from '@/components/banners/welcome';
import StatCards from '@/app/shared/ecommerce/dashboard/stat-cards';
import ProfitWidget from '@/app/shared/ecommerce/dashboard/profit-widget';
import SalesReport from '@/app/shared/ecommerce/dashboard/sales-report';
import BestSellers from '@/app/shared/ecommerce/dashboard/best-sellers';
import RepeatCustomerRate from '@/app/shared/ecommerce/dashboard/repeat-customer-rate';
import UserLocation from '@/app/shared/ecommerce/dashboard/user-location';
import PromotionalSales from '@/app/shared/ecommerce/dashboard/promotional-sales';
import RecentOrder from '@/app/shared/ecommerce/dashboard/recent-order';
import StockReport from '@/app/shared/ecommerce/dashboard/stock-report';
import { PiPlusBold } from 'react-icons/pi';
import welcomeImg01 from '@public/assets/images/gentledog_cover01.png';
import welcomeImg02 from '@public/assets/images/gentledog_cover02.png';

import HandWaveIcon from '@/components/icons/hand-wave';

export default function EcommerceDashboard() {

  return (
    <div className="@container pt-20">
      <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-2 @7xl:grid-cols-12 3xl:gap-8">
        <WelcomeBanner
          title={  
            <>
              판매자관리 <br /> 페이지{' '}
            </>
          }
          description={
            'GentleDog에 입점한 벤더사분들의 상점 관리 페이지입니다.'
          }
          media={
            <div className="absolute -bottom-7 end-6 hidden w-[150px] h-auto @2xl:block lg:w-[200px] 2xl:-bottom-5 2xl:w-[200px] dog_view" style={{zIndex: "100"}}>
              <div className="relative mix-blend-multiply brightness-105">
                <Image
                  src={Math.floor(Math.random() * 2) ? welcomeImg01 : welcomeImg02}
                  width={300}
                  height={300}
                  priority
                  alt="Welcome shop image form freepik"
                />
              </div>
            </div>
          }
          contentClassName="@2xl:max-w-[calc(100%-340px)]"
          className="border border-gray-200 bg-gray-0 pb-8 @4xl:col-span-2 @7xl:col-span-8 dark:bg-gray-100/30 lg:pb-9"
        >
          <Link href={routes.eCommerce.createProduct} className="inline-flex">
            <Button
              tag="span"
              className="h-[38px] shadow dark:bg-gray-100 dark:text-gray-900 md:h-10"
            >
              <PiPlusBold className="me-1 h-4 w-4" /> 상품 등록
            </Button>
          </Link>
        </WelcomeBanner>

        <StatCards className="@2xl:grid-cols-3 @3xl:gap-6 @4xl:col-span-2 @7xl:col-span-8" />
        <ProfitWidget className="h-[464px] @sm:h-[520px] @7xl:col-span-4 @7xl:col-start-9 @7xl:row-start-1 @7xl:row-end-3 @7xl:h-[443px]" />

        <SalesReport className="@4xl:col-span-2 @7xl:col-span-8" />

        <PromotionalSales className="@4xl:col-start-2 @4xl:row-start-3 @7xl:col-span-4 @7xl:col-start-auto @7xl:row-start-auto" />

        {/* <RecentOrder className="relative @4xl:col-span-2 @7xl:col-span-12" /> */}

        {/* <RepeatCustomerRate className="@4xl:col-span-2 @7xl:col-span-12 @[90rem]:col-span-8" /> */}

        {/* <BestSellers className="@7xl:col-span-6 @[90rem]:col-span-4" /> */}

        {/* <UserLocation className="@7xl:col-span-6 @[90rem]:col-span-5 @[112rem]:col-span-4" /> */}

        {/* <StockReport className="@4xl:col-span-2 @7xl:col-span-12 @[90rem]:col-span-7 @[112rem]:col-span-8" /> */}
      </div>
    </div>
  );
}
