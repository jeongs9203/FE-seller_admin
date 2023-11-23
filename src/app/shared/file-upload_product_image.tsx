'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import cn from '@/utils/class-names';
import {
  PiArrowLineDownBold,
  PiFile,
  PiFileCsv,
  PiFileDoc,
  PiFilePdf,
  PiFileXls,
  PiFileZip,
  PiTrashBold,
  PiXBold,
} from 'react-icons/pi';
import { Button } from '@/components/ui/button';
import { Title, Text } from '@/components/ui/text';
import { ActionIcon } from '@/components/ui/action-icon';
import Upload from '@/components/ui/upload';
import { useModal } from '@/app/shared/modal-views/use-modal';
import SimpleBar from '@/components/ui/simplebar';
import { toast } from 'react-hot-toast';
import { set } from 'lodash';
import AWS from 'aws-sdk';
import { productCreateImageType } from 'types/product/product';

type AcceptedFiles = 'img' | 'pdf' | 'csv' | 'imgAndPdf' | 'all';

export default function FileUploadImageProduct({
  label = 'Upload Files',
  btnLabel = 'Upload',
  fieldLabel,
  multiple = true,
  accept = 'all',
  className,
  setProductImage,
  productImage,
}: {
  label?: string;
  fieldLabel?: string;
  btnLabel?: string;
  multiple?: boolean;
  accept?: AcceptedFiles;
  className?: string;
  productImage?: productCreateImageType[];
  setProductImage?: React.Dispatch<React.SetStateAction<productCreateImageType[]>>;
}) {
  const { closeModal } = useModal();

  return (
    <div className={`m-auto pb-8 pt-5 @lg:pt-6 w-full ${className ? className : ''}`}>
      <div className="mb-6 flex items-center justify-between">
        <p className='-mb-3'>
          {label}
        </p>
        {/* <Title as="h5" className="text-md">
          {label}
        </Title> */}
        {/* <ActionIcon
          size="sm"
          variant="text"
          onClick={() => closeModal()}
          className="p-0 text-gray-500 hover:!text-gray-900"
        >
          <PiXBold className="h-[18px] w-[18px]" />
        </ActionIcon> */}
      </div>

      <FileInput
        accept={accept}
        multiple={true}
        label={fieldLabel}
        btnLabel={btnLabel}
        setProductImage = {setProductImage}
        productImage={productImage}
      />
    </div>
  );
}

const fileType = {
  'text/csv': <PiFileCsv className="h-5 w-5" />,
  'text/plain': <PiFile className="h-5 w-5" />,
  'application/pdf': <PiFilePdf className="h-5 w-5" />,
  'application/xml': <PiFileXls className="h-5 w-5" />,
  'application/zip': <PiFileZip className="h-5 w-5" />,
  'application/gzip': <PiFileZip className="h-5 w-5" />,
  'application/msword': <PiFileDoc className="h-5 w-5" />,
} as { [key: string]: React.ReactElement };

export const FileInput = ({
  label,
  btnLabel = 'Upload',
  multiple = false,
  accept = 'img',
  className,
  productImage,
  setProductImage,
}: {
  className?: string;
  label?: React.ReactNode;
  multiple?: boolean;
  btnLabel?: string;
  accept?: AcceptedFiles;
  productImage?: productCreateImageType[];
  setProductImage?: React.Dispatch<React.SetStateAction<productCreateImageType[]>>;
}) => {

  AWS.config.update({
    region: process.env.AWS_REGION as string,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  });
  
  const { closeModal } = useModal();
  const [files, setFiles] = useState<Array<File>>([]);
  // const [file, setFile] = useState<File | null>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  function handleFileDrop(event: React.ChangeEvent<HTMLInputElement>) {
    const uploadedFiles = (event.target as HTMLInputElement).files;
    const newFiles = Object.entries(uploadedFiles as object)
      .map((file) => {
        if (file[1]) return file[1];
      })
      .filter((file) => file !== undefined);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  }

  function handleImageDelete(index: number) {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    setProductImage && setProductImage(
      (prevProductImage) => prevProductImage.filter((_, i) => i !== index)
    );
    (imageRef.current as HTMLInputElement).value = '';
  }

  const handleFileUpload = async () => {
    if (files.length && setProductImage) {
      console.log('uploaded files:', files);
      toast.success(<Text as="b">File successfully added</Text>);
      // const file = files[0];
      // console.log(file)
      const images:productCreateImageType[] = []
      files.map((file) => {
        const upload = new AWS.S3.ManagedUpload({
          params: {
            ACL: "public-read",
            Body: file,
            Key: "product/" + file.name,
            Bucket: process.env.AWS_BUCKET_NAME as string,
          },
        })
        console.log(upload)
  
        const promise = upload.promise();
        promise.then((data) => {
          console.log(data.Location)
          images.push({
            imageUrl: data.Location,
            imageName: file.name
          })
        })
      })
      console.log(images)
      setProductImage(images)

      setTimeout(() => {
        closeModal();
      }, 200);
    } else {
      toast.error(<Text as="b">Please drop your file</Text>);
    }
  }

  return (
    <div className={className}>
      <Upload
        label={label}
        ref={imageRef}
        accept={accept}
        multiple={multiple}
        onChange={(event) => handleFileDrop(event)}
        className="mb-6 min-h-[150px] justify-center border-dashed bg-gray-50 dark:bg-transparent"
      />

      {files.length > 1 ? (
        <Text className="mb-2 text-gray-500">{files.length} files</Text>
      ) : null}

      {files.length > 0 && (
        <SimpleBar className="max-h-[280px]">
          <div className="grid grid-cols-1 gap-4">
            {files?.map((file: File, index: number) => (
              <div
                className="flex min-h-[58px] w-full items-center rounded-xl border border-gray-200 px-3 dark:border-gray-300"
                key={file.name}
              >
                <div className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-gray-50 object-cover px-2 py-1.5 dark:bg-transparent">
                  {file.type.includes('image') ? (
                    <Image
                      src={URL.createObjectURL(file)}
                      fill
                      className=" object-contain"
                      priority
                      alt={file.name}
                      sizes="(max-width: 768px) 100vw"
                    />
                  ) : (
                    <>{fileType[file.type]}</>
                  )}
                </div>
                <div className="truncate px-2.5">{file.name}</div>
                <ActionIcon
                  onClick={() => handleImageDelete(index)}
                  size="sm"
                  variant="flat"
                  color="danger"
                  className="ms-auto flex-shrink-0 p-0 dark:bg-red-dark/20"
                >
                  <PiTrashBold className="w-6" />
                </ActionIcon>
              </div>
            ))}
          </div>
        </SimpleBar>
      )}
      <div className="mt-4 flex justify-end gap-3">
        <Button
          variant="outline"
          className={cn(!files.length && 'hidden', 'w-full')}
          onClick={() => setFiles([])}
        >
          Reset
        </Button>
        <Button className="w-full" onClick={() => handleFileUpload()}>
          <PiArrowLineDownBold className="me-1.5 h-[17px] w-[17px]" />
          {btnLabel}
        </Button>
      </div>
    </div>
  );
};
function setS3location(Location: string) {
  throw new Error('Function not implemented.');
}

