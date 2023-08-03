import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import GlobalLayout from "@/components/global_layout";
import "@/styles/globals.css";
// Auth imports
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import LoadingSpinner from "@/components/LoadingSpinner";

// To add the auth as a possible property for
// all components (typescript problem)
import type { NextComponentType } from "next"; //Import Component type
//Add custom appProp type then use union to add it
type CustomAppProps = AppProps & {
  Component: NextComponentType & { auth?: boolean }; // add auth type
};

export default function App({ Component, pageProps }: CustomAppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <GlobalLayout>
        {Component.auth ? (
          <Auth>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
      </GlobalLayout>
    </SessionProvider>
  );
}

function Auth({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      router.push("/account/login");
    },
  });

  // session is still loading, let user know
  if (status === "loading") {
    return <LoadingSpinner />;
  }

  return <>{children}</>;
}
