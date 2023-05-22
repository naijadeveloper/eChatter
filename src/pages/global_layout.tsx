import { Readex_Pro } from "next/font/google";
import Image from "next/image";
import { useEffect } from "react";

import { useAppSelector, useAppDispatch } from "@/store/store_hooks";
import { changeTheme } from "@/store/theme_slice";

import { cookieStorage } from "@/utilities/cookie_storage";

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
  const dispatch = useAppDispatch();
  // Save the `theme` from `cookie` to `redux` to make available to every `page and component`
  useEffect(() => {
    const theme = cookieStorage.getItem("theme") ?? "dark";
    dispatch(changeTheme(theme));
  }, [dispatch]);

  return (
    <div
      className={`${useAppSelector((state) => state.theme.value)} ${
        readex.variable
      } font-readex`}
    >
      <main className="min-h-screen bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100">
        {children}

        <footer className="mx-auto mt-5 flex min-h-[100px] w-[80%] items-center max-lg:flex-col-reverse max-md:w-full">
          <div className="flex h-[200px] w-[200px] shrink-0 flex-col items-center justify-center">
            <Image
              src="/logo/echatter_logo.svg"
              width={800}
              height={600}
              alt="echatter logo"
            />
            <span className="-mt-5 block text-sm font-semibold text-gray-500">
              copyright &copy; 2023, eChatter
            </span>
          </div>

          <div className="relative flex w-full grow items-center max-lg:top-8">
            <ul className="flex w-full flex-wrap justify-evenly gap-4 px-1 text-gray-500">
              <li className="wel-footer-links">What is eChatter?</li>
              <li className="wel-footer-links">Worktabs</li>
              <li className="wel-footer-links">Tools</li>
              <li className="wel-footer-links">Issues</li>
              <li className="wel-footer-links">Terms</li>
              <li className="wel-footer-links">Privacy Policy</li>
              <li className="wel-footer-links">Cookie Policy</li>
            </ul>
          </div>
        </footer>
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
