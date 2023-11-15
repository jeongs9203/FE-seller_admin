'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Password } from '@/components/ui/password';
import * as z from 'zod';
import { useState } from 'react';
import { PiArrowRightBold } from 'react-icons/pi';
import Link from 'next/link';
import { routes } from '@/config/routes';
import { Title, Text } from '@/components/ui/text';
import { signIn } from 'next-auth/react';
import { SubmitHandler } from 'react-hook-form';

const loginSchema = z.object({
  username: z.string().email({ message: 'Invalid username' }),
  password: z.string().min(1, { message: 'Password is required' }),
  remember: z.boolean(),
});

type Login = z.infer<typeof loginSchema>;

const initialValues: Login = {
  username: 'admin@admin.com',
  password: 'admin',
  remember: true,
};

export default function SignInForm() {
  //TODO: why we need to reset it here

  console.log(process.env.NEXT_PUBLIC_AWS_REGION)
  const [reset, setReset] = useState({});

  const onSubmit: SubmitHandler<Login> = (data) => {
    console.log(data);
    signIn('credentials', {
      ...data,
    });
    // setReset({ email: "", password: "", isRememberMe: false });
  };

  return (
    <>
      <Form<Login>
        validationSchema={loginSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialValues,
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-5">
            <Input
              type="email"
              size="lg"
              label="Email"
              placeholder="Enter your email"
              color="info"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              {...register('username')}
              error={errors.username?.message}
            />
            <Password
              label="Password"
              placeholder="Enter your password"
              size="lg"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              color="info"
              {...register('password')}
              error={errors.password?.message}
            />
            
            <Button className="w-full" type="submit" size="lg" color="DEFAULT">
              <span>로그인</span>{' '}
              <PiArrowRightBold className="ms-2 mt-0.5 h-6 w-6" />
            </Button>
          </div>
        )}
      </Form>
      <div className="flex items-center justify-center gap-5 py-5 md:justify-start">
              <Link
                href={routes.auth.forgotPassword1}
                className="h-auto p-0 text-sm font-semibold text-blue underline transition-colors hover:text-gray-900 hover:no-underline"
              >
                아이디 찾기
              </Link>
              <Link
                href={routes.auth.forgotPassword1}
                className="h-auto p-0 text-sm font-semibold text-blue underline transition-colors hover:text-gray-900 hover:no-underline"
              >
                패스워드 찾기
              </Link>
            </div>
      <Text className="mt-6 text-center leading-loose text-gray-500 lg:mt-8 md:text-start">
        아직 회원가입을 안하셨나요?{' '}
        <Link
          href={routes.auth.signUp}
          className="font-semibold text-gray-700 transition-colors hover:text-blue"
        >
          회원가입하기
        </Link>
      </Text>
    </>
  );
}
