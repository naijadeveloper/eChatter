import { Readex_Pro } from "next/font/google";
import { useEffect } from "react";

import { useAppSelector, useAppDispatch } from "@/store/store_hooks";
import { changeTheme } from "@/store/theme_slice";

// Global font
const readex = Readex_Pro({
  subsets: ["latin"],
  variable: "--global-font",
});

export default function GlobalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let dispatch = useAppDispatch();

  // Why did I use localStorage here? well, I tried using it in the store `theme_slice.ts` but that generates an error `Reference error: localStorage is not defined` because nextjs renders on the server first and localStorage doesn't exist there. That is the reason for this hack
  useEffect(() => {
    let themeStorage = localStorage.getItem("theme") ?? "dark";
    dispatch(changeTheme(themeStorage));
  }, []);

  return (
    <div
      className={`${useAppSelector((state) => state.theme.value)} ${
        readex.variable
      } font-readex`}
    >
      <main className="min-h-screen bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100">
        {children}
      </main>
    </div>
  );
}

// call getServerSideProps and return req.header.cookie
// get that as a prop above and check cookie for the theme if exist, so the dark class is added or removed before pages are sent to the browser
