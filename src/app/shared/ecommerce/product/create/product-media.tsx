'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, SetStateAction } from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import FormGroup from '@/app/shared/form-group';
import cn from '@/utils/class-names';
import { Radio } from '@/components/ui/radio';
import TrashIcon from '@/components/icons/trash';
import Upload from '@/components/ui/upload';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import FileUploadImage from '@/app/shared/file-upload_image';
import FileUploadImageProduct from '@/app/shared/file-upload_product_image';
import { productCreateImageType } from 'types/product/product';

interface ProductMediaProps {
  className?: string;
  setProductImage?: React.Dispatch<SetStateAction<productCreateImageType[]>>;
  productImage?: productCreateImageType[];
}

/**
 * 상품 이미지
 */
export default function ProductMedia({ className, setProductImage, productImage }: ProductMediaProps) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
    <FormGroup
      title="상품 이미지"
      description="대표이미지, 썸네일 이미지를 업로드해주세요"
      className={cn(className)}
    >
      {
        productImage && setProductImage &&
        <FileUploadImageProduct 
          label = "상품이미지"
          className = "col-span-2"
          multiple = {false}
          productImage = {productImage}
          setProductImage = {setProductImage}
        />
      }
      
    </FormGroup>
    </div>
  );
}

