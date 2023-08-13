import NextAuth, {NextAuthOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials"
import { auth_cred_signUp } from "@/utilities/auth_functions";
import { auth_cred_logIn } from "@/utilities/auth_functions";
import { auth_google_logIn } from "@/utilities/auth_functions";

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

    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_CLIENT_ID!,
    //   clientSecret: process.env.FACEBOOK_CLIENT_SECRET!
    // }),

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
              const user = await auth_cred_signUp(email, password, username);
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
              const user = await auth_cred_logIn(email, password);
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
    async signIn({ user, account, profile }) {
      // user object => id: string, name: string, email: string, image: urlString
      // account object => provider: string
      // profile object => email: string, email_verified: true, name: 'Enoch Enujiugha', picture: urlString, given_name: 'Enoch', family_name: 'Enujiugha',
      if(account?.provider === "google") {
        try{
          let id = (user as {id: string})?.id || (profile as {sub: string})?.sub;
          let email = (user as {email: string})?.email;
          let name = (user as {name: string})?.name;
          let given_name = (profile as {given_name: string})?.given_name;
          let family_name = (profile as {family_name: string})?.family_name;
          let image = user?.image || (profile as {picture: string})?.picture;

          const neededValues = { id, email, name, given_name, family_name, image };

          // pass all that to the auth_google_login function and await its results
          const returnedUser = await auth_google_logIn(neededValues);
          user.id = returnedUser?.id;
          user.name = returnedUser?.username;
          user.verified = returnedUser?.verified;
          user.theme = returnedUser?.theme;
          user.category_interests = returnedUser?.category_interests;
          return true;
        }catch(error) {
          return "/account/error";
        }
      }
      return true;
    },

    jwt(params: any) {
      if(params.user?.id) {params.token.id = params.user.id;}
      if(params.user?.verified) {params.token.verified = params.user.verified ?? false;}
      if(params.user?.theme) {params.token.theme = params.user.theme;}
      if(params.user?.category_interests) {params.token.category_interests = params.user.category_interests;}
      //
      
      if (params.trigger === "update" && params.session?.verified) {
        params.token.verified = params.session?.verified;
      }
      // return modified token
      return params.token;
    },

    session({ session, token }) {
      if(session.user) {
        (session.user as { id: string }).id = token.id as string;
        (session.user as { verified: boolean }).verified = token.verified as boolean;
        (session.user as { theme: string }).theme = token.theme as string;
        (session.user as {category_interests: string[]}).category_interests = token.category_interests as string[];
      }
      // return modified session
      return session;
    }
  },

  pages: {
    signIn: "/account/login",
    signOut: '/account/logout',
    error: "/account/error"
  }
}

export default NextAuth(authOptions);