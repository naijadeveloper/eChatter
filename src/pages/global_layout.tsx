import { Readex_Pro } from "next/font/google";
import { useEffect } from "react";

import { GetServerSideProps } from "next";

import { useAppSelector, useAppDispatch } from "@/store/store_hooks";
import { changeTheme } from "@/store/theme_slice";

import { cookieStorage } from "@/utilities/cookie_storage";

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
  const dispatch = useAppDispatch();
  let theme = cookieStorage.getFromString(cookies, "theme") ?? "dark";
  // Save the `theme` from `cookie` to `redux` to make available to every `page and component`
  useEffect(() => {
    dispatch(changeTheme(theme));
  }, [dispatch]);

  return (
    <div
      className={`${
        typeof window == "undefined"
          ? theme
          : useAppSelector((state) => state.theme.value)
      } ${readex.variable} font-readex`}
    >
      <main className="min-h-screen bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100">
        {children}
      </main>

      {/* The tailwind `dark:` classes won't work on scrollbar, that's the reason for this hack */}
      <style jsx>
        {`
          ${useAppSelector((state) => state.theme.value) == "dark" &&
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
  );
}

// For server-side rendered sites, like Nextjs, you want to know the color preference / theme of a user upfront so you can avoid rendering the initial color mode / theme and then changing it during hydration (so-called flashing).

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      cookies: context?.req.headers.cookie ?? "",
    },
  };
};
