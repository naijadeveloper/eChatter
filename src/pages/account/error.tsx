import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import { useSession } from "next-auth/react";

const ThemeSwitch = dynamic(() => import("@/components/ThemeSwitch"), {
  ssr: false,
});

export default function authErrorPage() {
  const router = useRouter();
  const { status } = useSession();

  if (status === "authenticated") {
    router.back();
  }
  return (
    <>
      <div className="absolute right-3 top-3">
        <ThemeSwitch />
      </div>

      <div className="flex h-screen flex-col items-center justify-center gap-y-3">
        <a href="#" title="https://www.flaticon.com/free-icons/error">
          <img
            src="/pngs/warning.png"
            alt="error icons"
            className="w-[300px]"
          />
        </a>
        <p className="mx-auto text-center text-4xl sm:w-[85%] md:w-[70%]">
          AN ERROR OCCURRED WITH THE SIGNUP/LOGIN PROCESS!!
        </p>
      </div>
    </>
  );
}