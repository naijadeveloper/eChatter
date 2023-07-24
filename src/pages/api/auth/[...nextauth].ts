import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"
import environment_url from "@/utilities/check_env";

export default NextAuth({
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
            return user;
          }else {
            throw new Error(user?.error);
          }    
      },
    })
  ],

  pages: {
    signIn: '/account/login',
  }
});