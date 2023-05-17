import { BsFillMoonFill } from "react-icons/bs";
import { AiFillRead } from "react-icons/ai";
import { MdCreate } from "react-icons/md";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

import { motion } from "framer-motion";

import { useAppSelector, useAppDispatch } from "@/store/store_hooks";
import { changeTheme } from "@/store/theme_slice";

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
  return (
    <>
      <header className="sticky top-0 z-50 mx-auto flex items-center justify-between overflow-hidden bg-gray-100 px-4 py-3 dark:bg-gray-900 max-lg:flex-col max-lg:gap-5">
        <div className="flex items-center justify-center max-sm:w-full max-sm:justify-between">
          <h1 className="rounded bg-gray-800 p-1 text-xl text-gray-100 dark:bg-gray-100 dark:text-gray-800">
            eChatter
          </h1>
          <button
            title="change the theme from light to dark"
            className="hidden items-center justify-center p-3  max-sm:flex"
            onClick={handleThemeChange}
          >
            <BsFillMoonFill />
          </button>
        </div>

        <div className="flex items-center justify-evenly gap-8 transition-all max-sm:w-full sm:justify-center">
          <motion.button
            initial={{ x: "-20px", opacity: 0 }}
            animate={{ x: "0px", opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex w-fit items-center justify-center gap-1 rounded-md p-3 text-lg font-light underline decoration-2 underline-offset-4 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <AiFillRead />
            <span>Start Reading</span>
          </motion.button>
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1 }}
            className="flex w-fit items-center justify-center gap-1 rounded-md border border-gray-800 bg-maingreen-200 p-3 text-lg text-gray-800 hover:rounded-3xl max-[412px]:p-2"
          >
            <MdCreate />
            <span>Start Creating</span>
          </motion.button>
          <button
            title="change the theme from light to dark"
            className="flex items-center justify-center border-l-2 border-gray-800 p-3 dark:border-gray-100 max-sm:hidden"
            onClick={handleThemeChange}
          >
            <BsFillMoonFill />
          </button>
        </div>
      </header>

      <section className="mt-5 grid min-h-screen grid-cols-[repeat(2,_1fr)] max-lg:grid-cols-[repeat(1,_1fr)]">
        <div className="flex flex-col justify-start gap-24 max-lg:items-center">
          <p className="mt-8 border-gray-900 p-1 pl-4 text-sm uppercase text-gray-500 dark:border-gray-100 lg:border-l-4">
            FOR THE LOVE OF WRITTEN LANGUAGE
          </p>

          <div className="flex flex-col gap-2 p-1 pl-4 transition-all max-lg:items-center">
            <h2 className="addStroke flex flex-col text-6xl text-maingreen-200 max-lg:text-center">
              <span>A book worm&apos;s </span>
              <span>heaven</span>
            </h2>
            <p className="w-[80%] max-lg:text-center">
              A multi-functional platform where authors and readers can create,
              read and share more text-based content.
            </p>

            <div className="mt-3 flex gap-8">
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1 }}
                className="flex w-fit items-center justify-center gap-1 rounded-md border border-gray-800 bg-maingreen-200 p-3 text-lg text-gray-800 hover:rounded-3xl"
              >
                <MdCreate />
                <span>Sign up & Create</span>
              </motion.button>
              <motion.button
                initial={{ x: "-20px", opacity: 0 }}
                animate={{ x: "0px", opacity: 1 }}
                transition={{ duration: 1 }}
                className="flex w-fit items-center justify-center gap-1 rounded-md p-3 text-lg font-light underline decoration-2 underline-offset-4 hover:text-gray-600 dark:hover:text-gray-300"
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
          className="flex items-start justify-center"
        >
          <div className="mt-8 w-fit overflow-hidden rounded-[89%_79%_88%_67%_/_66%_45%_22%_10%] border border-gray-800 bg-maingreen-200">
            <img
              src="/svgs/readingman.svg"
              className="relative top-10 z-0 h-[400px] w-[400px]"
              alt="Illustration of man reading"
            />
          </div>
        </motion.div>
      </section>

      <section className="relative min-h-screen max-lg:mt-32">
        <section className="relative pb-4">
          <h3 className="mx-auto w-fit rounded bg-gray-800 p-1 text-center text-4xl text-gray-100 dark:bg-gray-100 dark:text-gray-800">
            Who is eChatter for?
          </h3>

          <div className="mt-10 grid grid-cols-[repeat(auto-fit,_minmax(350px,_1fr))] gap-6 px-4 text-gray-800">
            <article className="flex flex-col items-center rounded-md border border-gray-800 bg-maingreen-300 p-3 text-center">
              <div className="w-[80px]">
                <img
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
                <img
                  src="/pngs/male-face.png"
                  alt="illustration of a man's face"
                />
              </div>
              <h4 className="my-4 text-2xl">This is Andrew</h4>
              <p className="text-lg">
                Andrew loves to cook and andrew wants to write about his
                favorite dishes, provide step-by-step instructions, ingredient
                lists, and cooking techniques. His recipes range from simple and
                quick meals to elaborate gourmet creations. He also wants to
                write about various cooking techniques.
                <span className="my-4 block text-sm uppercase text-gray-900">
                  If your story relates to andrew&apos;s, eChatter is for you.
                </span>
              </p>
            </article>

            <article className="flex flex-col items-center rounded-md border border-gray-800 bg-maingreen-300 p-3 text-center">
              <div className="w-[80px]">
                <img
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

      <footer className="mx-auto mt-8 flex min-h-[100px] w-[80%] items-center pt-3 max-lg:flex-col-reverse max-md:w-full">
        <div className="flex h-[200px] w-[200px] shrink-0 flex-col items-center justify-center">
          <img src="/logo/echatter3.svg" alt="" />
          <span className="-mt-5 block text-sm font-semibold text-gray-500">
            copyright &copy; 2023, eChatter
          </span>
        </div>

        <div className="flex w-full grow items-center">
          <ul className="flex w-full flex-wrap justify-evenly gap-4 px-1 text-gray-500">
            <li className="wel-footer-links">What is eChatter?</li>
            <li className="wel-footer-links">Tools</li>
            <li className="wel-footer-links">Worktabs</li>
            <li className="wel-footer-links">Issues</li>
            <li className="wel-footer-links">Privacy Policy</li>
            <li className="wel-footer-links">Terms</li>
          </ul>
        </div>
      </footer>
    </>
  );
}
