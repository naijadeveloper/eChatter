import { GetServerSidePropsContext } from "next";
import { Readex_Pro } from "next/font/google";

import { ThemeProvider } from "next-themes";
import { useTheme } from "next-themes";

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
  const { resolvedTheme } = useTheme();
  const globalTheme: string =
    cookieStorage.getFromString(cookies, "theme") ?? "dark";

  return (
    <ThemeProvider enableSystem={true} defaultTheme={globalTheme}>
      <div>
        <main
          className={`min-h-screen bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100 ${readex.variable} font-readex`}
        >
          {children}
          <Footer />
        </main>

        {/* The tailwind `dark:` classes won't work on scrollbar, that's the reason for this hack */}
        <style jsx>
          {`
            ${resolvedTheme == "dark" &&
            `
           *::-webkit-scrollbar-track {background: #111827;}

           *::-webkit-scrollbar-thumb {
              border: 1px solid #111827; 
              border-top-width: 3px; 
              border-bottom-width: 3px;
            }`}
          `}
        </style>
      </div>
    </ThemeProvider>
  );
}

// also export a reusable function getServerSideProps
export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  return {
    props: {
      // first time users will not have any cookies
      // undefined here, hence ?? is necessary
      cookies: req.headers.cookie ?? "dark",
    },
  };
}
