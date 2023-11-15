import SignInForm from './sign-in-form';
import AuthWrapperOne from '@/app/shared/auth-layout/auth-wrapper-one';
import UnderlineShape from '@/components/shape/underline';

export default function SignIn() {

  return (
    <AuthWrapperOne
      title={
        <>
          <span className="relative inline-block">
            Welcome to GENTLEDOG 
            <UnderlineShape className="absolute bottom-0 start-0 h-3 w30 text-blue md:w-40 xl:-start-2 xl:bottom-0 xl:w-60" />
          </span><br/>개신사 관리자페이지입니다.{' '}
         
        </>
      }
      description="GentleDog 벤더사 관리자페이지입니다."
      bannerTitle="The simplest way to manage your workspace."
      bannerDescription="Amet minim mollit non deserunt ullamco est sit aliqua dolor do
      amet sint velit officia consequat duis."
      isSocialLoginActive={true}
    >
      <SignInForm />
    </AuthWrapperOne>
  );
}
