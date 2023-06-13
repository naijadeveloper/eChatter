import { GetServerSidePropsContext } from "next";
import { Readex_Pro } from "next/font/google";

import { ThemeProvider } from "next-themes";

import { cookieStorage } from "@/utilities/cookie_storage";

import Footer from "@/components/Footer";

// Global font
const readex = Readex_Pro({
  subsets: ["latin"],
  variable: "--global-font",
});

export default function GlobalLayout({
  cookies,
  children,
}: {
  cookies: string;
  children: React.ReactNode;
}) {
  const globalTheme: string =
    cookieStorage.getFromString(cookies, "theme") ?? "dark";

  return (
    <ThemeProvider defaultTheme={globalTheme}>
      <div className={`${readex.variable}`}>
        <main className="min-h-screen bg-gray-100 font-readex text-gray-800 dark:bg-gray-900 dark:text-gray-100">
          {children}
          <Footer />
        </main>
      </div>
    </ThemeProvider>
  );
}

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  return {
    props: {
      // first time users will not have any cookies
      // undefined here, hence ?? is necessary
      cookies: req.headers.cookie ?? "dark",
    },
  };
}
