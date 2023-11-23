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
        placeholder="ex.20000"
        {...register('productPrice')}
        error={errors.productPrice?.message as string}
        prefix={'￦'}
        type="text"
        className='col-span-2'
      />
      {/* <Input
        label="할인가격"
        placeholder="ex.20"
        {...register('salePrice')}
        error={errors.salePrice?.message as string}
        prefix={'￦'}
        type="number"
      /> */}
    </>
  );
}
