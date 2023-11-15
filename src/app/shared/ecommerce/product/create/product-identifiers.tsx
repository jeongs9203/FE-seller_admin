import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import FormGroup from '@/app/shared/form-group';
import cn from '@/utils/class-names';
import CustomFields from '@/app/shared/ecommerce/product/create/custom-fields';

interface ProductIdentifiersProps {
  className?: string;
}

export default function ProductIdentifiers({
  className,
}: ProductIdentifiersProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <FormGroup
      title="제품 식별코드"
      description="제품 식별코드를 입력해주세요"
      className={cn(className)}
    >
      <Input
        label="글로벌 무역 품목 번호"
        placeholder="12345"
        {...register('tradeNumber')}
        error={errors.tradeNumber?.message as string}
      />
      <Input
        label="제조자 부품 번호"
        placeholder="145782"
        {...register('manufacturerNumber')}
        error={errors.manufacturerNumber?.message as string}
      />
      <Input
        label="브랜드 이름"
        placeholder="brand name"
        {...register('brand')}
        error={errors.brand?.message as string}
      />
      <Input
        label="상품 관련 정보"
        placeholder="145782"
        {...register('upcEan')}
        error={errors.upcEan?.message as string}
      />
      <CustomFields />
    </FormGroup>
  );
}
