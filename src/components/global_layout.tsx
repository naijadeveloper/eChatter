import { Readex_Pro } from "next/font/google";

// Without this package, when the page, any page is refreshed, there a flash of
// the incorrect theme, before the correct theme kicks in. This package delays
// a little bit the rendering of the UI on client until the localStorage is available
import { ThemeProvider } from "next-themes";

import { Toaster } from "react-hot-toast";

import { Provider } from "react-redux";
import store from "@/store";

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
  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark">
        <div className={`${readex.variable}`}>
          <main className="min-h-screen bg-gray-100 font-readex text-gray-800 dark:bg-gray-900 dark:text-gray-100">
            <Toaster />
            {children}
          </main>
        </div>
      </ThemeProvider>
    </Provider>
  );
}
