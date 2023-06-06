import { useState } from "react";
import Image from "next/image";

import { GiHamburgerMenu } from "react-icons/gi";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { FaRandom } from "react-icons/fa";
import { AiFillSetting } from "react-icons/ai";

import dynamic from "next/dynamic";

const ThemeSwitch = dynamic(() => import("@/components/ThemeSwitch"), {
  ssr: false,
});

export default function userFeeds() {
  const [openSearchDropDown, setOpenSearchDropDown] = useState<boolean>(false);
  const [searchDropDown, setSearchDropDown] = useState<string>("eChat");

  function handleSetSearchDropDown(value: string) {
    setSearchDropDown(value);
    setOpenSearchDropDown(false);
  }

  return (
    <>
      <header className="sticky top-0 z-50 mx-auto flex justify-center overflow-visible bg-gray-100 dark:bg-gray-900">
        <div className="flex w-full items-center gap-3 px-4 py-3">
          <GiHamburgerMenu className="hidden text-xl" />
          <h1 className="rounded bg-gray-800 p-1 text-xl text-gray-100 dark:bg-gray-100 dark:text-gray-800">
            eChatter
          </h1>

          <form className="relative h-11 grow-[3]">
            <input
              type="text"
              placeholder={
                searchDropDown == "eChat" ? "Search by topic" : "Search by name"
              }
              className={`peer h-11 w-full rounded-md bg-gray-300 px-2 ${
                searchDropDown == "eChat" ? "pl-[78px]" : "pl-[100px]"
              } outline-none focus:border-b-[3px] focus:border-b-gray-500 dark:bg-gray-800 dark:focus:border-b-[#030712]`}
            />

            <div className="absolute left-1 top-[6px] peer-focus:top-[5px]">
              <p
                onClick={() => setOpenSearchDropDown(!openSearchDropDown)}
                className="flex w-fit cursor-pointer items-center justify-between rounded bg-gray-400 p-1 dark:bg-gray-700 dark:text-maingreen-100"
              >
                {searchDropDown}
                {openSearchDropDown ? <MdArrowDropUp /> : <MdArrowDropDown />}
              </p>
              <div
                className={`${
                  !openSearchDropDown && "hidden"
                } rounded bg-gray-300 p-2 drop-shadow-[0px_1px_2px_rgb(54,_54,_54)] dark:bg-gray-800 dark:drop-shadow-[0px_1px_2px_#030712]`}
              >
                <p
                  onClick={() => handleSetSearchDropDown("eChatter")}
                  className={`cursor-pointer rounded p-1 px-2 hover:bg-gray-400 dark:hover:bg-gray-700 ${
                    searchDropDown == "eChatter" &&
                    "text-maingreen-300 dark:text-maingreen-100"
                  }`}
                >
                  Search for an eChatter
                </p>
                <p
                  onClick={() => handleSetSearchDropDown("eChat")}
                  className={`cursor-pointer rounded p-1 px-2 hover:bg-gray-400 dark:hover:bg-gray-700 ${
                    searchDropDown == "eChat" &&
                    "text-maingreen-300 dark:text-maingreen-100"
                  }`}
                >
                  Search for an eChat
                </p>
              </div>
            </div>
          </form>
        </div>

        <div>
          <div>
            <FaRandom />
            <AiFillSetting />
          </div>
        </div>
        <ThemeSwitch />
      </header>

      <section className="my-5 mt-14"></section>
    </>
  );
}
