'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Password } from '@/components/ui/password';
import * as z from 'zod';
import { useEffect, useState } from 'react';
import { PiArrowRightBold } from 'react-icons/pi';
import Link from 'next/link';
import { routes } from '@/config/routes';
import { Title, Text } from '@/components/ui/text';
import { signIn, useSession } from 'next-auth/react';
import { SubmitHandler } from 'react-hook-form';
import { redirect, useSearchParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { set } from 'lodash';

const loginSchema = z.object({
  username: z.string().email({ message: 'Invalid username' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

type Login = z.infer<typeof loginSchema>;

const initialValues: Login = {
  username: 'admin@admin.com',
  password: 'admin',
};

export default function SignInForm() {

  const query = useSearchParams();
  const router = useRouter();
  console.log(query.get('error'))
  //TODO: why we need to reset it here
  const [reset, setReset] = useState({});
  console.log(process.env.AWS_REGION)

  const onSubmit: SubmitHandler<Login> = (data) => {
    console.log(data);
    signIn('credentials', {
      ...data,
    });
    // setReset({ email: "", password: "", isRememberMe: false });
  };
  useEffect(() => {
    if (query.get('error') === 'CredentialsSignin') {
      router.push('/signin?signin=error')
    } 
  },[query])

  useEffect(() => {
    if (query.get('signin') === 'error') {
      setReset({ email: "", password: "", isRememberMe: false })
      toast.error(
        <Text>
          Invalid username or password
        </Text>
      );
    } 
  },[query.get('signin')])

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
            <div className="flex items-center justify-between pb-2">
              <Link
                href={routes.auth.forgotPassword1}
                className="h-auto p-0 text-sm font-semibold text-clip underline transition-colors hover:text-gray-900 hover:no-underline"
              >
                ID를 잊으셨나요?
              </Link>
              <Link
                href={routes.auth.forgotPassword1}
                className="h-auto p-0 text-sm font-semibold text-clip underline transition-colors hover:text-gray-900 hover:no-underline" 
              >
                PW를 잊으셨나요?
              </Link>
            </div>
            <Button className="w-full" type="submit" size="lg" color="DEFAULT">
              <span>로그인</span>{' '}
              <PiArrowRightBold className="ms-2 mt-0.5 h-5 w-5" />
            </Button>
          </div>
        )}
      </Form>
      <Text className="mt-6 text-center leading-loose text-gray-500 lg:mt-8 lg:text-start">
        아직 회원가입을 안하셨다면?{' '}
        <Link
          href={routes.auth.signUp}
          className="font-semibold text-gray-700 transition-colors hover:text-blue"
        >
          회원가입
        </Link>
      </Text>
    </>
  );
}