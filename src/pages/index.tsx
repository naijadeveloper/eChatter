import { BsFillMoonFill } from "react-icons/bs";
import { AiFillRead, AiFillCloseCircle } from "react-icons/ai";
import { MdCreate } from "react-icons/md";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { FaSun } from "react-icons/fa";

import { useEffect } from "react";
import Image from "next/image";

import { motion } from "framer-motion";

import { useAppSelector, useAppDispatch } from "@/store/store_hooks";
import { changeTheme } from "@/store/theme_slice";

import Footer from "@/component/Footer";

import { cookieStorage } from "@/utilities/cookie_storage";

export default function Home() {
  const themeValue = useAppSelector((state) => state.theme.value);
  const dispatch = useAppDispatch();

  function handleThemeChange() {
    if (themeValue == "dark") {
      dispatch(changeTheme(""));
      return;
    }

    dispatch(changeTheme("dark"));
  }

  let use_of_cookie_info_popup;
  useEffect(() => {
    use_of_cookie_info_popup = cookieStorage.getItem("use_of_cookie_info") ?? "false";
  }, [])

  return (
    <>
      <header className="sticky top-0 z-50 mx-auto flex items-center justify-between overflow-hidden bg-gray-100 px-4 py-3 dark:bg-gray-900 max-lg:flex-col max-lg:gap-5">
        <div className="flex items-center justify-center max-sm:w-full max-sm:justify-between">
          <h1 className="rounded bg-gray-800 p-1 text-xl text-gray-100 dark:bg-gray-100 dark:text-gray-800">
            eChatter
          </h1>
          <button
            title={`${
              themeValue == "dark"
                ? "change the theme from dark to light"
                : "change the theme from light to dark"
            }`}
            className="hidden items-center justify-center rounded-md border border-gray-800 bg-maingreen-300 p-3  text-gray-100 dark:text-maingreen-100 max-sm:flex"
            onClick={handleThemeChange}
          >
            {themeValue == "dark" ? <FaSun /> : <BsFillMoonFill />}
          </button>
        </div>

        <div className="flex items-center justify-evenly gap-8 transition-all max-sm:w-full sm:justify-center">
          <motion.button
            initial={{ x: "-20px", opacity: 0 }}
            animate={{ x: "0px", opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex w-fit items-center justify-center gap-1 rounded-md p-3 text-lg font-light underline decoration-2 underline-offset-8 hover:text-gray-600 dark:hover:text-gray-300 max-[420px]:p-2 max-[420px]:text-base max-[420px]:font-normal"
          >
            <AiFillRead />
            <span>Start Reading</span>
          </motion.button>
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1 }}
            className="flex w-fit items-center justify-center gap-1 rounded-md border border-gray-800 bg-maingreen-200 p-3 text-lg text-gray-800 hover:rounded-3xl max-[420px]:p-2 max-[420px]:text-base"
          >
            <MdCreate />
            <span>Start Creating</span>
          </motion.button>
          <button
            title={`${
              themeValue == "dark"
                ? "change the theme from dark to light"
                : "change the theme from light to dark"
            }`}
            className="flex items-center justify-center rounded-md border border-gray-800 bg-maingreen-300 p-3 text-gray-100 dark:text-maingreen-100 max-sm:hidden"
            onClick={handleThemeChange}
          >
            {themeValue == "dark" ? <FaSun /> : <BsFillMoonFill />}
          </button>
        </div>
      </header>

      <section className="my-5 mt-14 grid grid-cols-[repeat(2,_1fr)] max-lg:grid-cols-[repeat(1,_1fr)]">
        <div className="flex flex-col justify-start gap-24 max-lg:items-center">
          <p className="mt-8 border-gray-900 p-1 pl-4 text-sm uppercase text-gray-500 dark:border-gray-100 max-lg:pl-1 lg:border-l-4">
            FOR THE LOVE OF WRITTEN LANGUAGE
          </p>

          <div className="flex flex-col gap-2 p-1 pl-4 transition-all max-lg:items-center max-lg:pl-1">
            <h2 className="addStroke flex flex-col text-6xl text-maingreen-200 max-lg:text-center max-[448px]:text-5xl">
              <span>A book worm&apos;s </span>
              <span>heaven</span>
            </h2>
            <p className="w-[80%] max-lg:mt-3 max-lg:text-center">
              A multi-functional platform where authors and readers can create,
              read and share more text-based content.
            </p>

            <div className="mt-3 flex gap-8 max-lg:mt-5">
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1 }}
                className="flex w-fit items-center justify-center gap-1 rounded-md border border-gray-800 bg-maingreen-200 p-3 text-lg text-gray-800 hover:rounded-3xl max-[420px]:p-2 max-[420px]:text-base"
              >
                <MdCreate />
                <span>Sign up & Create</span>
              </motion.button>

              <motion.button
                initial={{ x: "-20px", opacity: 0 }}
                animate={{ x: "0px", opacity: 1 }}
                transition={{ duration: 1 }}
                className="flex w-fit items-center justify-center gap-1 rounded-md p-3 text-lg font-light underline decoration-2 underline-offset-8 hover:text-gray-600 dark:hover:text-gray-300 max-[420px]:p-2 max-[420px]:text-base max-[420px]:font-normal"
              >
                <span>Read only</span>
                <HiOutlineArrowNarrowRight className="text-4xl" />
              </motion.button>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
          className="flex items-start justify-center max-lg:mt-5 max-[420px]:mx-auto max-[420px]:w-[98%]"
        >
          <div className="mt-8 w-fit overflow-hidden rounded-[89%_79%_88%_67%_/_66%_45%_22%_10%] border border-gray-800 bg-maingreen-200 max-[500px]:rounded-md">
            <Image
              priority
              src="/svgs/readingman.svg"
              width={2624}
              height={2102}
              className="relative top-10 z-0 h-[400px] w-[400px] max-[500px]:top-12 max-[400px]:top-14 max-[380px]:top-16"
              alt="Illustration of man reading"
            />
          </div>
        </motion.div>
      </section>

      <section className="relative mt-28">
        <section className="relative pb-4">
          <h3 className="mx-auto w-fit rounded bg-gray-800 p-1 text-center text-4xl text-gray-100 dark:bg-gray-100 dark:text-gray-800 max-[420px]:text-3xl">
            Who is eChatter for?
          </h3>

          <div className="mt-10 grid grid-cols-[repeat(auto-fit,_minmax(350px,_1fr))] gap-6 px-4 text-gray-800 max-[420px]:mx-auto max-[420px]:w-[98%] max-[420px]:px-0 max-[375px]:flex max-[375px]:flex-col">
            <article className="flex flex-col items-center rounded-md border border-gray-800 bg-maingreen-300 p-3 text-center">
              <div className="w-[80px]">
                <Image
                  width={400}
                  height={350}
                  src="/pngs/female-face.png"
                  alt="illustration of a woman's face"
                />
              </div>
              <h4 className="my-4 text-2xl text-gray-900">This is Sarah</h4>
              <p className="text-lg text-gray-900">
                Sarah loves to travel, and sometimes she would love to share
                detailed guides about the places she has visited, including
                popular attractions, local culture, best restaurants,
                accommodation options, tips for getting around, recommended
                activities, must-see sights, and tips for optimizing travel
                logistics.
                <span className="my-4 block text-sm uppercase text-gray-900">
                  If your story relates to sarah&apos;s, eChatter is for you.
                </span>
              </p>
            </article>

            <article className="flex flex-col items-center rounded-md border border-gray-800 bg-maingreen-200 p-3 text-center">
              <div className="w-[70px]">
                <Image
                  width={350}
                  height={400}
                  src="/pngs/male-face.png"
                  alt="illustration of a man's face"
                />
              </div>
              <h4 className="my-4 text-2xl">This is Jon Bellion</h4>
              <p className="text-lg">
                Jon loves to cook and he wants to write about his favorite
                dishes, provide step-by-step instructions, ingredient lists, and
                cooking techniques. His recipes range from simple and quick
                meals to elaborate gourmet creations. He also wants to write
                about various cooking utensils.
                <span className="my-4 block text-sm uppercase text-gray-900">
                  If your story relates to jon&apos;s, eChatter is for you.
                </span>
              </p>
            </article>

            <article className="flex flex-col items-center rounded-md border border-gray-800 bg-maingreen-300 p-3 text-center">
              <div className="w-[80px]">
                <Image
                  width={400}
                  height={399}
                  src="/pngs/female-face2.png"
                  alt="illustration of a woman's face"
                />
              </div>
              <h4 className="my-4 text-2xl text-gray-900">This is Esther</h4>
              <p className="text-lg text-gray-900">
                Esther covers the rest of us. Whether you are a professional in
                finance, technology, marketing, or healthcare, or it's about
                organic gardening, sustainable fashion, or DIY crafts, or about
                your company and you want to share company news, product updates
                and industry trends.
                <span className="my-4 block text-sm uppercase text-gray-900">
                  If your story relates to esther&apos;s, eChatter is for you.
                </span>
              </p>
            </article>
          </div>
        </section>
      </section>

      <Footer />

      {use_of_cookie_info_popup == "false" && (
        <motion.div
          initial={{ y: "200px" }}
          animate={{ y: "0px" }}
          transition={{ duration: 1.5 }}
          className="fixed bottom-0 left-0 right-0 mx-auto flex min-h-[60px] w-[90%] items-center rounded-tl-md rounded-tr-md border border-gray-900 bg-gray-500 p-3 text-gray-100"
        >
          <div className="flex w-full items-center justify-between">
            <p>
              By continuing to use this website, you consent to the use of cookies
              in accordance with our{" "}
              <span className="cursor-pointer text-maingreen-100">
                cookie policy
              </span>
            </p>
            <button className="text-2xl" onClick={() => cookieStorage.setItem("use_of_cookie_info", "true")}>
              <AiFillCloseCircle />
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
}
