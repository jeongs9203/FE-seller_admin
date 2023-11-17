'use client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Password } from '@/components/ui/password';
import { Checkbox } from '@/components/ui/checkbox';
import { SubmitHandler } from 'react-hook-form';
import { Title, Text } from '@/components/ui/text';
import Link from 'next/link';
import { Form } from '@/components/ui/form';
import * as z from 'zod';
import React, { useEffect, useRef, useState } from 'react'
import { PiArrowRightBold } from 'react-icons/pi';
import { routes } from '@/config/routes';
import { SellerSignUpType } from 'types/seller/seller';
import { Textarea } from 'rizzui';
import FileUploadImage from '@/app/shared/file-upload_image';
import Upload from '@/components/ui/upload';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import DaumPostcode from 'react-daum-postcode';

const initialValues = {
  vendorEmail: '',
  businessNumber: '',
  password: '',
  confirmPassword: '',
  mailOrderNumber: '',
  brandName: '',
  brandLogoImageUrl: '',
  brandContent: '',
  homepageUrl: '',
  businessType: '',
  companyName: '',
  companyAddress: '',
  openedAt: '',
  vendorName: '',
  callCenterNumber: '',
  managerName: '',
  managerPhoneNumber: ''
};

const signUpFormSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is require' }),
  lastName: z.string().optional(),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be 8 or more characters long' })
    .max(32, { message: 'Password must be a maximum of 32 characters long' })
    .regex(new RegExp('.*[A-Z].*'), {
      message: 'At least one uppercase character',
    })
    .regex(new RegExp('.*[a-z].*'), {
      message: 'At least one lowercase character',
    })
    .regex(new RegExp('.*\\d.*'), { message: 'At least one number' }),
  confirmPassword: z
    .string()
    .regex(new RegExp('.*[A-Z].*'), {
      message: 'At least one uppercase character',
    })
    .regex(new RegExp('.*[a-z].*'), {
      message: 'At least one lowercase character',
    })
    .regex(new RegExp('.*\\d.*'), { message: 'At least one number' })
    .min(8, { message: 'Password must be 8 or more characters long' })
    .max(32, { message: 'Password must be a maximum of 32 characters long' }),
  isAgreed: z.boolean(),
});

export default function SignUpForm() {
  const [reset, setReset] = useState({});
  const router = useRouter();
  const onSubmit: SubmitHandler<SellerSignUpType> = async (data) => {

    console.log(data);
    try {
      const response = await fetch(`${process.env.BASE_API_URL}api/v1/vendor/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          vendorEmail: data.vendorEmail,
          businessNumber: data.businessNumber,
          password: data.password,
          mailOrderNumber: data.mailOrderNumber,
          brandName: data.brandName,
          brandLogoImageUrl: "http://test.com",
          brandContent: data.brandContent,
          homepageUrl: data.homepageUrl,
          businessType: data.businessType,
          companyName: data.companyName,
          companyAddress: data.companyAddress,
          openedAt: data.openedAt,
          vendorName: data.brandName,
          callCenterNumber: data.callCenterNumber,
          managerName: data.managerName,
          managerPhoneNumber: data.managerPhoneNumber
        }),
      });
    
      const responseData:any = await response.json();
      console.log(responseData);
      if(responseData?.isSuccess) {
        toast.success(
          <Text>
            회원가입이 완료되었습니다.
          </Text>
        )}

        router.push('/signin')
    
    } catch (error) {
      console.error(error);
      setReset({ ...initialValues, isAgreed: false });
    }
  };

  const handleClick = () => {
    open(undefined as any);
  };

  return (
    <>
      <Form<SellerSignUpType>
        resetValues={reset}
        onSubmit={onSubmit}
        // useFormProps={{
        //   defaultValues: initialValues,
        // }}
      >
        {({ register, formState: { errors } }) => (
          <div className="flex flex-col gap-x-4 gap-y-5 md:grid md:grid-cols-2 lg:gap-5">
            <Input
              type="text"
              size="lg"
              label="브랜드 명"
              // placeholder="Enter your first name"
              className="[&>label>span]:font-medium"
              color="info"
              inputClassName="text-sm"
              {...register('brandName')}
              error={errors.brandName?.message}
            />
            <Input
              type="text"
              size="lg"
              label="공식홈페이지 주소"
              // placeholder="Enter your last name"
              className="[&>label>span]:font-medium"
              color="info"
              inputClassName="text-sm"
              {...register('homepageUrl')}
              error={errors.homepageUrl?.message}
            />
            
              <FileUploadImage 
                label = "회사로고 이미지"
                className = "col-span-2"
                multiple = {false}
                {...register('brandLogoImageUrl')}
              />
           
            <Textarea
              size="lg"
              label="회사 상품소개 및 관련내용"
              // placeholder="Enter your last name"
              className="[&>label>span]:font-medium col-span-2"
              color="info"
              {...register('brandContent')}
              error={errors.brandContent?.message}
            />
            <Input
              type="text"
              size="lg"
              label="회사명"
              // placeholder="Enter your last name"
              className="[&>label>span]:font-medium"
              color="info"
              inputClassName="text-sm"
              {...register('companyName')}
              error={errors.companyName?.message}
            />
            <Input
              type="text"
              size="lg"
              label="사업자 등록번호"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              color="info"
              placeholder="Enter your pin"
              {...register('businessNumber')}
              error={errors.businessNumber?.message}
            />
            <div className='flex-col'>
              <Input
                type="text"
                size="lg"
                label="사업장 주소"
                className="[&>label>span]:font-medium"
                inputClassName="text-sm"
                color="info"
                placeholder="Enter your add"
                {...register('companyAddress')}
                error={errors.companyAddress?.message}
                />
              <div className='flex-col w-full'>
                <DaumPostcode className="" autoClose/>
                <Button className="w-1/4 min-w-[110px]" onClick={handleClick}>
                확인
                </Button>
              </div>
            </div>
            <Input
              type="text"
              size="lg"
              label="대표자명"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              color="info"
              placeholder="Enter your name"
              {...register('managerName')}
              error={errors.managerName?.message}
            />
            <Input
              type="text"
              size="lg"
              label="전화번호"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              color="info"
              placeholder="Enter your number"
              {...register('callCenterNumber')}
              error={errors.callCenterNumber?.message}
            />
            <Input
              type="text"
              size="lg"
              label="휴대전화"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              color="info"
              placeholder="Enter your number"
              {...register('managerPhoneNumber')}
              error={errors.managerPhoneNumber?.message}
            />
            <Input
              type="email"
              size="lg"
              label="이메일"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              color="info"
              placeholder="Enter your email"
              {...register('vendorEmail')}
              error={errors.vendorEmail?.message}
            />
            <Password
              label="Password"
              placeholder="Enter your password"
              size="lg"
              className="[&>label>span]:font-medium"
              color="info"
              inputClassName="text-sm"
              {...register('password')}
              error={errors.password?.message}
            />
            <Password
              label="Confirm Password"
              placeholder="Enter your confirm password"
              size="lg"
              className="[&>label>span]:font-medium"
              color="info"
              inputClassName="text-sm"
              {...register('password')}
              error={errors.password?.message}
            />
            <Input
              type="text"
              size="lg"
              label="통신 판매업 신고번호"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              color="info"
              placeholder="Enter your pin"
              {...register('mailOrderNumber')}
              error={errors.mailOrderNumber?.message}
            />
            <Input
              type="date"
              size="lg"
              label="개업일자"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              color="info"
              placeholder="Enter your date"
              {...register('openedAt')}
              error={errors.openedAt?.message}
            />
            <Input
              type="text"
              size="lg"
              label="사업체 분류"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              color="info"
              placeholder="Enter your category"
              {...register('businessType')}
              error={errors.businessType?.message}
            />           
            <Button
              size="lg"
              color="DEFAULT"
              type="submit"
              className="col-span-2 mt-2"
            >
              <span>회원가입</span>{' '}
              <PiArrowRightBold className="ms-2 mt-0.5 h-5 w-5" />
            </Button>
          </div>
        )}
      </Form>
      <Text className="mt-6 text-center leading-loose text-gray-500 lg:mt-8 lg:text-start">
        이미 가입되어 있으시다면?{' '}
        <Link
          href={routes.auth.signIn}
          className="font-semibold text-gray-700 transition-colors hover:text-blue"
        >
          로그인하기
        </Link>
      </Text>
    </>
  );
}