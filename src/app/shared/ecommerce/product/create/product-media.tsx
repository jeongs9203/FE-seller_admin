'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import FormGroup from '@/app/shared/form-group';
import cn from '@/utils/class-names';
import { Radio } from '@/components/ui/radio';
import TrashIcon from '@/components/icons/trash';
import Upload from '@/components/ui/upload';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

interface ProductMediaProps {
  className?: string;
}

/**
 * 상품 이미지
 */
export default function ProductMedia({ className }: ProductMediaProps) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    console.log(control);
  },[])
  return (
    <div>
    <FormGroup
      title="상품 이미지"
      description="대표이미지, 썸네일 이미지를 업로드해주세요"
      className={cn(className)}
    >
      <MultipleFiles className="col-span-2" label="Images" />
    </FormGroup>
    </div>
  );
}

export const MultipleFiles = ({
  className,
  label,
}: {
  className?: string;
  label?: React.ReactNode;
}) => {

  const s3 = new S3Client({
    region: process.env.NEXT_PUBLIC_AWS_REGION as string,
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID as string,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY as string,
    },
  }) 

  // s3 upload
  const s3Upload = async (file: File) => {
    const params = {
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME as string,
      Key: file.name,
      Body: file,
    };
    const data = await s3.send(new PutObjectCommand(params));
    console.log(data);
  }


  const multiRef = useRef<HTMLInputElement>(null);
  const [multiImages, setMultiImages] = useState<Array<File>>([]);

  const handleMultiImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const uploadedFiles = (event.target as HTMLInputElement).files;
    const newFiles = Object.entries(uploadedFiles as object)
      .map((file) => {
        if (file[1].type.includes('image')) return file[1];
      })
      .filter((file) => file !== undefined);
    setMultiImages((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleMultiImageDelete = (index: number) => {
    const updatedFiles = multiImages.filter((_, i) => i !== index);
    setMultiImages(updatedFiles);
    (multiRef.current as HTMLInputElement).value = '';
  };

  return (
    <div className={className}>
      <Upload
        label={label}
        ref={multiRef}
        accept="img"
        multiple
        onChange={handleMultiImageUpload}
      />
      <p className="pt-3 text-sm text-gray-500">
        사진을 올려주세요<strong className="font-medium text-gray-900">2 MB까지 지원합니다</strong>
      </p>

      {multiImages.length > 0 && (
        <div className="-mb-3 overflow-x-scroll @xl:mb-0 @xl:overflow-x-hidden">
          <div className="min-w-[600px] pb-5 @xl:pb-0">
            <div className="mt-7 flex items-center rounded-md border border-gray-300 @2xl:mt-10">
              <div className="w-[20%] px-4 py-3.5 text-center text-sm font-semibold text-gray-700 @2xl:py-5">
                이미지
              </div>
              <div className="w-[55%] px-4 py-3.5 text-sm font-semibold text-gray-700 @2xl:py-5">
                설명
              </div>
              <div className="w-28 px-4 py-3.5 text-center text-sm font-semibold text-gray-700 @2xl:py-5">
                썸네일 이미지
              </div>
              <div className="w-20 shrink-0 px-4 py-3.5 text-center text-sm font-semibold text-gray-700 @2xl:py-5">
                삭제
              </div>
            </div>
            <div className="mt-7 flex flex-row flex-wrap gap-5">
              {multiImages?.map((file: File, index: number) => (
                <div className="flex w-full items-center" key={file.name}>
                  <div className="w-[20%] px-4">
                    <figure className="relative mx-auto aspect-square w-20 overflow-hidden rounded-xl border border-gray-300 @2xl:w-28">
                      <Image
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw"
                      />
                    </figure>
                  </div>
                  <div className="w-[55%] px-4">
                    <Input
                      label="상품 상세설명"
                      placeholder="상품상세 설명을 적어주세요"
                      // {...register('title')}
                      // error={errors.title?.message}
                    />
                  </div>
                  <div className="flex w-28 items-center justify-center px-4">
                    <Radio
                      value="NotTrackInventoryProduct"
                      inputClassName="dark:checked:!bg-gray-200 dark:checked:!border-gray-200 dark:focus:ring-gray-200 dark:focus:ring-offset-gray-0"
                    />
                  </div>
                  <div className="flex w-20 shrink-0 items-center justify-center px-4">
                    <TrashIcon
                      onClick={() => handleMultiImageDelete(index)}
                      className="h-5 w-5 cursor-pointer transition duration-75"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
