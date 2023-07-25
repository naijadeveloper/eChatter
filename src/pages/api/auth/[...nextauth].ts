import NextAuth, {NextAuthOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"
import environment_url from "@/utilities/check_env";

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
          const {email, password} = credentials as {email: string, password: string};
          // mongodb authorization
          // if authorized return user with all the user values from mongodb
          if(!email && !password) {
            throw new Error("Empty field");
          }

          const res = await fetch(`${environment_url}/api/users/login-user`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email,
              password
            }),
          });

          const user = await res.json();

          if (res.ok && user) {
            return {id: user?._id, name: user?.username, email: user?.email, verified: user?.verified, theme: user?.theme};
          }else {
            throw new Error(user?.error);
          }    
      },
    }),
  ],

  callbacks: {
    jwt(params: any) {
      if(params.user?.id) {params.token.id = params.user.id;}
      if(params.user?.verified) {params.token.verified = params.user.verified;}
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