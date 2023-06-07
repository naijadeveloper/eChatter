import { useState } from "react";
import Image from "next/image";

import { GiHamburgerMenu } from "react-icons/gi";
import {
  MdArrowDropDown,
  MdArrowDropUp,
  MdNotifications,
  MdChatBubble,
} from "react-icons/md";
import { FaRandom } from "react-icons/fa";
import { AiFillSetting } from "react-icons/ai";
import { HiHome } from "react-icons/hi";

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
      <header className="sticky top-0 z-50 mx-auto flex items-center justify-center overflow-visible bg-gray-100 dark:bg-gray-900">
        <div className="flex w-full items-center gap-3 px-4 py-3">
          <GiHamburgerMenu className="hidden text-xl" />
          <h1 className="rounded bg-gray-800 p-1 text-xl text-gray-100 dark:bg-gray-100 dark:text-gray-800">
            eChatter
          </h1>

          <form className="relative h-11 grow-[2]">
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
                className="flex w-fit cursor-pointer items-center justify-between rounded bg-gray-400 p-1 dark:bg-gray-700"
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

        <div className="flex w-[90%] items-center justify-around px-4 py-3 text-2xl">
          <div
            title="Active"
            className="flex cursor-pointer flex-col items-center gap-1 text-maingreen-300 dark:text-maingreen-100"
          >
            <HiHome />
            <span className="rounded p-1 text-xs">Home</span>
          </div>

          <div className="flex w-24 items-center justify-evenly divide-x-2 rounded-md border border-transparent bg-gray-300 p-2 text-gray-500 hover:border-maingreen-300 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-maingreen-100">
            <div className="group relative inline-block cursor-pointer p-1 px-2 hover:text-gray-800 dark:hover:text-gray-100">
              <FaRandom />
              <span className="absolute -bottom-8 -left-8 hidden w-28 items-center justify-center rounded bg-gray-400 p-1 text-xs after:absolute after:left-[50%] after:top-[-15px] after:-ml-[8px] after:border-[8px] after:border-transparent after:border-b-gray-400 after:content-['_'] group-hover:flex dark:bg-[#030712] dark:after:border-b-[#030712]">
                Random eChats
              </span>
            </div>

            <div className="inline-block cursor-pointer border-gray-500 p-1 px-2 hover:text-gray-800 dark:border-gray-400 dark:hover:text-gray-100">
              <AiFillSetting />
            </div>
          </div>

          <div className="group relative flex cursor-pointer flex-col items-center gap-1 text-gray-500 dark:text-gray-400">
            <MdNotifications />
            <span className="rounded p-1 text-xs group-hover:bg-gray-300 group-hover:dark:bg-gray-700">
              Notifications
            </span>
            <span className="absolute right-[26px] top-0 flex h-4 w-4 items-center justify-center rounded-[100%] bg-red-700 p-1 text-xs text-gray-100">
              +
            </span>
            <span className="absolute right-[26px] top-0 flex h-4 w-4 animate-ping items-center justify-center rounded-[100%] bg-red-700 p-1 text-xs text-gray-100"></span>
          </div>

          <div className="group relative flex cursor-pointer flex-col items-center gap-1 text-gray-500 dark:text-gray-400">
            <MdChatBubble />
            <span className="rounded p-1 text-xs group-hover:bg-gray-300 group-hover:dark:bg-gray-700">
              Convos
            </span>
            <span className="absolute left-[26px] top-0 flex h-4 w-4 items-center justify-center rounded-[100%] bg-red-700 p-1 text-xs text-gray-100">
              +
            </span>
            <span className="absolute left-[26px] top-0 flex h-4 w-4 animate-ping items-center justify-center rounded-[100%] bg-red-700 p-1 text-xs text-gray-100"></span>
          </div>

          <div className="h-10 w-10 cursor-pointer rounded-[100%] border-2 border-transparent bg-gray-300 dark:bg-gray-800"></div>
        </div>
        <ThemeSwitch />
      </header>

      <section className="my-5 mt-14"></section>
    </>
  );
}
