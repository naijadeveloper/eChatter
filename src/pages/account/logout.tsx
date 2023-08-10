import { signOut, useSession } from "next-auth/react";

import dynamic from "next/dynamic";

import Footer from "@/components/Footer";
const ThemeSwitch = dynamic(() => import("@/components/ThemeSwitch"), {
  ssr: false,
});

import environment_url from "@/utilities/check_env";

export default function logOut() {
  const { data: session } = useSession();
  return (
    <>
      <div className="absolute right-3 top-3">
        <ThemeSwitch />
      </div>

      <div className="flex min-h-[500px] flex-col items-center justify-center">
        <div title="https://www.flaticon.com/free-icons/cry">
          <img src="/pngs/baby.png" alt="cry icons" className="w-[150px]" />
        </div>

        <p className="flex items-center justify-center">
          Please stay a little longer
        </p>

        <p className="mx-auto w-[70%] text-center">
          You are currently logged in as{" "}
          <span className="font-bold">{session?.user.name}</span> using the
          email <span className="font-bold">{session?.user.email}</span>
        </p>
        <button
          onClick={() => signOut()}
          className="mt-3 rounded bg-maingreen-300 p-2 px-4 text-gray-100 dark:bg-maingreen-200 dark:text-gray-800"
        >
          Log Out
        </button>
      </div>

      <Footer />
    </>
  );
}

logOut.auth = true;
