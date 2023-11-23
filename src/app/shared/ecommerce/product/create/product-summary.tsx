'use client';
import { Controller, useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import FormGroup from '@/app/shared/form-group';
import cn from '@/utils/class-names';
import {
  categoryOption,
  typeOption,
  colorOption,
  sizeOption,
} from '@/app/shared/ecommerce/product/create/form-utils';
import dynamic from 'next/dynamic';
import SelectLoader from '@/components/loader/select-loader';
import QuillLoader from '@/components/loader/quill-loader';
import { size } from 'lodash';
import { useEffect, useState } from 'react';
import { commonResType } from 'types/responseData';
const Select = dynamic(() => import('@/components/ui/select'), {
  ssr: false,
  loading: () => <SelectLoader />,
});
const QuillEditor = dynamic(() => import('@/components/ui/quill-editor'), {
  ssr: false,
  loading: () => <QuillLoader className="col-span-full h-[143px]" />,
});

export interface parentCategory {
  parentCategoryName: string;
  parentCategoryId: number;
}

export interface childCategory {
  childCategoryName: string;
  childCategoryId: number;
}

export interface cateType {
  value: string;
  name: string;
}
/**
 * 상품 필수정보
 */
export default function ProductSummary({ className }: { className?: string }) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const [ parentCategory, setParentCategory ] = useState<parentCategory[]>([])
  const [ childCategory, setChildCategory ] = useState<childCategory[]>([])
  const [ parentCategoryOption, setParentCategoryOption ] = useState<any[]>()
  const [ childCategoryOption, setChildCategoryOption ] = useState<any[]>([])
  const [ parentCateId, setParentCateId ] = useState<number>(0)

  useEffect(() => {
    async function fetchParentCategory() {
      const response = await fetch(`${process.env.BASE_API_URL}api/v1/product/read-parent-category`)
      const data:any = await response.json()
      console.log(data)
      if(data.isSuccess) {
        setParentCategory(data.result.parentCategoryDtoList)
        const res = data.result.parentCategoryDtoList.map((item: parentCategory) => {
          return {
            value: item.parentCategoryId,
            name: item.parentCategoryName
          }
        })
        console.log(res)
        setParentCategoryOption(res)
      }
    }
    fetchParentCategory()
  },[])

  useEffect(() => {
    if(parentCateId === 0) return
    console.log(parentCateId)
    async function fetchChildCategory() {
      const response = await fetch(`${process.env.BASE_API_URL}api/v1/product/read-child-category?parentCategoryId=${parentCateId}`)
      const data:any = await response.json()
      console.log(data)
      if(data.isSuccess) {
        setChildCategory(data.result)
        const res = data.result.map((item: childCategory) => {
          return {
            value: item.childCategoryId,
            name: item.childCategoryName
          }
        })

        setChildCategoryOption(res)
      } else {
        setChildCategoryOption([])
      }
    }
    fetchChildCategory()
  },[parentCateId])

  return (
    <FormGroup
      title="상품 필수정보"
      description="필수정보는 꼭 입력해주셔야 상품이 등록됩니다."
      className={cn(className)}
    >
      <Input
        label="상품명"
        placeholder="상품명을 입력해주세요"
        {...register('productName')}
        error={errors.productName?.message as string}
        className='col-span-full'
      />
    
      {/* <Input
        label="재고관리 code"
        placeholder="재고관리 code를 입력해주세요"
        {...register('sku')}
        error={errors.sku?.message as string}
      /> */}

      <Controller
        name="parentCategoryName"
        control={control}
        render={({ field: { onChange, value, name } }) => {
          setParentCateId(parentCategoryOption?.find((item) => item.name === value)?.value || 0)
          return(
          <Select
            options={parentCategoryOption ? parentCategoryOption : []}
            value={value}
            key={value}
            onChange={onChange}
            label="대분류"
            error={errors?.parentCategoryName?.message as string}
            getOptionValue={(option) => option.name}
          />)
        }}
      />
      {
        childCategoryOption?.length > 0 ? 
          <Controller
          name="childCategoryName"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              options={childCategoryOption ? childCategoryOption : []}
              value={value}
              key={value}
              onChange={onChange}
              label="중분류"
              error={errors?.childCategoryName?.message as string}
              getOptionValue={(option) => option.name}
            />
            
          )}
        />
        :
        <Select
          options={[]}
          value={''}
          key={''}
          label="중분류"
          error={errors?.childCategoryName?.message as string}
          getOptionValue={(option) => option.name}
        />
      }
{/*       
      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, value } }) => (
          <QuillEditor
            value={value}
            onChange={onChange}
            label="상품설명"
            className="col-span-full [&_.ql-editor]:min-h-[100px]"
            labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
          />
        )}
      /> */}
    </FormGroup>
  );
}
