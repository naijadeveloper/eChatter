import { Readex_Pro } from "next/font/google";

import { ThemeProvider } from "next-themes";

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
    <ThemeProvider defaultTheme="dark">
      <div className={`${readex.variable}`}>
        <main className="min-h-screen bg-gray-100 font-readex text-gray-800 dark:bg-gray-900 dark:text-gray-100">
          {children}
        </main>
      </div>
    </ThemeProvider>
  );
}
