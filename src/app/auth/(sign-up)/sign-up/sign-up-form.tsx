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
import { useState } from 'react';
import { PiArrowRightBold } from 'react-icons/pi';
import { routes } from '@/config/routes';

type FormValues = {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  confirmPassword: string;
  isAgreed: boolean;
};

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  isAgreed: false,
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

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    setReset({ ...initialValues, isAgreed: false });
  };

  return (
    <>
      <Form<FormValues>
        validationSchema={signUpFormSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialValues,
        }}
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
              {...register('firstName')}
              error={errors.firstName?.message}
            />
            <Input
              type="text"
              size="lg"
              label="공식홈페이지 주소"
              // placeholder="Enter your last name"
              className="[&>label>span]:font-medium"
              color="info"
              inputClassName="text-sm"
              {...register('lastName')}
              error={errors.lastName?.message}
            />
            <Input
              type="text"
              size="lg"
              label="회사 상품소개 및 관련내용"
              // placeholder="Enter your last name"
              className="[&>label>span]:font-medium"
              color="info"
              inputClassName="text-sm"
              {...register('lastName')}
              error={errors.lastName?.message}
            />
            <Input
              type="text"
              size="lg"
              label="회사명"
              // placeholder="Enter your last name"
              className="[&>label>span]:font-medium"
              color="info"
              inputClassName="text-sm"
              {...register('lastName')}
              error={errors.lastName?.message}
            />
            <Input
              type="text"
              size="lg"
              label="사업자 등록번호"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              color="info"
              placeholder="Enter your pin"
              {...register('email')}
              error={errors.email?.message}
            />
            <Input
              type="text"
              size="lg"
              label="사업장 주소"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              color="info"
              placeholder="Enter your add"
              {...register('email')}
              error={errors.email?.message}
            />
            <Input
              type="text"
              size="lg"
              label="대표자명"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              color="info"
              placeholder="Enter your name"
              {...register('email')}
              error={errors.email?.message}
            />
                        <Input
              type="number"
              size="lg"
              label="전화번호"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              color="info"
              placeholder="Enter your number"
              {...register('email')}
              error={errors.email?.message}
            />
                        <Input
              type="number"
              size="lg"
              label="휴대전화"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              color="info"
              placeholder="Enter your number"
              {...register('email')}
              error={errors.email?.message}
            />
            <Input
              type="email"
              size="lg"
              label="이메일"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              color="info"
              placeholder="Enter your email"
              {...register('email')}
              error={errors.email?.message}
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
            <Input
              type="text"
              size="lg"
              label="통신 판매업 신고번호"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              color="info"
              placeholder="Enter your pin"
              {...register('email')}
              error={errors.email?.message}
            />
                        <Input
              type="date"
              size="lg"
              label="개업일자"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              color="info"
              placeholder="Enter your date"
              {...register('email')}
              error={errors.email?.message}
            />
                        <Input
              type="text"
              size="lg"
              label="사업체 분류"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              color="info"
              placeholder="Enter your category"
              {...register('email')}
              error={errors.email?.message}
            />           
            {/* <Password
              label="Confirm Password"
              placeholder="Enter confirm password"
              size="lg"
              className="[&>label>span]:font-medium"
              color="info"
              inputClassName="text-sm"
              {...register('confirmPassword')}
              error={errors.confirmPassword?.message}
            /> */}
            <div className="col-span-2 flex items-start ">
              <Checkbox
                {...register('isAgreed')}
                className="[&>label>span]:font-medium [&>label]:items-start"
                label={
                  <>
                    마케팅 및 광고성 활용 수신동의{' '}
                    <Link
                      href="/"
                      color='red'
                      className="font-medium text-blue transition-colors hover:underline"
                    >
                      수신
                    </Link>{' '}
                    &{' '}
                    <Link
                      href="/"
                      className="font-medium text-blue transition-colors hover:underline"
                    >
                      동의
                    </Link>
                  </>
                }
              />
            </div>
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
