'use client';

import dynamic from 'next/dynamic';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import FormGroup from '@/app/shared/form-group';
import cn from '@/utils/class-names';
import { useCallback } from 'react';
import {
  productVariants,
  variantOption1,
  variantOption2,
} from '@/app/shared/ecommerce/product/create/form-utils';
import { Button } from '@/components/ui/button';
import { ActionIcon } from '@/components/ui/action-icon';
import TrashIcon from '@/components/icons/trash';
import SelectLoader from '@/components/loader/select-loader';
import { PiPlusBold } from 'react-icons/pi';
import { Checkbox } from '@/components/ui/checkbox';

const Select = dynamic(() => import('@/components/ui/select'), {
  ssr: false,
  loading: () => <SelectLoader />,
});

/**
 * 상품 옵션
 */
export default function ProductVariants({ className }: { className?: string }) {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'productVariants',
  });

  const addVariant = useCallback(() => append([...productVariants]), [append]);

  console.log('fields', fields);
  fetch(`${process.env.BASE_API_URL}api/v1/product/product-create`)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
  return (
    <FormGroup
      title="옵션"
      description="옵션을 추가하세요"
      className={cn(className)}
    >
      {fields.map((item, index) => (
        <div key={item.id} className="col-span-full flex gap-4 xl:gap-7">
          <Controller
            name={`productVariants1.${index}.name`}
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select
                options={variantOption1}
                value={value}
                onChange={onChange}
                label="색상"
                className="w-full @2xl:w-auto @2xl:flex-grow"
                getOptionValue={(option) => option.name}
              />
            )}
          />
           <Controller
            name={`productVariants2.${index}.name`}
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select
                options={variantOption2}
                value={value}
                onChange={onChange}
                label="사이즈"
                className="w-full @2xl:w-auto @2xl:flex-grow"
                getOptionValue={(option) => option.name}
              />
            )}
          />
          {/* <Input
            type="text"
            label="옵션값"
            placeholder="150.00"
            className="flex-grow"
            // prefix={'{label}'}
            {...register(`productVariants.${index}.value`)}
          /> */}
          {fields.length > 1 && (
            <ActionIcon 
              onClick={() => remove(index)}
              variant="flat"
              className="mt-7 shrink-0"
            >
              <TrashIcon className="h-4 w-4" />
            </ActionIcon>
          )}
        </div>
      ))}
      <Button
        onClick={addVariant}
        variant="outline"
        className="col-span-full ml-auto w-auto"
      >
        <PiPlusBold className="me-2 h-4 w-4" /> Add Variant
      </Button>
    </FormGroup>
  );
}