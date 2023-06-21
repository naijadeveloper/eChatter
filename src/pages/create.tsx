import { useRouter } from "next/router";
import { useState } from "react";

import { HiOutlineArrowNarrowLeft, HiUser, HiUserGroup } from "react-icons/hi";
import {
  MdArrowDropDown,
  MdArrowDropUp,
  MdClose,
  MdCheck,
  MdVisibility,
  MdCreate,
} from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { BsImage, BsLayersFill } from "react-icons/bs";
import { AiFillTags, AiFillCloseCircle } from "react-icons/ai";

import LoadingSpinner from "@/components/LoadingSpinner";

export default function createPage() {
  const router = useRouter();

  const enum visibilityOptions {
    ALL = "Visible to everyone on the internet",
    PRIV1 = "Visible to only eChatters",
    PRIV2 = "Visible to only eChatters following me",
  }

  const categories = [
    "News",
    "Sports",
    "Music",
    "Movie",
    "Science",
    "Technology",
    "Art",
    "Fashion",
    "Health",
    "Lifestyle",
    "Travel",
    "Food & Cooking",
    "Business & Finance",
    "Education",
    "Politics",
    "Environment",
    "Relationship",
    "Personal Development",
    "DIY & Crafts",
    "Religion",
  ];

  const [importDraftPopup, setImportDraftPopup] = useState<boolean>(false);
  const [draftSearchLoading, setDraftSearchLoading] = useState<boolean>(false);
  const [contributeDropDown, setContributeDropDown] = useState<boolean>(false);
  const [visiblityChoice, setVisibilityChoice] = useState<string>(
    visibilityOptions.ALL
  );
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [eChatTags, seteChatTags] = useState<string[]>([]);
  const [openCategoryDropDown, setOpenCategoryDropDown] =
    useState<boolean>(false);
  const [category, setCategory] = useState<string>(categories[0]);

  function handleVisibilitySetup(choice: string) {
    setVisibilityChoice(choice);
  }

  function handleTagsAddition(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && eChatTags.length < 8) {
      let tags: string[] = [...eChatTags];
      let tag = e.currentTarget.value.replace(/\s+/g, " "); // remove unwanted spaces
      // Not an empty value entered
      if (tag.length > 1) {
        tag.split(",").forEach((tag) => {
          // tag isn't already in eChatTags
          if (!tags.includes(tag) && tags.length < 8) {
            tags.push(tag);
          }
        });
      }
      seteChatTags([...tags]);
      e.currentTarget.value = "";
    }
  }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setCoverImage(e.target.files[0]);
    }
  }

  function handleImportDraftPopup() {
    setImportDraftPopup(true);
    // call function to get all drafts from storage
    setDraftSearchLoading(true);
    handleGetAllDrafts().then(() => {
      setDraftSearchLoading(false);
    });
  }

  async function handleGetAllDrafts() {
    await new Promise((resolve) => setTimeout(resolve, 1500));
  }

  return (
    <>
      <header
        onClick={() => {
          setContributeDropDown(false);
          setOpenCategoryDropDown(false);
        }}
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
        onClick={() => {
          setContributeDropDown(false);
          setOpenCategoryDropDown(false);
        }}
        className="flex min-h-[500px] py-5"
      >
        {/* Aside bar for eChat options */}
        <aside
          className={`relative max-h-[536px] min-h-[100px] w-[30%] ${
            importDraftPopup ? "overflow-y-hidden" : "overflow-y-auto"
          } overflow-x-hidden`}
        >
          <div className="px-3">
            <div className="border-b border-gray-500 pb-2">
              <h2 className="text-center text-xl">Create a new eChat</h2>
              <p className="text-gray-700 dark:text-gray-300">
                You have a drafted eChat and would like to continue editing?
              </p>
              <button
                onClick={handleImportDraftPopup}
                className="text-maingreen-300 underline-offset-2 hover:underline dark:text-maingreen-100"
              >
                Import draft from storage
              </button>
            </div>

            <div>
              <p className="text-sm italic text-gray-700 dark:text-gray-300">
                Important fields are marked with an asterisk(*)
              </p>

              <div className="mt-3 flex items-center justify-between">
                <div className="z-[1] flex max-w-[50%] flex-col overflow-visible pb-2">
                  <p className="flex items-center gap-1">
                    <span>
                      <HiUser />
                    </span>
                    <span>Owner</span>
                  </p>
                  <p className="max-w-[200px] truncate rounded bg-maingreen-300 p-1 px-2 text-sm font-semibold text-gray-100 hover:w-fit hover:max-w-[400px] dark:bg-maingreen-200 dark:text-gray-800">
                    mmejuenoch-gmail
                  </p>
                </div>

                <div className="relative flex flex-col pb-2">
                  <p className="flex items-center gap-1">
                    <span>
                      <HiUserGroup />
                    </span>
                    <span>Contributors</span>
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setContributeDropDown(!contributeDropDown);
                      //
                      setOpenCategoryDropDown(false);
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
                      className="dropdown-scroll absolute -right-2 top-12 z-[2] flex max-h-[240px] min-h-[120px] min-w-[270px] max-w-[300px] flex-col items-center justify-center gap-y-[2px] overflow-auto rounded bg-gray-300 p-2 drop-shadow-[0px_1px_2px_rgb(54,_54,_54)] dark:bg-gray-800 dark:drop-shadow-[0px_1px_2px_#030712]"
                    >
                      {/* <LoadingSpinner position="absolute" size="text-6xl" /> */}
                      <span className="text-gray-500">coming soon</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-3">
                <p className="flex items-center gap-1">
                  <span>
                    <MdCreate />
                  </span>
                  <span>eChat Title*</span>
                </p>
                <textarea
                  maxLength={100}
                  className="dropdown-scroll min-h-[100px] w-full resize-none rounded border-2 border-transparent bg-gray-300 px-2 text-lg focus:border-maingreen-300/30 focus:outline-none dark:bg-gray-800 dark:focus:border-maingreen-100/30"
                ></textarea>
                <p className="flex flex-col text-sm text-gray-700 dark:text-gray-300">
                  <span>
                    Note: eChat titles can't be more than 100 characters long.
                    So make it short and memorable.
                  </span>
                  <span>
                    e.g "Unveiling the secrets: The enigma of Human Existence."
                  </span>
                </p>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  id="cover-image"
                  className="hidden"
                />
                <label
                  htmlFor="cover-image"
                  className="mt-3 flex w-fit cursor-pointer items-center gap-1 rounded bg-gray-400/80 p-1 text-sm font-semibold hover:bg-gray-400 dark:bg-gray-700 hover:dark:bg-gray-700/80"
                >
                  <span>
                    <BsImage />
                  </span>
                  <span>Add cover image</span>
                </label>
                {coverImage && (
                  <p className="mt-1 flex flex-wrap items-center gap-1 text-sm text-gray-700 dark:text-gray-300">
                    <span className="truncate">{coverImage?.name}</span>
                    <button
                      onClick={() => setCoverImage(null)}
                      className="text-base"
                    >
                      <MdClose />
                    </button>
                  </p>
                )}
              </div>

              <div className="mt-4 border-t border-gray-500 py-2">
                <div>
                  <p className="flex items-center gap-1">
                    <span>
                      <AiFillTags />
                    </span>
                    <span>Tags*</span>
                  </p>
                  <p className="text-sm">
                    Press enter or add a comma after each tag then enter
                  </p>

                  <div className="mt-1">
                    <ul className="flex w-full flex-wrap items-center gap-[5px] gap-y-2 rounded border-2 border-maingreen-300/30 p-2 dark:border-maingreen-100/30">
                      {eChatTags.map((tag, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-2 rounded bg-gray-400/50 p-1 px-2 dark:bg-gray-700/50"
                        >
                          <span>{tag}</span>
                          <button
                            onClick={() => {
                              // handle Removal of tags
                              let tags = [...eChatTags];
                              tags.splice(index, 1);
                              seteChatTags([...tags]);
                            }}
                          >
                            <AiFillCloseCircle />
                          </button>
                        </li>
                      ))}
                      <input
                        type="text"
                        placeholder="Add a tag"
                        onKeyUp={handleTagsAddition}
                        className="flex flex-1 border-0 bg-gray-100 p-1 outline-none dark:bg-gray-900"
                      />
                    </ul>
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <p>
                      <span>{8 - eChatTags.length}</span> tag
                      {8 - eChatTags.length == 1 ? "" : "s"} remaining
                    </p>
                    <button
                      onClick={() => {
                        seteChatTags([]);
                      }}
                      className="rounded bg-gray-400/80 p-1 px-2 hover:bg-gray-400 dark:bg-gray-700 hover:dark:bg-gray-700/80"
                    >
                      Remove all
                    </button>
                  </div>
                </div>
                {/* tags div */}

                <div className="mt-3">
                  <p className="flex items-center gap-1">
                    <span>
                      <BsLayersFill />
                    </span>
                    <span>Select the category this eChat belongs to*</span>
                  </p>
                  <div className="relative mt-2 flex flex-col items-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenCategoryDropDown(!openCategoryDropDown);
                        //
                        setContributeDropDown(false);
                      }}
                      className="flex w-full items-center justify-evenly rounded bg-gray-400/80 p-1 px-2 font-semibold hover:bg-gray-400 dark:bg-gray-700 hover:dark:bg-gray-700/80"
                    >
                      <span>{category}</span>
                    </button>

                    {openCategoryDropDown && (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="dropdown-scroll absolute bottom-6 z-[2] flex max-h-[240px] min-h-[120px] min-w-[260px] flex-col gap-y-[2px] overflow-auto rounded bg-gray-300 p-2 drop-shadow-[0px_1px_2px_rgb(54,_54,_54)] dark:bg-gray-800 dark:drop-shadow-[0px_1px_2px_#030712]"
                      >
                        {/* <LoadingSpinner position="absolute" size="text-6xl" /> */}
                        {categories.map((cat, index) => (
                          <p
                            key={index}
                            onClick={() => setCategory(cat)}
                            className={`flex cursor-pointer items-center gap-1 rounded p-1 px-2 hover:bg-gray-400 dark:hover:bg-gray-700 ${
                              category === cat &&
                              "text-maingreen-300 underline underline-offset-2 dark:text-maingreen-100"
                            }`}
                          >
                            {category === cat && <MdCheck />}
                            {cat}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* end of category and tags div */}

              <div className="mt-4 border-t border-gray-500 py-2">
                <p className="flex items-center gap-1">
                  <span>
                    <MdVisibility />
                  </span>
                  <span>Visibility Setting*</span>
                </p>

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

          {importDraftPopup && (
            <div
              onClick={() => setImportDraftPopup(false)}
              className="sticky bottom-0 left-0 right-0 top-0 z-[5] flex h-full w-full items-center justify-center bg-gray-100/70 dark:bg-gray-900/70"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="dropdown-scroll flex max-h-[300px] min-h-[150px] w-4/5 flex-col gap-y-2 overflow-auto rounded bg-gray-300 px-2 pb-2 drop-shadow-[0px_1px_2px_rgb(54,_54,_54)] dark:bg-gray-800 dark:drop-shadow-[0px_1px_2px_#030712]"
              >
                <div className="sticky left-0 top-0 flex w-full flex-col gap-y-2 bg-gray-300 pb-1 pt-1 dark:bg-gray-800">
                  <p className="mt-1 flex items-center justify-end">
                    <button
                      onClick={() => setImportDraftPopup(false)}
                      className="text-lg"
                    >
                      <MdClose />
                    </button>
                  </p>
                  <input
                    type="text"
                    placeholder="Search for the draft"
                    className="flex flex-1 rounded border-0 bg-gray-100 p-1 outline-none dark:bg-gray-900"
                  />
                </div>
                <div className="relative h-full">
                  <p className="p-1 text-center">Recent drafts</p>
                  {draftSearchLoading && (
                    <LoadingSpinner position="absolute" size="text-6xl" />
                  )}
                  {/* <p className="flex cursor-pointer items-center rounded p-1 px-2 hover:bg-gray-400 dark:hover:bg-gray-700">
                    
                  </p> */}
                </div>
              </div>
            </div>
          )}
        </aside>

        {/* Section for text editor */}
        <section className="min-h-[100px] w-[70%]"></section>
      </section>
    </>
  );
}
