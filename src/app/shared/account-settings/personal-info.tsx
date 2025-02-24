'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import z from 'zod';
import { SubmitHandler, Controller } from 'react-hook-form';
import {
  PiClock,
  PiEnvelopeSimple,
  PiQuestion,
  PiTrashBold,
} from 'react-icons/pi';
import cn from '@/utils/class-names';
import { Form } from '@/components/ui/form';
import { Title, Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Upload from '@/components/ui/upload';
import { ActionIcon } from '@/components/ui/action-icon';
import HorizontalFormBlockWrapper from './horiozontal-block';
import Spinner from '@/components/ui/spinner';
import { FieldError } from '@/components/ui/field-error';
import toast from 'react-hot-toast';
import { UploadDropzone, UploadFileResponse } from '@/utils/uploadthing';

const SelectBox = dynamic(() => import('@/components/ui/select'), {
  ssr: false,
  loading: () => (
    <div className="grid h-10 place-content-center">
      <Spinner />
    </div>
  ),
});
const QuillEditor = dynamic(() => import('@/components/ui/quill-editor'), {
  ssr: false,
});

const role = [
  {
    name: 'Product Designer',
    value: 'product_designer',
  },
  {
    name: 'Software Engineer',
    value: 'software_engineer',
  },
];
const countries = [
  {
    name: 'United States',
    value: 'usa',
  },
  {
    name: 'Bangladesh',
    value: 'bd',
  },
];
const timezones = [
  {
    name: 'Pacific Standard Time (PST) UTC-08:00',
    value: 'pst',
  },
  {
    name: 'Bangladesh Standard Time (BST) UTC+06:00',
    value: 'bst',
  },
];

// form zod validation schema
const personalInfoFormSchema = z.object({
  first_name: z.string().min(1, { message: 'Fist name is required' }),
  last_name: z.string().optional(),
  email: z.string().email({ message: 'Invalid email address' }),
  role: z.string({ required_error: 'Role is required' }),
  country: z.string({ required_error: 'Country is required' }),
  timezone: z.string().optional(),
  description: z.string().optional(),
});

// generate form types from zod validation schema
type PersonalInfoFormTypes = z.infer<typeof personalInfoFormSchema>;

export default function PersonalInfoView() {
  const imageRef = useRef<HTMLInputElement>(null);
  const [isLoading, setLoading] = useState(false);
  const [images, setImages] = useState<Array<File>>([]);
  const [profileImage, setProfileImage] = useState<
    UploadFileResponse[] | undefined
  >([]);
  const [reset, setReset] = useState({});

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = (event.target as HTMLInputElement).files;
    const newFiles = Object.entries(uploadedFiles as object)
      .map((file) => {
        if (file[1].type.includes('image')) return file[1];
      })
      .filter((file) => file !== undefined);
    setImages((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleImageDelete = (index: number) => {
    const updatedFiles = images.filter((_, i) => i !== index);
    setImages(updatedFiles);
    (imageRef.current as HTMLInputElement).value = '';
  };

  const onSubmit: SubmitHandler<PersonalInfoFormTypes> = (data) => {
    toast.success(<Text as="b">Successfully added!</Text>);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log('Profile settings data ->', {
        ...data,
        profileImages: profileImage?.[0],
      });
      setReset({
        first_name: '',
        last_name: '',
        email: '',
        role: '',
        country: '',
        timezone: '',
        description: '',
      });
    }, 600);
  };

  return (
    <>
      <Form<PersonalInfoFormTypes>
        validationSchema={personalInfoFormSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: {
            first_name: '',
            last_name: '',
            email: '',
            role: '',
            country: '',
            timezone: '',
            description: '',
          },
        }}
      >
        {({ register, control, formState: { errors } }) => {
          return (
            <>
              {console.log('errors', errors)}
              <div
                className={cn(
                  '-mx-5 flex items-center justify-between border-b border-gray-100 px-5 py-10 lg:-mx-8 lg:px-8 4xl:-mx-10 4xl:px-10'
                )}
              >
                <div>
                  <Title
                    as="h2"
                    className="mb-2 text-xl font-semibold text-gray-900"
                  >
                    회원정보
                  </Title>
                  <Text className="text-sm text-gray-500">
                    수정할 회원정보를 입력해주세요
                  </Text>
                </div>
              </div>

              <div className="w-full max-w-screen-2xl">
                <HorizontalFormBlockWrapper
                  title="이름"
                  titleClassName="text-base font-medium"
                >
                  <Input
                    placeholder=""
                    {...register('first_name')}
                    error={errors.first_name?.message}
                    className="flex-grow"
                  />
                  {/* <Input
                    placeholder="이름"
                    {...register('last_name')}
                    error={errors.last_name?.message}
                    className="flex-grow"
                  /> */}
                </HorizontalFormBlockWrapper>

                <HorizontalFormBlockWrapper
                  title="Email"
                  titleClassName="text-base font-medium"
                >
                  <Input
                    className="col-span-full"
                    prefix={
                      <PiEnvelopeSimple className="h-6 w-6 text-gray-500" />
                    }
                    type="email"
                    placeholder="@"
                    {...register('email')}
                    error={errors.email?.message}
                  />
                </HorizontalFormBlockWrapper>

                <HorizontalFormBlockWrapper
                  title={
                    <>
                      사진 <PiQuestion className="h4 w-4 text-gray-500" />
                    </>
                  }
                  titleClassName="flex gap-2 items-center"
                  description="사진을 올려주세요"
                >
                  <div className="flex flex-col gap-6 @container @3xl:col-span-2 @7xl:flex-row">
                    <figure className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full border border-gray-200">
                      <Image
                        src="https://isomorphic-furyroad.s3.amazonaws.com/public/profile-image.jpg"
                        className="aspect-square object-cover"
                        priority
                        alt="Profile avatar"
                        sizes="(max-width: 768px) 100vw"
                        fill
                      />
                    </figure>
                    <UploadDropzone
                      endpoint="imageUploader"
                      className="flex-grow"
                      appearance={{
                        button: 'bg-gray-700',
                        container:
                          'focus-within:ring-gray-700 border-gray-300 hover:border-gray-1000',
                        label: 'focus-within:ring-gray-700',
                      }}
                      onClientUploadComplete={(
                        res: UploadFileResponse[] | undefined
                      ) => {
                        setProfileImage(res);
                        toast.success(
                          <Text as="b" className="font-semibold">
                            Profile Photo updated
                          </Text>
                        );
                      }}
                      onUploadError={(error: Error) => {
                        console.error(error.message);
                        if (error.message === 'File limit exceeded') {
                          toast.error(
                            `Your cant't upload multiple file for profile picture`
                          );
                        } else {
                          toast.error(error.message);
                        }
                      }}
                    />
                  </div>
                </HorizontalFormBlockWrapper>

                <HorizontalFormBlockWrapper
                  title="판매자/관리자"
                  titleClassName="text-base font-medium"
                >
                  <Controller
                    control={control}
                    name="role"
                    render={({ field: { value, onChange } }) => (
                      <SelectBox
                        // @ts-ignore
                        placeholder={role[0].name}
                        options={role}
                        onChange={onChange}
                        value={value}
                        className="col-span-full"
                        getOptionValue={(option) => option.value}
                        displayValue={(selected) =>
                          role?.find((r) => r.value === selected)?.name ?? ''
                        }
                        error={errors?.role?.message as string}
                      />
                    )}
                  />
                </HorizontalFormBlockWrapper>

                <HorizontalFormBlockWrapper
                  title="회사주소"
                  titleClassName="text-base font-medium"
                >
                  <Controller
                    control={control}
                    name="country"
                    render={({ field: { onChange, value } }) => (
                      <SelectBox
                        // @ts-ignore
                        placeholder={countries[0].name}
                        options={countries}
                        onChange={onChange}
                        value={value}
                        className="col-span-full"
                        getOptionValue={(option) => option.value}
                        displayValue={(selected) =>
                          countries?.find((con) => con.value === selected)
                            ?.name ?? ''
                        }
                        error={errors?.country?.message as string}
                      />
                    )}
                  />
                </HorizontalFormBlockWrapper>

                <HorizontalFormBlockWrapper
                  title={
                    <>
                      시각 <PiQuestion className="h4 w-4 text-gray-500" />
                    </>
                  }
                  titleClassName="flex gap-2 items-center"
                >
                  <Controller
                    control={control}
                    name="timezone"
                    render={({ field: { onChange, value } }) => (
                      <SelectBox
                        prefix={<PiClock className="h-6 w-6 text-gray-500" />}
                        // @ts-ignore
                        placeholder={timezones[0].name}
                        options={timezones}
                        onChange={onChange}
                        value={value}
                        className="col-span-full"
                        getOptionValue={(option) => option.value}
                        displayValue={(selected) =>
                          timezones?.find((tmz) => tmz.value === selected)
                            ?.name ?? ''
                        }
                        error={errors?.timezone?.message as string}
                      />
                    )}
                  />
                </HorizontalFormBlockWrapper>

                <HorizontalFormBlockWrapper
                  title="설명"
                  titleClassName="text-base font-medium"
                >
                  <Controller
                    control={control}
                    name="description"
                    render={({ field: { onChange, value } }) => (
                      <QuillEditor
                        value={value}
                        onChange={onChange}
                        className="@3xl:col-span-2 [&>.ql-container_.ql-editor]:min-h-[100px] [&>.ql-toolbar]:3xl:overflow-x-auto"
                        labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                      />
                    )}
                  />
                </HorizontalFormBlockWrapper>

                <HorizontalFormBlockWrapper
                  title="Portfolio Projects"
                  description="Share a few snippets of your work"
                  className="border-0 pb-0"
                >
                  <div className="mb-5 @3xl:col-span-2">
                    {images.length ? (
                      <div
                        className={cn(
                          'mb-5 grid gap-5',
                          images.length === 2 ? 'grid-cols-2' : 'grid-cols-3'
                        )}
                      >
                        {images?.map((file: File, index: number) => (
                          <div
                            key={file.name}
                            className={cn(
                              'group relative min-h-[80px] w-full overflow-hidden rounded-md first:min-h-[300px] xs:min-h-[144px] xs:first:min-h-[424px]',
                              images.length !== 2 && 'first:col-span-3'
                            )}
                          >
                            <div className="absolute left-0 top-0 z-50 h-full w-full bg-black bg-opacity-40 opacity-0 backdrop-blur-md  transition-all group-hover:opacity-100 dark:bg-opacity-20"></div>
                            <Image
                              src={URL.createObjectURL(file)}
                              className="aspect-[193/144] object-cover"
                              priority
                              alt="Profile avatar"
                              sizes="(max-width: 768px) 100vw"
                              fill
                            />
                            <ActionIcon
                              onClick={() => handleImageDelete(index)}
                              size="sm"
                              variant="flat"
                              color="danger"
                              className="invisible absolute right-5 top-5 z-50 ms-auto flex-shrink-0 bg-gray-0 p-0 opacity-0 transition-all hover:enabled:bg-white group-hover:visible group-hover:opacity-100"
                            >
                              <PiTrashBold className="w-6" />
                            </ActionIcon>
                          </div>
                        ))}
                      </div>
                    ) : null}
                    <div>
                      <Upload
                        label={''}
                        ref={imageRef}
                        multiple
                        accept="img"
                        iconClassName="w-28 h-auto"
                        onChange={handleImageUpload}
                        className="mb-5 min-h-[200px] justify-center border-dashed bg-gray-50"
                      />

                      {images.length > 0 ? (
                        <FieldError error={'This field is required'} />
                      ) : null}
                    </div>
                  </div>
                </HorizontalFormBlockWrapper>
              </div>

              <div className="border-gary-300 sticky bottom-0 z-40 -mx-6 -mb-7 flex items-center justify-end gap-3 border-t bg-gray-0/10 px-10 py-5 backdrop-blur @lg:gap-4 @xl:grid @xl:auto-cols-max @xl:grid-flow-col 3xl:-mx-8 4xl:-mx-10">
                <Button variant="outline" className="w-full @xl:w-auto">
                  Cancel
                </Button>
                <Button
                  type="submit"
                  isLoading={isLoading}
                  className="w-full @xl:w-auto dark:bg-gray-100 dark:text-white"
                >
                  Save
                </Button>
              </div>
            </>
          );
        }}
      </Form>
    </>
  );
}
