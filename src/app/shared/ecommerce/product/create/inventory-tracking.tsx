import { Controller, useFormContext } from 'react-hook-form';
import { RadioGroup } from '@/components/ui/radio-group';
import { Radio } from '@/components/ui/radio';
import { Input } from '@/components/ui/input';

const options = [
  {
    value: 'yes',
    label: '재고 파악함',
  },
  {
    value: 'no',
    label: '재고 파악 안 함',
  },
  {
    value: 'by-options',
    label: '카테고리별로 재고 파악',
  },
];

export default function InventoryTracing() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <Controller
        name="inventoryTracking"
        control={control}
        render={({ field: { onChange, value } }) => (
          <RadioGroup
            value={value}
            setValue={onChange}
            className="col-span-full grid gap-4"
          >
            {options.map((item) => (
              <Radio
                key={item.value}
                value={item.value}
                label={item.label}
                inputClassName="dark:checked:!bg-gray-200 dark:checked:!border-gray-200 dark:focus:ring-gray-200 dark:focus:ring-offset-gray-0"
              />
            ))}
          </RadioGroup>
        )}
      />

      <Input
        type="number"
        label="현재 재고 수준"
        placeholder="150"
        {...register('currentStock')}
        error={errors.currentStock?.message as string}
      />
      <Input
        type="number"
        label="최소 재고 수준"
        placeholder="20"
        {...register('lowStock')}
        error={errors.lowStock?.message as string}
      />
    </>
  );
}
