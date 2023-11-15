import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';

export default function ProductPricing() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <Input
        label="소비자가격"
        placeholder="ex.10"
        {...register('price')}
        error={errors.price?.message as string}
        prefix={'￦'}
        type="number"
      />
      <Input
        label="할인가격"
        placeholder="ex.20"
        {...register('salePrice')}
        error={errors.salePrice?.message as string}
        prefix={'￦'}
        type="number"
      />
    </>
  );
}
