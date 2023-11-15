import { DefaultSession } from 'next-auth';
import 'next-auth/jwt';
export interface authorities {
    authority: string;
}

declare module 'next-auth' {
  interface Session {
        user: {
            accessToken: string,
            refreshToken: string,
            vendorEmail: string,
            brandName: string,
            brandLogoImageUrl: string,
            authorities: authorities[],
        } & DefaultSession["user"]
    }
}

// declare module 'next-auth/jwt' {
//   /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
//   interface JWT {
//     /** OpenID ID Token */
//     idToken?: string;
//   }
// }
