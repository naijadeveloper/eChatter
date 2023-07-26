import NextAuth, {NextAuthOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"
import { auth_signUp } from "@/utilities/auth_functions";
import { auth_logIn } from "@/utilities/auth_functions";

export const authOptions: NextAuthOptions = {
  debug: process.env.NODE_ENV === "development",

  session: {
    strategy: "jwt"
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),

    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
          const {email, password, username, type} = credentials as {email: string, password: string, username: string, type: string};

          // mongodb authorization
          // handle `SIGN UP` if `type` is `signup`
          // handle `LOG IN` if `type` is `login`

          /////////////////////////////////////////////////////////////////////////////
          if(type && type === "signup") {
            if(!email || !password || !username) {
              throw new Error("Empty field");
            }

            // call auth_signUp function here
            try{
              const user = await auth_signUp(email, password, username);
              return user;
            }catch(error: any) {
              throw new Error(error?.message)
            }

          //////////////////////////////////////////////////////////////////////////////
          }else if(type && type === "login"){
            if(!email || !password) {
              throw new Error("Empty field");
            }

            // call auth_logIn function here
            try{
              const user = await auth_logIn(email, password);
              return user;
            }catch(error: any) {
              throw new Error(error?.message);
            }

          //////////////////////////////////////////////////////////////////////////////
          }else {
            throw new Error("Missing type");
          }    
      },
    }),
  ],

  callbacks: {
    jwt(params: any) {
      if(params.user?.id) {params.token.id = params.user.id;}
      //
      if(params.user?.verified) {params.token.verified = params.user.verified;}
      else {params.token.verified = false;}
      //
      if(params.user?.theme) {params.token.theme = params.user.theme;}
      // return modified token
      return params.token;
    },

    session({ session, token }) {
      if(session.user) {
        (session.user as { id: string }).id = token.id as string;
        (session.user as { verified: boolean }).verified = token.verified as boolean;
        (session.user as { theme: string }).theme = token.theme as string;
      }
      // return modified session
      return session;
    }
  },

  pages: {
    signIn: '/account/login',
  }
}

export default NextAuth(authOptions);