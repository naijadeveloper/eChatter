import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";

import { GiHamburgerMenu } from "react-icons/gi";
import {
  MdArrowDropDown,
  MdArrowDropUp,
  MdNotifications,
  MdTravelExplore,
  MdClose,
} from "react-icons/md";
import { HiHome } from "react-icons/hi";
import { SiAddthis } from "react-icons/si";

type headerProps = {
  page: string;

  openSearchDD?: boolean;
  setOpenSearchDD?: (val: boolean) => void;
  searchDD?: string;
  setSearchDD?: (val: string) => void;

  searchedP: string;
  setSearchedP: (val: string) => void;

  openDashboardDD: boolean;
  setOpenDashboardDD: (val: boolean) => void;
};

//////////////////////////////////////////////////////////////////////////////////////////////
export default function Header({
  page,
  openSearchDD,
  setOpenSearchDD,
  searchDD,
  setSearchDD,
  searchedP,
  setSearchedP,
  openDashboardDD,
  setOpenDashboardDD,
}: headerProps) {
  const router = useRouter();
  const [openMobileMenu, setOpenMobileMenu] = useState<boolean>(false);

  function handleCloseAll() {
    setOpenSearchDD?.(false);
    setOpenDashboardDD(false);
    setOpenMobileMenu(false);
  }

  function logOut() {
    router.push("/account/logout");
  }

  return (
    <header
      onClick={handleCloseAll}
      className="sticky top-0 z-50 mx-auto flex items-center justify-center overflow-visible bg-gray-100 dark:bg-gray-900 max-[1000px]:flex-col max-[1000px]:gap-3 max-[600px]:gap-0"
    >
      <div
        className={`flex w-full items-center gap-3 px-3 py-3 max-[1050px]:w-[85%] max-[1050px]:px-2 max-[1000px]:w-full max-[600px]:flex-col max-[600px]:gap-6 max-[600px]:px-4 ${
          openMobileMenu && "pb-0"
        }`}
      >
        <div className="flex items-center justify-between text-xl max-[600px]:w-full">
          {!openMobileMenu ? (
            <GiHamburgerMenu
              onClick={(e) => {
                e.stopPropagation();
                setOpenMobileMenu(!openMobileMenu);
              }}
              className="cursor-pointer min-[601px]:hidden"
            />
          ) : (
            <MdClose
              onClick={(e) => {
                e.stopPropagation();
                setOpenMobileMenu(!openMobileMenu);
              }}
              className="cursor-pointer min-[601px]:hidden"
            />
          )}

          <h1 className="rounded bg-gray-800 p-1 text-gray-100 dark:bg-gray-100 dark:text-gray-800">
            eChatter
          </h1>
          <Link href="/create">
            <SiAddthis className="cursor-pointer min-[601px]:hidden" />
          </Link>
        </div>

        <form className="relative h-11 w-full grow-[2] max-[600px]:h-12">
          {(page === "Notifications" || page === "Dashboard") && (
            <input
              type="text"
              placeholder={
                page === "Notifications"
                  ? "Search for a notification"
                  : "Search for an eChat"
              }
              value={searchedP}
              onChange={(e) => {
                setSearchedP(e.target.value);
              }}
              className={`peer h-full w-full rounded-md bg-gray-300 px-2 outline-none focus:border-b-[3px] focus:border-b-gray-500 dark:bg-gray-800 dark:focus:border-b-[#030712]`}
            />
          )}

          {(page === "Home" || page === "Explore") && (
            <input
              type="text"
              placeholder={
                searchDD === "eChat" ? "Search by topic" : "Search by name"
              }
              value={searchedP}
              onChange={(e) => {
                setSearchedP(e.target.value);
              }}
              className={`peer h-full w-full rounded-md bg-gray-300 px-2 ${
                searchDD === "eChat" ? "pl-[78px]" : "pl-[100px]"
              } outline-none focus:border-b-[3px] focus:border-b-gray-500 dark:bg-gray-800 dark:focus:border-b-[#030712]`}
            />
          )}

          {(page === "Home" || page === "Explore") && (
            <div className="absolute left-1 top-[6px] z-10 peer-focus:top-[5px] max-[600px]:top-[8px] max-[600px]:peer-focus:top-[6px]">
              <p
                onClick={(e) => {
                  e.stopPropagation();
                  //
                  setOpenDashboardDD(false);
                  setOpenMobileMenu(false);
                  //
                  setOpenSearchDD?.(!openSearchDD as boolean);
                }}
                className="flex w-fit cursor-pointer items-center gap-[2px] rounded bg-gray-400 p-1 dark:bg-gray-700"
              >
                {searchDD as string}
                {openSearchDD ? <MdArrowDropUp /> : <MdArrowDropDown />}
              </p>
              <div
                className={`${
                  !openSearchDD && "hidden"
                } rounded bg-gray-300 p-2 drop-shadow-[0px_1px_2px_rgb(54,_54,_54)] dark:bg-gray-800 dark:drop-shadow-[0px_1px_2px_#030712]`}
              >
                <p
                  onClick={(e) => {
                    e.stopPropagation();
                    setSearchDD?.("eChatter");
                    setOpenSearchDD?.(false);
                  }}
                  className={`cursor-pointer rounded p-1 px-2 hover:bg-gray-400 dark:hover:bg-gray-700 ${
                    searchDD === "eChatter" &&
                    "text-maingreen-300 dark:text-maingreen-100"
                  }`}
                >
                  Search for an eChatter
                </p>
                <p
                  onClick={(e) => {
                    e.stopPropagation();
                    setSearchDD?.("eChat");
                    setOpenSearchDD?.(false);
                  }}
                  className={`cursor-pointer rounded p-1 px-2 hover:bg-gray-400 dark:hover:bg-gray-700 ${
                    searchDD === "eChat" &&
                    "text-maingreen-300 dark:text-maingreen-100"
                  }`}
                >
                  Search for an eChat
                </p>
              </div>
            </div>
          )}
        </form>
      </div>

      <div className="flex w-full items-center justify-around py-3 pl-3 pr-0 text-2xl max-[1050px]:pl-2 max-[1000px]:w-[97%] max-[1000px]:justify-evenly max-[1000px]:pl-0 max-[750px]:w-[95%] max-[750px]:justify-between max-[600px]:hidden">
        <Link
          href="/feed"
          className={`group relative flex cursor-pointer flex-col items-center gap-1 ${
            page === "Home"
              ? "text-maingreen-300 dark:text-maingreen-100"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          <HiHome />
          <span
            className={`rounded p-1 text-xs ${
              page !== "Home" &&
              "group-hover:bg-gray-300 group-hover:dark:bg-gray-700"
            }`}
          >
            Home
          </span>
          {page === "Home" && (
            <span className="absolute -bottom-5 left-0 hidden w-fit items-center justify-center rounded bg-gray-400 p-1 text-xs text-gray-800 after:absolute after:left-[50%] after:top-[-15px] after:-ml-[8px] after:border-[8px] after:border-transparent after:border-b-gray-400 after:content-['_'] group-hover:flex dark:bg-[#030712] dark:text-gray-100 dark:after:border-b-[#030712]">
              Active
            </span>
          )}
        </Link>

        <Link
          href="/explore"
          className={`group relative flex cursor-pointer flex-col items-center gap-1 ${
            page === "Explore"
              ? "text-maingreen-300 dark:text-maingreen-100"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          <MdTravelExplore />
          <span
            className={`rounded p-1 text-xs ${
              page !== "Explore" &&
              "group-hover:bg-gray-300 group-hover:dark:bg-gray-700"
            }`}
          >
            Explore
          </span>
          {page === "Explore" && (
            <span className="absolute -bottom-5 left-1 hidden w-fit items-center justify-center rounded bg-gray-400 p-1 text-xs text-gray-800 after:absolute after:left-[50%] after:top-[-15px] after:-ml-[8px] after:border-[8px] after:border-transparent after:border-b-gray-400 after:content-['_'] group-hover:flex dark:bg-[#030712] dark:text-gray-100 dark:after:border-b-[#030712]">
              Active
            </span>
          )}
        </Link>

        <Link
          href="/notifications"
          className={`group relative flex cursor-pointer flex-col items-center gap-1 ${
            page === "Notifications"
              ? "text-maingreen-300 dark:text-maingreen-100"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          <MdNotifications />
          <span
            className={`rounded p-1 text-xs ${
              page !== "Notifications" &&
              "group-hover:bg-gray-300 group-hover:dark:bg-gray-700"
            }`}
          >
            Notifications
          </span>

          {page !== "Notifications" && (
            <>
              <span
                className={`absolute right-[26px] top-0 flex h-4 w-4 items-center justify-center rounded-[100%] bg-red-700 p-1 text-xs text-gray-100`}
              >
                +
              </span>
              <span
                className={`absolute right-[26px] top-0 flex h-4 w-4 animate-ping items-center justify-center rounded-[100%] bg-red-700 p-1 text-xs text-gray-100`}
              ></span>
            </>
          )}

          {page == "Notifications" && (
            <span className="absolute -bottom-5 left-5 hidden w-fit items-center justify-center rounded bg-gray-400 p-1 text-xs text-gray-800 after:absolute after:left-[50%] after:top-[-15px] after:-ml-[8px] after:border-[8px] after:border-transparent after:border-b-gray-400 after:content-['_'] group-hover:flex dark:bg-[#030712] dark:text-gray-100 dark:after:border-b-[#030712]">
              Active
            </span>
          )}
        </Link>

        <Link
          href="/create"
          className="flex cursor-pointer items-center justify-center rounded bg-maingreen-300 p-2 py-3 text-base text-gray-100 hover:opacity-90 dark:bg-maingreen-200 dark:text-gray-800"
        >
          Create eChat
        </Link>

        <div className="relative">
          {/* conversations, logout, signed in as `e.g mmejuenoch-gmail`, dashboard, settings, admin, sponsorship,  */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              //
              setOpenSearchDD?.(false);
              //
              setOpenDashboardDD(!openDashboardDD);
            }}
            className="flex items-center justify-center text-gray-500"
          >
            <div className="h-10 w-10 cursor-pointer rounded-[100%] border-2 border-transparent bg-gray-300 hover:border-gray-500 dark:bg-gray-800"></div>

            {openDashboardDD ? <MdArrowDropUp /> : <MdArrowDropDown />}
          </div>

          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className={`${
              !openDashboardDD && "hidden"
            } absolute -right-4 top-9 w-[213px] rounded bg-gray-300 p-1 text-base drop-shadow-[0px_1px_2px_rgb(54,_54,_54)] dark:bg-gray-800 dark:drop-shadow-[0px_1px_2px_#030712] max-[1200px]:-right-1 max-[1000px]:-right-3`}
          >
            <div className="mb-2 flex flex-col items-start justify-center border-b border-gray-500 p-2">
              <p>Logged in as</p>
              <p className="mt-1 max-w-full truncate rounded border border-gray-900 bg-maingreen-300 p-[1px] px-1 text-sm font-semibold text-gray-100 dark:bg-maingreen-200 dark:text-gray-800">
                mmejuenoch-gmail
              </p>
            </div>

            <Link
              href="/dashboard"
              className={`flex cursor-pointer rounded p-1 px-2 ${
                page === "Dashboard"
                  ? "text-maingreen-300 underline underline-offset-2 dark:text-maingreen-100"
                  : "hover:bg-gray-400 dark:hover:bg-gray-700"
              }`}
            >
              Dashboard
            </Link>

            <p className={`cursor-pointer rounded p-1 px-2 text-gray-500`}>
              Admin<span className="text-[10px]"> (coming soon)</span>
            </p>

            <p className={`cursor-pointer rounded p-1 px-2 text-gray-500`}>
              eConvos<span className="text-[10px]"> (coming soon)</span>
            </p>

            <p className={`cursor-pointer rounded p-1 px-2 text-gray-500`}>
              eMeetings<span className="text-[10px]"> (coming soon)</span>
            </p>

            <p className={`cursor-pointer rounded p-1 px-2 text-gray-500`}>
              eCommunities<span className="text-[10px]"> (coming soon)</span>
            </p>

            <p className={`cursor-pointer rounded p-1 px-2 text-gray-500`}>
              Sponsorship<span className="text-[10px]"> (coming soon)</span>
            </p>

            <p className={`cursor-pointer rounded p-1 px-2 text-gray-500`}>
              Promote Ads<span className="text-[10px]"> (coming soon)</span>
            </p>

            <p
              className={`cursor-pointer rounded p-1 px-2 hover:bg-gray-400 dark:hover:bg-gray-700`}
            >
              Settings
            </p>

            <div className="mt-2 border-t border-gray-500">
              <button
                onClick={logOut}
                className="my-2 flex w-full cursor-pointer rounded p-1 px-2 hover:bg-gray-400 dark:hover:bg-gray-700"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu dropDown */}
      {openMobileMenu && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="min-h-20 max-h-[500px] w-full overflow-auto border-b-2 border-gray-500 p-2 min-[601px]:hidden"
        >
          <div>
            <Link
              href="/feed"
              className={`flex cursor-pointer rounded px-1 py-2 ${
                page === "Home"
                  ? "text-maingreen-300 underline underline-offset-2 dark:text-maingreen-100"
                  : "hover:bg-gray-400 dark:hover:bg-gray-700"
              }`}
            >
              Home
            </Link>
          </div>

          <div>
            <Link
              href="/explore"
              className={`flex cursor-pointer rounded px-1 py-2 ${
                page === "Explore"
                  ? "text-maingreen-300 underline underline-offset-2 dark:text-maingreen-100"
                  : "hover:bg-gray-400 dark:hover:bg-gray-700"
              }`}
            >
              Explore
            </Link>
          </div>

          <div>
            <Link
              href="notifications"
              className={`flex cursor-pointer rounded px-1 py-2 ${
                page === "Notifications"
                  ? "text-maingreen-300 underline underline-offset-2 dark:text-maingreen-100"
                  : "hover:bg-gray-400 dark:hover:bg-gray-700"
              }`}
            >
              Notifications
            </Link>
          </div>

          <div className="mt-2">
            <div
              onClick={() => setOpenDashboardDD(!openDashboardDD)}
              className="flex cursor-pointer items-center justify-between rounded bg-gray-400 px-1 py-2 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
            >
              <p className="flex flex-col items-start justify-center">
                <span>Logged in as</span>
                <span className="mt-1 rounded border border-gray-900 bg-maingreen-300 p-[1px] px-1 text-sm font-semibold text-gray-100 dark:bg-maingreen-200 dark:text-gray-800">
                  mmejuenoch-gmail
                </span>
              </p>
              {openDashboardDD ? <MdArrowDropUp /> : <MdArrowDropDown />}
            </div>
            {/* profile dropDown options */}
            <div className={`${!openDashboardDD && "hidden"} mt-2 px-2`}>
              <Link
                href="/dashboard"
                className={`flex cursor-pointer rounded px-1 py-2 ${
                  page === "Dashboard"
                    ? "text-maingreen-300 underline underline-offset-2 dark:text-maingreen-100"
                    : "hover:bg-gray-400 dark:hover:bg-gray-700"
                }`}
              >
                Dashboard
              </Link>

              <p className={`cursor-pointer rounded p-1 py-2 text-gray-500`}>
                Admin<span className="text-[10px]"> (coming soon)</span>
              </p>

              <p className={`cursor-pointer rounded p-1 py-2 text-gray-500`}>
                eConvos<span className="text-[10px]"> (coming soon)</span>
              </p>

              <p className={`cursor-pointer rounded p-1 py-2 text-gray-500`}>
                eMeetings<span className="text-[10px]"> (coming soon)</span>
              </p>

              <p className={`cursor-pointer rounded p-1 py-2 text-gray-500`}>
                eCommunities
                <span className="text-[10px]"> (coming soon)</span>
              </p>

              <p className={`cursor-pointer rounded p-1 py-2 text-gray-500`}>
                Sponsorship<span className="text-[10px]"> (coming soon)</span>
              </p>

              <p className={`cursor-pointer rounded p-1 py-2 text-gray-500`}>
                Promote Ads<span className="text-[10px]"> (coming soon)</span>
              </p>

              <p
                className={`cursor-pointer rounded p-1 py-2 hover:bg-gray-400 dark:hover:bg-gray-700`}
              >
                Settings
              </p>

              <button
                onClick={logOut}
                className={`flex w-full items-center rounded p-1 py-2 hover:bg-gray-400 dark:hover:bg-gray-700`}
              >
                Log out
              </button>
            </div>
          </div>

          {/* end of mobile dropDown div */}
        </div>
      )}
    </header>
  );
}
