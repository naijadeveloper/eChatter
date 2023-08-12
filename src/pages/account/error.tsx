import type { GetServerSidePropsContext } from "next";

import dynamic from "next/dynamic";

const ThemeSwitch = dynamic(() => import("@/components/ThemeSwitch"), {
  ssr: false,
});

export default function authErrorPage() {
  return (
    <>
      <div className="absolute right-3 top-3">
        <ThemeSwitch />
      </div>

      <div className="flex h-screen flex-col items-center justify-center gap-y-3">
        <div title="https://www.flaticon.com/free-icons/error">
          <img
            src="/pngs/warning.png"
            alt="error icons"
            className="w-[300px]"
          />
        </div>
        <p className="mx-auto text-center text-4xl sm:w-[85%] md:w-[70%]">
          AN ERROR OCCURRED WITH THE SIGNUP/LOGIN PROCESS!!
        </p>
      </div>
    </>
  );
}

// I only want this page to be accessed when the user clicks a button/link
// but if the user navigates to this url from the search bar
// it should show 404 page
export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  const referer = req.headers.referer || null;

  if (!referer) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      referer,
    },
  };
}
