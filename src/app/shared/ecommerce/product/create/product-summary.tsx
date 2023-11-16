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
const Select = dynamic(() => import('@/components/ui/select'), {
  ssr: false,
  loading: () => <SelectLoader />,
});
const QuillEditor = dynamic(() => import('@/components/ui/quill-editor'), {
  ssr: false,
  loading: () => <QuillLoader className="col-span-full h-[143px]" />,
});

/**
 * 상품 필수정보
 */
export default function ProductSummary({ className }: { className?: string }) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormGroup
      title="상품 필수정보"
      description="필수정보는 꼭 입력해주셔야 상품이 등록됩니다."
      className={cn(className)}
    >
      <Input
        label="상품명"
        placeholder="상품명을 입력해주세요"
        {...register('title')}
        error={errors.title?.message as string}
      />
      <div></div>
      {/* <Input
        label="재고관리 code"
        placeholder="재고관리 code를 입력해주세요"
        {...register('sku')}
        error={errors.sku?.message as string}
      /> */}

      <Controller
        name="type"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            options={typeOption}
            value={value}
            onChange={onChange}
            label="대분류"
            error={errors?.type?.message as string}
            getOptionValue={(option) => option.name}
          />
        )}
      />
      
      <Controller
        name="categories"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            options={categoryOption}
            value={value}
            onChange={onChange}
            label="중분류"
            error={errors?.categories?.message as string}
            getOptionValue={(option) => option.name}
          />
          
        )}
      />

      {/* <Controller
        name="color"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            options={colorOption}
            value={value}
            onChange={onChange}
            label="색상"
            error={errors?.type?.message as string}
            getOptionValue={(option) => option.name}
          />
        )}
      />
      
      <Controller
        name="size"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            options={sizeOption}
            value={value}
            onChange={onChange}
            label="사이즈"
            error={errors?.categories?.message as string}
            getOptionValue={(option) => option.name}
          />
          
        )}
      /> */}

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
      />
    </FormGroup>
  );
}
