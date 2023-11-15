import ForgetPasswordForm from './forget-password-form';
import UnderlineShape from '@/components/shape/underline';
import Image from 'next/image';
import AuthWrapperOne from '@/app/shared/auth-layout/auth-wrapper-one';

export default function SignIn() {
  return (
    <AuthWrapperOne
      title={
        <>
          <span className="relative inline-block">
            비밀번호 찾기
            {/* <UnderlineShape className="absolute -bottom-2 end-0 h-2.5 w-28 text-blue xl:-bottom-1.5 xl:w-36" /> */}
          </span>
        </>
      }
      bannerTitle="The simplest way to manage your workspace."
      bannerDescription="Amet minim mollit non deserunt ullamco est sit aliqua dolor do
      amet sint velit officia consequat duis."
    >
      <ForgetPasswordForm />
    </AuthWrapperOne>
  );
}
