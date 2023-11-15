'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Password } from '@/components/ui/password';
import { SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import * as z from 'zod';
import { useState } from 'react';
import { Title, Text } from '@/components/ui/text';
import { routes } from '@/config/routes';
import Link from 'next/link';

type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

const initialValues = {
  email: '',
  password: '',
  confirmPassword: '',
};

const signInFormSchema = z.object({
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
});

export default function ForgetPasswordForm() {
  const [reset, setReset] = useState({});

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    setReset(initialValues);
  };

  return (
    <>
      <Form<FormValues>
        validationSchema={signInFormSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialValues,
        }}
        className="pt-1.5"
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-6">
            <Input
              type="email"
              size="lg"
              label="Email"
              placeholder="Enter your email"
              className="[&>label>span]:font-medium"
              color="info"
              inputClassName="text-sm"
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
            <Password
              label="Confirm Password"
              placeholder="Enter confirm password"
              size="lg"
              className="[&>label>span]:font-medium"
              color="info"
              inputClassName="text-sm"
              {...register('confirmPassword')}
              error={errors.confirmPassword?.message}
            />
            <Button
              className="mt-2 w-full"
              type="submit"
              size="lg"
              color="DEFAULT"
            >
              비밀번호 찾기
            </Button>
          </div>
        )}
      </Form>
      <Text className="mt-6 text-center text-[15px] leading-loose text-gray-500 lg:mt-8 lg:text-start xl:text-base">
        비밀번호 찾는걸 원하지 않으신다면?{' '}
        <Link
          href={routes.auth.signIn}
          className="font-bold text-gray-700 transition-colors hover:text-blue"
        >
          로그인하기
        </Link>
      </Text>
    </>
  );
}
