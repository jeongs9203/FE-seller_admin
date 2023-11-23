import FormGroup from '@/app/shared/form-group';
import cn from '@/utils/class-names';
import ProductAvailability from '@/app/shared/ecommerce/product/create/product-availability';
import InventoryTracing from '@/app/shared/ecommerce/product/create/inventory-tracking';
import ProductPricing from '@/app/shared/ecommerce/product/create/product-pricing';

interface PricingInventoryProps {
  className?: string;
}

/**
 * 가격 및 재고 관련 정보
 */
export default function PricingInventory({ className }: PricingInventoryProps) {
  return (
    <>
      <FormGroup
        title="가격"
        description="가격 정보를 입력해주세요"
        className={cn(className)}
      >
        <ProductPricing />
      </FormGroup>
      {/* <FormGroup
        // title="재고 정보"
        // description="재고 관련 정보를 입력해주세요"
        // className={cn(className)}
      >
        <InventoryTracing />
      </FormGroup> */}
      {/* <FormGroup
        title="상품현황"
        description="상품 현황을 선택해주세요"
        className={cn(className)}
      >
        <ProductAvailability />
      </FormGroup> */}
    </>
  );
}
