'use client';

import dynamic from 'next/dynamic';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import FormGroup from '@/app/shared/form-group';
import cn from '@/utils/class-names';
import { SetStateAction, useCallback, useEffect, useState } from 'react';
import {
  colorName,
  sizeName,
  sizeFields,
  colorFields,
} from '@/app/shared/ecommerce/product/create/form-utils';
import { Button } from '@/components/ui/button';
import { ActionIcon } from '@/components/ui/action-icon';
import TrashIcon from '@/components/icons/trash';
import SelectLoader from '@/components/loader/select-loader';
import { Checkbox } from '@/components/ui/checkbox';
import { size } from 'lodash';
import { RadioGroup } from '@/components/ui/radio-group';
import { CheckboxGroup } from '@/components/ui/checkbox-group';
import { AdvancedCheckbox } from '@/components/ui/advanced-checkbox';
import { AdvancedRadio } from '@/components/ui/advanced-radio';
import { PiCheckCircleFill } from 'react-icons/pi';

const Select = dynamic(() => import('@/components/ui/select'), {
  ssr: false,
  loading: () => <SelectLoader />,
});

export interface sizeType {
  sizeId: number,
  sizeName: string
}
export interface colorType {
  colorId: number,
  colorName: string
}

/**
 * 상품 옵션
 */
export default function ProductVariants({ className }: { className?: string }) {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const [sizes, setSizes] = useState<sizeType[]>([]);
  const [colors, setColors] = useState<colorType[]>([]);
  const [sizeOption, setSizeOption] = useState<any[]>([]);
  const [colorOption, setColorOption] = useState<any[]>([]);
  
  useEffect(() => {
    async function getSize() {
      const response = await fetch(`${process.env.BASE_API_URL}api/v1/product/read-all-size`)
      const data:any = await response.json()
      console.log(data.result.allSizeDtoList)
      if(data.isSuccess) {
        setSizes(data.result.allSizeDtoList)
        const res = data.result.allSizeDtoList.map((item: sizeType) => {
          return {
            value: item.sizeId,
            name: item.sizeName
          }
        })
        setSizeOption(res)
      } 
    }
    getSize()

    async function getColor() {
      const response = await fetch(`${process.env.BASE_API_URL}api/v1/product/read-colors`)
      const data:any = await response.json()
      console.log(data.result.colors)
      if(data.isSuccess) {
        setSizes(data.result.colors)
        const res = data.result.colors.map((item: colorType) => {
          return {
            value: item.colorId,
            name: item.colorName
          }
        })
        setColorOption(res)
      } 
    }
    getColor()
  },[])

  return (
    <>
    <FormGroup
      title="사이즈"
      description="사이즈를 선택해주세요."
      className={cn(className)}
    >
      <div className="flex gap-4 xl:gap-7">
        <Controller
          name="sizeName"
          control={control}
          render={({ field: { onChange, value } }) => (
            <CheckboxGroup
              values={value}
              setValues={onChange}
              className="flex gap-4"
            >
              {sizeOption.map((item) => (
                <AdvancedCheckbox
                  key={item.value}
                  value={item.name}
                  onChange={onChange}
                  checked={sizeName.length > 0 && sizeName.find(item.name)}
                  className="flex justify-between gap-2 rounded-xl border border-gray-200 p-6 text-gray-600 hover:cursor-pointer hover:border-gray-700"
                  inputClassName="[&:checked:enabled~span]:ring-1 [&:checked:enabled~span]:ring-offset-0 [&:checked:enabled~span]:ring-gray-700 [&:checked:enabled~span]:border-gray-700 [&:checked~span>.icon]:block"
                >
                  <span>{item.name}</span>
                  <PiCheckCircleFill className="icon hidden h-5 min-w-[1.25rem] text-gray-900" />
                </AdvancedCheckbox>
              ))}
            </CheckboxGroup>
          )}
        />
        {errors.sizeName?.message as string}
      </div>
    </FormGroup>
    <FormGroup
      title="색상"
      description="색상을 선택해주세요."
      className={cn(className)}
    >
      <div className="flex gap-4 xl:gap-7">
        <Controller
          name="colorName"
          control={control}
          render={({ field: { onChange, value } }) => (
            <CheckboxGroup
              values={value}
              setValues={onChange}
              className="flex gap-4"
            >
              {colorOption.map((item) => (
                <AdvancedCheckbox
                  key={item.value}
                  value={item.name}
                  onChange={onChange}
                  checked={colorName.length > 0 && colorName.includes(item.name as never)}
                  className="flex justify-between gap-2 rounded-xl border border-gray-200 p-6 text-gray-600 hover:cursor-pointer hover:border-gray-700"
                  inputClassName="[&:checked:enabled~span]:ring-1 [&:checked:enabled~span]:ring-offset-0 [&:checked:enabled~span]:ring-gray-700 [&:checked:enabled~span]:border-gray-700 [&:checked~span>.icon]:block"
                >
                  <span>{item.name}</span>
                  <PiCheckCircleFill className="icon hidden h-5 min-w-[1.25rem] text-gray-900" />
                </AdvancedCheckbox>
              ))}
            </CheckboxGroup>
          )}
        />
        {errors.colorName?.message as string}
      </div>
    </FormGroup>
    </>
  );
}