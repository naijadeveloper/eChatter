import Image from "next/image";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdArrowDropDown } from "react-icons/md";

import dynamic from "next/dynamic";

const ThemeSwitch = dynamic(() => import("@/components/ThemeSwitch"), {
  ssr: false,
});

export default function userFeeds() {
  return (
    <>
      <header className="sticky top-0 z-50 mx-auto flex flex-col justify-center overflow-visible bg-gray-100 dark:bg-gray-900">
        <div className="flex w-full items-center gap-3 px-4 py-3">
          <GiHamburgerMenu className="hidden text-xl" />
          <h1 className="rounded bg-gray-800 p-1 text-xl text-gray-100 dark:bg-gray-100 dark:text-gray-800">
            eChatter
          </h1>

          <form className="relative h-11 grow-[3]">
            <input
              type="text"
              placeholder=":Search"
              className="h-11 w-full rounded-md bg-gray-300 px-2 pl-40 outline-none focus:border-b-4 focus:border-b-gray-500 dark:bg-gray-800"
            />

            <div className="absolute left-1 top-1">
              <p className="flex w-fit cursor-pointer items-center justify-between rounded bg-gray-400 p-1 dark:bg-gray-700">
                eChatters
                <MdArrowDropDown />
              </p>
              <div className="hidden rounded bg-gray-300 p-2 drop-shadow-[0px_1px_2px_rgb(54,_54,_54)] dark:bg-gray-800 dark:drop-shadow-[0px_1px_2px_#030712]">
                <p className="cursor-pointer rounded p-1 px-2 hover:bg-gray-400 dark:hover:bg-gray-700">
                  Search for eChatters
                </p>
                <p className="cursor-pointer rounded p-1 px-2 hover:bg-gray-400 dark:hover:bg-gray-700">
                  Search for an eChat
                </p>
              </div>
            </div>
          </form>
          <ThemeSwitch />
        </div>
      </header>

      <section className="my-5 mt-14"></section>
    </>
  );
}
