import { useRouter } from "next/router";
import { useState } from "react";

import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";

import LoadingSpinner from "@/components/LoadingSpinner";

export default function createPage() {
  const router = useRouter();

  const [contributeDropDown, setContributeDropDown] = useState<boolean>(false);

  return (
    <>
      <header
        onClick={() => setContributeDropDown(false)}
        className="sticky top-0 z-20 mx-auto flex items-center bg-gray-100 px-2 py-4 dark:bg-gray-900"
      >
        <div className="flex w-full">
          <div className="flex w-1/5 justify-start">
            <button
              onClick={() => router.back()}
              className="flex items-center justify-center gap-2 rounded p-1 text-xl hover:bg-gray-500/30"
            >
              <HiOutlineArrowNarrowLeft />
              <span>Go Back</span>
            </button>
          </div>

          <div className="flex w-4/5 justify-center">
            <h1 className="rounded bg-gray-800 p-1 text-xl text-gray-100 dark:bg-gray-100 dark:text-gray-800">
              eChatter
            </h1>
          </div>
        </div>
      </header>

      <section
        onClick={() => setContributeDropDown(false)}
        className="flex min-h-[500px] py-5"
      >
        {/* Aside bar for eChat options */}
        <aside className="min-h-[100px] w-[30%] border-r border-gray-500 px-4">
          <div className="border-b border-gray-500 pb-2">
            <h2 className="text-center text-xl">Create a new eChat</h2>
            <p className="text-gray-700 dark:text-gray-300">
              You have a drafted eChat and would like to continue editing?
            </p>
            <button className="text-maingreen-300 underline-offset-2 hover:underline dark:text-maingreen-100">
              Import draft from storage
            </button>
          </div>

          <div>
            <p className="text-sm italic text-gray-700 dark:text-gray-300">
              Required fields are marked with an asterisk(*)
            </p>

            <div className="mt-2 flex items-center justify-between">
              <div className="z-[1] flex max-w-[50%] flex-col overflow-visible pb-2">
                <p>Owner</p>
                <p className="max-w-[200px] truncate rounded bg-maingreen-300 p-1 px-2 text-sm font-semibold text-gray-100 hover:w-fit hover:max-w-[400px] dark:bg-maingreen-200 dark:text-gray-800">
                  mmejuenoch-gmail
                </p>
              </div>

              <div
                onClick={(e) => e.stopPropagation()}
                className="relative flex flex-col pb-2"
              >
                <p>Contributors</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setContributeDropDown(!contributeDropDown);
                  }}
                  className="flex items-center justify-between rounded bg-gray-400 p-1 px-2 text-sm font-semibold dark:bg-gray-700"
                >
                  <span>0 out of 10 chosen</span>
                  {contributeDropDown ? <MdArrowDropUp /> : <MdArrowDropDown />}
                </button>

                {contributeDropDown && (
                  <div className="absolute right-0 top-12 z-[2] flex min-h-[120px] w-72 items-center justify-center rounded bg-gray-300 p-2 drop-shadow-[0px_1px_2px_rgb(54,_54,_54)] dark:bg-gray-800 dark:drop-shadow-[0px_1px_2px_#030712]">
                    {/* <LoadingSpinner position="absolute" size="text-6xl" /> */}
                    <span className="text-gray-500">coming soon</span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-2">
              <p>eChat title*</p>
              <textarea
                maxLength={100}
                className="min-h-[100px] w-full resize-none rounded border-2 border-transparent bg-gray-300 px-2 text-lg focus:border-maingreen-300/30 focus:outline-none dark:bg-gray-800 dark:focus:border-maingreen-100/30"
              ></textarea>
              <p className="flex flex-col text-sm text-gray-700 dark:text-gray-300">
                <span>
                  eChat names can't be more than 100 characters long. So make it
                  short and memorable.
                </span>
                <span>
                  e.g "Unveiling the secrets: The enigma of Human Existence."
                </span>
              </p>

              <button className="mt-2 flex items-center rounded bg-gray-400 p-1 px-2 text-sm font-semibold dark:bg-gray-700">
                <span>Add cover image</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Section for text editor */}
        <section className="min-h-[100px] w-[70%]"></section>
      </section>
    </>
  );
}
