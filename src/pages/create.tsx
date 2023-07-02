import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

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
import { GiHamburgerMenu } from "react-icons/gi";

import LoadingSpinner from "@/components/LoadingSpinner";
import MarkdownEditor from "@/components/MarkdownEditor";
const MdPreview = dynamic(import("@/components/MdPreview"), {
  ssr: false,
});

/////////////////////////////////////////////////////////////////////////////////////////////////
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

  //states...............................................................
  const [importDraftPopup, setImportDraftPopup] = useState<boolean>(false);
  const [draftSearchLoading, setDraftSearchLoading] = useState<boolean>(false);
  const [contributeDropDown, setContributeDropDown] = useState<boolean>(false);
  const [eChatTitle, seteChatTitle] = useState<string>("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImageError, setCoverImageError] = useState<string>("");
  const [eChatTags, seteChatTags] = useState<string[]>([]);
  const [openCategoryDropDown, setOpenCategoryDropDown] =
    useState<boolean>(false);
  const [category, setCategory] = useState<string>(categories[0]);
  const [visiblityChoice, setVisibilityChoice] = useState<string>(
    visibilityOptions.ALL
  );
  const [openMobileOptionsBar, setOpenMobileOptionsBar] =
    useState<boolean>(false);
  const [eChatContent, seteChatContent] = useState<string>("");
  const [previewOrEditor, setPreviewOrEditor] = useState<string>("Editor");
  const [savedAsDraftOnce, setSavedAsDraftOnce] = useState<boolean>(false);
  const [currentlySaving, setCurrentlySaving] = useState<boolean>(false);



  /// functions......................................
  function setContent(content: string) {
    seteChatContent(content);
  }

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
          if (
            !tags.includes(tag) &&
            tags.length < 8 &&
            tag.replace(/\s+/g, "")
          ) {
            tags.push(tag);
          }
        });
      }

      tags = tags.map((tag) => {
        let tagArry = tag.split(" ");
        let firstVal = tagArry.shift();
        if(tagArry.length == 0) {
          if(firstVal.includes("#")) return firstVal;

          return "#"+firstVal;
        }

        tagArry = tagArry.map((eachTag) => {
          let eachTagSplit = eachTag.split("");
          eachTagSplit[0] = eachTagSplit[0].toUpperCase();
          eachTag = eachTagSplit.join("");
          return eachTag;
        });

        firstVal = firstVal.toLowerCase();
        tagArry.unshift(firstVal);
        tag = tagArry.join("");
        if(tag.includes("#")) return tag;

        return "#"+tag;
      });
      seteChatTags([...tags]);
      e.currentTarget.value = "";
    }
  }

  function handleImageVerification(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      // put a check here, so if the file.size is 1 million or more, deny and if the
      // file.type doesnt include "image/" deny as well
      let file = e.target.files[0];

      if (!file.type.includes("image/")) {
        setCoverImage(null);
        setCoverImageError("Error: That's not even an Image!");
        return;
      }

      if (file.size >= 1000000) {
        setCoverImage(null);
        setCoverImageError("Error: Image is more than 1mb!");
        return;
      }
      // Everything checks right
      setCoverImageError("");
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


  function handlePostingOfeChat() {

  }

  function handleSavingAsDraft() {
    if(eChatTitle && eChatTags.length > 0 && !currentlySaving) {
      setSavedAsDraftOnce(true)
      setCurrentlySaving(true);

      // perform fetch post here
      setTimeout(() => {
        setCurrentlySaving(false);
      }, 5000);

    }
  }

  return (
    <div className="fixed left-0 top-0 z-50 flex h-screen w-full flex-col bg-gray-100 dark:bg-gray-900">
      <header
        onClick={() => {
          setContributeDropDown(false);
          setOpenCategoryDropDown(false);
        }}
        className="fixed top-0 z-20 mx-auto flex w-full items-center bg-gray-100 px-2 py-4 dark:bg-gray-900"
      >
        <div className="flex w-full items-center max-[1050px]:justify-between">
          <div className="flex items-center justify-center min-[1051px]:w-1/5 min-[1051px]:justify-start">
            <button
              onClick={() => router.back()}
              className="flex items-center justify-center gap-2 rounded p-1 text-xl hover:bg-gray-500/30"
            >
              <HiOutlineArrowNarrowLeft />
              <span className="max-[1050px]:hidden">Go Back</span>
            </button>
          </div>

          <div className="flex items-center justify-center min-[1051px]:w-4/5">
            <h1 className="rounded bg-gray-800 p-1 text-xl text-gray-100 dark:bg-gray-100 dark:text-gray-800">
              eChatter
            </h1>
          </div>

          <button
            onClick={() => setOpenMobileOptionsBar(true)}
            className="flex items-center justify-center text-xl min-[1051px]:hidden"
          >
            <GiHamburgerMenu />
          </button>
        </div>
      </header>

      <section
        onClick={() => {
          setContributeDropDown(false);
          setOpenCategoryDropDown(false);
        }}
        className="flex h-full pt-[5%]"
      >
        {/* Aside bar for eChat options */}
        <aside
          className={`${
            !openMobileOptionsBar && "max-[1050px]:hidden"
          } relative block h-full w-[30%] overflow-x-hidden ${
            importDraftPopup ? "overflow-y-clip" : "overflow-y-auto"
          } max-[1254px]:w-[33%] max-[1140px]:w-[35%] max-[1050px]:fixed max-[1050px]:right-0 max-[1050px]:top-0 max-[1050px]:z-30 max-[1050px]:w-[38%] max-[1050px]:bg-gray-100 max-[1050px]:drop-shadow-[0px_1px_2px_rgb(54,_54,_54)] max-[1050px]:dark:border-l max-[1050px]:dark:border-gray-500 max-[1050px]:dark:bg-gray-900 max-[1050px]:dark:drop-shadow-[0px_1px_2px_#030712] max-[960px]:w-[42%] max-[870px]:w-[46%] max-[790px]:w-[50%] max-[725px]:w-[60%] max-[605px]:w-[75%] max-[485px]:w-[90%] max-[405px]:w-full min-[1051px]:block`}
        >

          {/* options contents */}
          <div className="px-3 pt-[6%] pb-[22%] min-h-full w-full max-[365px]:px-[6px] max-[1050px]:py-[10px]">
            {/* mobile options bar close button */}
            <button
              onClick={() => setOpenMobileOptionsBar(false)}
              className="sticky left-4 top-2 z-[4] flex h-[35px] w-[35px] items-center justify-center rounded border-2 border-maingreen-300 bg-gray-400 p-1 px-2 text-lg font-semibold dark:border-maingreen-200 dark:bg-gray-700 min-[1051px]:hidden"
            >
              <MdClose />
            </button>

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
                Required fields are marked with an asterisk(*)
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
                    <span>
                      0 out of 10{" "}
                      <span className="max-[350px]:hidden">chosen</span>
                    </span>
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
                  onChange={(e) => seteChatTitle(e.target.value)}
                  value={eChatTitle}
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
                  onChange={handleImageVerification}
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
                  <span>Add cover image (2:1)</span>
                </label>
                {!coverImage && !coverImageError && (
                  <p className="mt-1 flex flex-wrap items-center text-sm text-gray-700 dark:text-gray-300">
                    Image must be less than 1mb
                  </p>
                )}
                {coverImageError && (
                  <p className="mt-1 flex flex-wrap items-center gap-1 text-sm text-red-700">
                    {coverImageError}
                  </p>
                )}
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
                    Press enter or add a comma after each tag then press enter
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
                    <span>Pick a category for this eChat*</span>
                  </p>
                  <div className="relative mt-2 flex flex-col items-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenCategoryDropDown(!openCategoryDropDown);
                        //
                        setContributeDropDown(false);
                      }}
                      className="flex w-full items-center justify-center rounded bg-gray-400/80 p-1 px-2 font-semibold hover:bg-gray-400 dark:bg-gray-700 hover:dark:bg-gray-700/80"
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

          {importDraftPopup && (
            <div
              onClick={() => setImportDraftPopup(false)}
              className="sticky bottom-0 top-0 z-[5] flex h-full w-full items-center justify-center bg-gray-100/70 dark:bg-gray-900/70"
            >
              {(savedAsDraftOnce || !(eChatTitle &&
                eChatTags.length > 0))? (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="dropdown-scroll relative flex max-h-[300px] min-h-[150px] w-4/5 flex-col gap-y-2 overflow-auto rounded bg-gray-300 px-2 pb-2 drop-shadow-[0px_1px_2px_rgb(54,_54,_54)] dark:bg-gray-800 dark:drop-shadow-[0px_1px_2px_#030712]"
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
                  <div>
                    <p className="p-1 text-center">Recent drafts</p>
                    {/* <p className="flex cursor-pointer items-center rounded p-1 px-2 hover:bg-gray-400 dark:hover:bg-gray-700">
                      
                    </p> */}
                  </div>

                  {draftSearchLoading && (
                    <LoadingSpinner position="absolute" size="text-6xl" />
                  )}
                </div>
              ) : (
                <p className="text-center w-[98%] text-lg font-semibold">Please save the current eChat first before you switch to another</p>
              )}
            </div>
          )}
        </aside>

        {/* Section for text editor */}
        <section className="h-full w-[70%] pb-[6%] max-[1390px]:pt-[30px] max-[1254px]:w-[67%] max-[1140px]:w-[65%] max-[1050px]:w-full max-[1050px]:pb-[7%] max-[925px]:pb-[8%] max-[840px]:pb-[9%] max-[810px]:pt-[50px] max-[740px]:pb-[10%] max-[640px]:pb-[11%] max-[565px]:pb-[14%] max-[390px]:pt-[70px] max-[375px]:pb-[18%]">
          <div className="mx-auto flex w-[90%] items-center justify-end max-[925px]:w-[95%] max-[840px]:w-[98%]">
            <button
              onClick={() => setPreviewOrEditor("Editor")}
              className={`flex items-center justify-center p-1 px-2 text-lg font-semibold hover:underline hover:underline-offset-2 ${
                previewOrEditor === "Editor" &&
                "rounded-tl rounded-tr bg-gray-300 hover:bg-gray-400 hover:no-underline dark:bg-gray-800 hover:dark:bg-gray-700"
              }`}
            >
              Editor
            </button>
            <button
              onClick={() => setPreviewOrEditor("Preview")}
              className={`flex items-center justify-center p-1 px-2 text-lg font-semibold hover:underline hover:underline-offset-2 ${
                previewOrEditor === "Preview" &&
                "rounded-tl rounded-tr bg-gray-300 hover:bg-gray-400 hover:no-underline dark:bg-gray-800 hover:dark:bg-gray-700"
              }`}
            >
              Preview
            </button>
          </div>
          {/* editor and preview section */}
          <section className="mx-auto flex flex-col h-[90%] w-[90%] justify-center rounded max-[925px]:w-[95%] max-[840px]:w-[98%]">
            {previewOrEditor === "Editor" && (
              <MarkdownEditor content={eChatContent} setContent={setContent} />
            )}

            {previewOrEditor === "Preview" && (
              <MdPreview content={eChatContent} image={coverImage} title={eChatTitle} tags={eChatTags} category={category} />
            )}
          </section>
        </section>

        {/* post or save as draft fixed div at bottom */}
        <div className="fixed bottom-0 left-0 z-[6] w-full border-gray-500 bg-gray-300 py-3 dark:bg-gray-800">
          <div className="flex w-full items-center justify-center gap-6">
            <button
              onClick={handlePostingOfeChat}
              className={`relative flex w-[90px] cursor-not-allowed items-center justify-center rounded bg-gray-500 p-2 px-3 font-semibold text-gray-100 dark:text-gray-800 ${
                eChatTitle &&
                eChatTags.length > 0 &&
                "cursor-pointer bg-maingreen-300 dark:bg-maingreen-200"
              }`}
            >
              Post
            </button>

            <button
              onClick={handleSavingAsDraft}
              className={`cursor-not-allowed ${
                eChatTitle &&
                eChatTags.length > 0 &&
                "cursor-pointer hover:underline hover:underline-offset-2"
              }`}
            >
              {currentlySaving? "Saving" : "Save as draft"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
