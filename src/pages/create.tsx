import { useRouter } from "next/router";
import { useState } from "react";

import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import {
  MdArrowDropDown,
  MdArrowDropUp,
  MdClose,
  MdCheck,
} from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";

import LoadingSpinner from "@/components/LoadingSpinner";

export default function createPage() {
  const router = useRouter();

  const enum visibilityOptions {
    ALL = "Visible to everyone on the internet",
    PRIV1 = "Visible to only eChatters",
    PRIV2 = "Visible to only eChatters following me",
  }

  const [contributeDropDown, setContributeDropDown] = useState<boolean>(false);
  const [visiblityChoice, setVisibilityChoice] = useState<string>(
    visibilityOptions.ALL
  );

  const [openCategoryDropDown, setOpenCategoryDropDown] =
    useState<boolean>(false);
  const [category, setCategory] = useState<string>("News");

  function handleVisibilitySetup(choice: string) {
    setVisibilityChoice(choice);
  }

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
        <aside className="relative max-h-[536px] min-h-[100px] w-[30%] overflow-y-auto overflow-x-hidden">
          <div className="px-3">
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
                Important fields are marked with an asterisk(*)
              </p>

              <div className="mt-2 flex items-center justify-between">
                <div className="z-[1] flex max-w-[50%] flex-col overflow-visible pb-2">
                  <p>Owner</p>
                  <p className="max-w-[200px] truncate rounded bg-maingreen-300 p-1 px-2 text-sm font-semibold text-gray-100 hover:w-fit hover:max-w-[400px] dark:bg-maingreen-200 dark:text-gray-800">
                    mmejuenoch-gmail
                  </p>
                </div>

                <div className="relative flex flex-col pb-2">
                  <p>Contributors</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setContributeDropDown(!contributeDropDown);
                    }}
                    className="flex items-center justify-between rounded bg-gray-400/80 p-1 px-2 text-sm font-semibold hover:bg-gray-400 dark:bg-gray-700 hover:dark:bg-gray-700/80"
                  >
                    <span>0 out of 10 chosen</span>
                    {contributeDropDown ? (
                      <MdArrowDropUp />
                    ) : (
                      <MdArrowDropDown />
                    )}
                  </button>

                  {contributeDropDown && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="absolute -right-2 top-12 z-[2] flex min-h-[120px] w-72 items-center justify-center rounded bg-gray-300 p-2 drop-shadow-[0px_1px_2px_rgb(54,_54,_54)] dark:bg-gray-800 dark:drop-shadow-[0px_1px_2px_#030712]"
                    >
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
                    eChat titles can't be more than 100 characters long. So make
                    it short and memorable.
                  </span>
                  <span>
                    e.g "Unveiling the secrets: The enigma of Human Existence."
                  </span>
                </p>

                <button className="mt-2 flex items-center rounded bg-gray-400/80 p-1 text-sm font-semibold hover:bg-gray-400 dark:bg-gray-700 hover:dark:bg-gray-700/80">
                  <span>Add cover image</span>
                </button>
                <p className="flex flex-wrap items-center gap-1 text-sm text-gray-700 dark:text-gray-300">
                  <span className="truncate">image_of_a_wanted_man.jpg</span>
                  <button className="text-base">
                    <MdClose />
                  </button>
                </p>
              </div>

              <div className="mt-4 border-t border-gray-500 py-2">
                <p>Visibility Setting*</p>

                <div
                  onClick={() => handleVisibilitySetup(visibilityOptions.ALL)}
                  className={`group mt-2 flex cursor-pointer items-center gap-1 p-1 px-2 ${
                    visiblityChoice == visibilityOptions.ALL &&
                    "text-maingreen-300 dark:text-maingreen-100"
                  }`}
                >
                  {visiblityChoice == visibilityOptions.ALL && (
                    <span className="text-xl">
                      <IoIosArrowForward />
                    </span>
                  )}
                  <p
                    className={`text-sm group-hover:underline group-hover:underline-offset-2 ${
                      visiblityChoice == visibilityOptions.ALL &&
                      "underline underline-offset-2"
                    }`}
                  >
                    Visible to everyone on the internet i.e both registered and
                    non-registered users
                  </p>
                </div>

                <div
                  onClick={() => handleVisibilitySetup(visibilityOptions.PRIV1)}
                  className={`group mt-2 flex cursor-pointer items-center gap-1 p-1 px-2 ${
                    visiblityChoice == visibilityOptions.PRIV1 &&
                    "text-maingreen-300 dark:text-maingreen-100"
                  }`}
                >
                  {visiblityChoice == visibilityOptions.PRIV1 && (
                    <span className="text-xl">
                      <IoIosArrowForward />
                    </span>
                  )}
                  <p
                    className={`text-sm group-hover:underline group-hover:underline-offset-2 ${
                      visiblityChoice == visibilityOptions.PRIV1 &&
                      "underline underline-offset-2"
                    }`}
                  >
                    Visible to only eChatters i.e only registered users
                  </p>
                </div>

                <div
                  onClick={() => handleVisibilitySetup(visibilityOptions.PRIV2)}
                  className={`group mt-2 flex cursor-pointer items-center gap-1 p-1 px-2 ${
                    visiblityChoice == visibilityOptions.PRIV2 &&
                    "text-maingreen-300 dark:text-maingreen-100"
                  }`}
                >
                  {visiblityChoice == visibilityOptions.PRIV2 && (
                    <span className="text-xl">
                      <IoIosArrowForward />
                    </span>
                  )}
                  <p
                    className={`text-sm group-hover:underline group-hover:underline-offset-2 ${
                      visiblityChoice == visibilityOptions.PRIV2 &&
                      "underline underline-offset-2"
                    }`}
                  >
                    Visible to only eChatters following me
                  </p>
                </div>
              </div>
              {/* end of visibility settings div */}

              <div className="mt-4 border-t border-gray-500 py-2">
                <p className="text-center">
                  Select the category this eChat belongs to*
                </p>
                <div className="relative mt-2 flex flex-col items-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="flex w-[70%] items-center justify-evenly rounded bg-gray-400/80 p-1 px-2 text-sm font-semibold hover:bg-gray-400 dark:bg-gray-700 hover:dark:bg-gray-700/80"
                  >
                    <span>News</span>
                  </button>

                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute bottom-6 z-[2] flex min-h-[120px] min-w-[100px] flex-col gap-y-[2px] rounded bg-gray-300 p-2 drop-shadow-[0px_1px_2px_rgb(54,_54,_54)] dark:bg-gray-800 dark:drop-shadow-[0px_1px_2px_#030712]"
                  >
                    {/* <LoadingSpinner position="absolute" size="text-6xl" /> */}
                    <p
                      onClick={(e) => {
                        e.stopPropagation();
                        setCategory("News");
                      }}
                      className={`flex cursor-pointer items-center gap-1 rounded p-1 px-2 hover:bg-gray-400 dark:hover:bg-gray-700 ${
                        category == "News" &&
                        "bg-maingreen-300 underline underline-offset-2 dark:bg-maingreen-100"
                      }`}
                    >
                      {category == "News" && <MdCheck />}
                      News
                    </p>

                    <p
                      onClick={(e) => {
                        e.stopPropagation();
                        setCategory("Sports");
                      }}
                      className={`flex cursor-pointer items-center gap-1 rounded p-1 px-2 hover:bg-gray-400 dark:hover:bg-gray-700 ${
                        category == "Sports" &&
                        "bg-maingreen-300 underline underline-offset-2 dark:bg-maingreen-100"
                      }`}
                    >
                      {category == "News" && <MdCheck />}
                      News
                    </p>

                    <p
                      className={`cursor-pointer rounded p-1 px-2 hover:bg-gray-400 dark:hover:bg-gray-700 ${
                        category == "Music" &&
                        "bg-maingreen-300 underline underline-offset-2 dark:bg-maingreen-100"
                      }`}
                    >
                      Music
                    </p>

                    <p
                      className={`cursor-pointer rounded p-1 px-2 hover:bg-gray-400 dark:hover:bg-gray-700 ${
                        category == "Movie" &&
                        "bg-maingreen-300 underline underline-offset-2 dark:bg-maingreen-100"
                      }`}
                    >
                      Movie
                    </p>

                    <p
                      className={`cursor-pointer rounded p-1 px-2 hover:bg-gray-400 dark:hover:bg-gray-700 ${
                        category == "Science" &&
                        "bg-maingreen-300 underline underline-offset-2 dark:bg-maingreen-100"
                      }`}
                    >
                      Science
                    </p>

                    <p
                      className={`cursor-pointer rounded p-1 px-2 hover:bg-gray-400 dark:hover:bg-gray-700 ${
                        category == "Art" &&
                        "bg-maingreen-300 underline underline-offset-2 dark:bg-maingreen-100"
                      }`}
                    >
                      Art
                    </p>

                    <p
                      className={`cursor-pointer rounded p-1 px-2 hover:bg-gray-400 dark:hover:bg-gray-700 ${
                        category == "Fashion" &&
                        "bg-maingreen-300 underline underline-offset-2 dark:bg-maingreen-100"
                      }`}
                    >
                      Fashion
                    </p>

                    <p
                      className={`cursor-pointer rounded p-1 px-2 hover:bg-gray-400 dark:hover:bg-gray-700 ${
                        category == "Health" &&
                        "bg-maingreen-300 underline underline-offset-2 dark:bg-maingreen-100"
                      }`}
                    >
                      Health
                    </p>

                    <p
                      className={`cursor-pointer rounded p-1 px-2 hover:bg-gray-400 dark:hover:bg-gray-700 ${
                        category == "Lifestyle" &&
                        "bg-maingreen-300 underline underline-offset-2 dark:bg-maingreen-100"
                      }`}
                    >
                      Lifestyle
                    </p>

                    <p
                      className={`cursor-pointer rounded p-1 px-2 hover:bg-gray-400 dark:hover:bg-gray-700 ${
                        category == "Travel" &&
                        "bg-maingreen-300 underline underline-offset-2 dark:bg-maingreen-100"
                      }`}
                    >
                      Travel
                    </p>

                    <p
                      className={`cursor-pointer rounded p-1 px-2 hover:bg-gray-400 dark:hover:bg-gray-700 ${
                        category == "f-n-c" &&
                        "bg-maingreen-300 underline underline-offset-2 dark:bg-maingreen-100"
                      }`}
                    >
                      Food & Cooking
                    </p>

                    <p
                      className={`cursor-pointer rounded p-1 px-2 hover:bg-gray-400 dark:hover:bg-gray-700 ${
                        category == "b-n-f" &&
                        "bg-maingreen-300 underline underline-offset-2 dark:bg-maingreen-100"
                      }`}
                    >
                      Business & Finance
                    </p>

                    <p
                      className={`cursor-pointer rounded p-1 px-2 hover:bg-gray-400 dark:hover:bg-gray-700 ${
                        category == "Education" &&
                        "bg-maingreen-300 underline underline-offset-2 dark:bg-maingreen-100"
                      }`}
                    >
                      Education
                    </p>

                    <p
                      className={`cursor-pointer rounded p-1 px-2 hover:bg-gray-400 dark:hover:bg-gray-700 ${
                        category == "Politics" &&
                        "bg-maingreen-300 underline underline-offset-2 dark:bg-maingreen-100"
                      }`}
                    >
                      Politics
                    </p>

                    <p
                      className={`cursor-pointer rounded p-1 px-2 hover:bg-gray-400 dark:hover:bg-gray-700 ${
                        category == "Environment" &&
                        "bg-maingreen-300 underline underline-offset-2 dark:bg-maingreen-100"
                      }`}
                    >
                      Environment
                    </p>

                    <p
                      className={`cursor-pointer rounded p-1 px-2 hover:bg-gray-400 dark:hover:bg-gray-700`}
                    >
                      Relationship
                    </p>

                    <p
                      className={`cursor-pointer rounded p-1 px-2 hover:bg-gray-400 dark:hover:bg-gray-700`}
                    >
                      Personal Development
                    </p>

                    <p
                      className={`cursor-pointer rounded p-1 px-2 hover:bg-gray-400 dark:hover:bg-gray-700`}
                    >
                      Career
                    </p>

                    <p
                      className={`cursor-pointer rounded p-1 px-2 hover:bg-gray-400 dark:hover:bg-gray-700`}
                    >
                      DIY & Crafts
                    </p>

                    <p
                      className={`cursor-pointer rounded p-1 px-2 hover:bg-gray-400 dark:hover:bg-gray-700`}
                    >
                      Religion
                    </p>
                  </div>
                </div>
              </div>
              {/* end of collections div */}
            </div>
          </div>
          <div className="sticky bottom-0 left-0 z-[3] mt-2 flex w-full items-center justify-center gap-6 border-gray-500 bg-gray-300 py-2 dark:bg-gray-800">
            <div className="relative flex w-[90px] cursor-pointer items-center justify-center rounded bg-maingreen-300 p-1 px-3 font-semibold text-gray-100 dark:bg-maingreen-200 dark:text-gray-800">
              <p>Post</p>
            </div>
            <button className="hover:underline hover:underline-offset-2">
              Save as draft
            </button>
          </div>
        </aside>

        {/* Section for text editor */}
        <section className="min-h-[100px] w-[70%]"></section>
      </section>
    </>
  );
}
