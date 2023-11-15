import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import { pagesOptions } from './pages-options';

export const authOptions: NextAuthOptions = {
  // debug: true,
  pages: {
    ...pagesOptions,
  },
  callbacks: {
    async jwt({token, user}) {
      return {...token, ...user}
    },
    async session({ session, token }){
      session.user = token as any;
      return session;
    },
    async redirect({ url, baseUrl }) {
      const parsedUrl = new URL(url, baseUrl);
      if (parsedUrl.searchParams.has('callbackUrl')) {
        return `${baseUrl}${parsedUrl.searchParams.get('callbackUrl')}`;
      }

      if (parsedUrl.searchParams.has('signin')) {
        return `${baseUrl}${parsedUrl.searchParams.get('signin')}`;
      }
      if (parsedUrl.origin === baseUrl) {
        return url;
      }
      return baseUrl;
    },
  },
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {},
      async authorize(credentials: any) {
        
        console.log('credentials', credentials)
        const data:any = await fetch('https://gentledog-back.duckdns.org/api/v1/vendor/signin', {
          method: 'POST',
          headers: {  'Content-Type': 'application/json' },
          body: JSON.stringify({
            vendorEmail: credentials.username,
            password: credentials.password,
          }),
        });

        const result:any = await data.json();
        if (result.isSuccess) {
          console.log("Good")
          console.log(result.result)
          const res:any = {
            accessToken: result.result.accessToken,
            refreshToken: result.result.refreshToken,
            vendorEmail: result.result.vendorEmail,
            brandName: result.result.brandName,
            brandLogoImageUrl: result.result.brandLogoImageUrl,
            authorities: result.result.authorities,
          }
        
          // const result: any = {
          //   accessToken: '1abckdkakaldasdkdkdkdkdkd',
          //   refreshToken: 'adsf;kjalsdkf;lkajsdfljiejoajsdf',
          //   vendorEmail: 'beat1103@gmail.com',
          //   brandName: 'gentledog',
          //   brandLogoImageUrl: 'jason',
          //   authorities: [
          //     { authority: 'Admin' },
          //   ],
          // }
          // const data = await fetch('http://localhost:8080/api/v1/auth/login', {
          //   method: 'POST',
          //   headers: {  'Content-Type': 'application/json' },
          //   body: JSON.stringify(credentials),
          // } as any)
          // console.log('data', data)
          return res;
        } 
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      allowDangerousEmailAccountLinking: true,
    }),
  ],
};
