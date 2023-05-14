import { Readex_Pro } from "next/font/google";

import { useAppSelector } from "@/store/store_hooks";

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
  // Here, I don't need the type for the state.
  const theme = useAppSelector((state) => state.theme.value);
  return (
    <div className={`${theme} ${readex.variable} font-readex`}>
      <main className="min-h-screen">{children}</main>
    </div>
  );
}

// call getServerSideProps and return req.header.cookie
// get that as a prop above and check cookie for the theme if exist, so the dark class is added or removed before pages are sent to the browser
