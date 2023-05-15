import { BsFillMoonFill } from "react-icons/bs";
import { AiFillRead } from "react-icons/ai";
import { MdCreate } from "react-icons/md";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

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
      <header className="sticky top-0 mx-auto flex items-center justify-between overflow-hidden bg-gray-100 px-4 py-3 transition-all dark:bg-gray-900">
        <div className="flex items-center justify-center">
          <h1 className="rounded bg-gray-800 p-1 text-xl text-gray-100 dark:bg-gray-100 dark:text-gray-800">
            eChatter
          </h1>
        </div>

        <div className="flex items-center gap-8">
          <button className="flex w-fit items-center justify-center gap-1 rounded-md p-3 text-lg font-light hover:text-gray-600 dark:hover:text-gray-300">
            <AiFillRead />
            <span>Start Reading</span>
          </button>
          <button className="flex w-fit items-center justify-center gap-1 rounded-md border border-gray-800 bg-btngreen p-3 text-lg text-gray-800 hover:rounded-3xl">
            <MdCreate />
            <span>Start Creating</span>
          </button>
          <button
            title="change the theme from light to dark"
            className="flex items-center justify-center border-l border-gray-800 p-3 dark:border-gray-100"
            onClick={handleThemeChange}
          >
            <BsFillMoonFill />
          </button>
        </div>
      </header>

      <section className="mt-5 grid min-h-screen grid-cols-[repeat(2,_1fr)] max-lg:grid-cols-[repeat(1,_1fr)]">
        <div className="flex flex-col justify-start gap-10 max-lg:items-center">
          <p className="border-gray-900 p-1 text-sm uppercase text-gray-500 dark:border-gray-100 lg:border-l-4">
            FOR THE LOVE OF WRITTEN LANGUAGE
          </p>

          <div className="flex flex-col gap-2 p-1 max-lg:items-center">
            <h1 className="addStroke flex flex-col text-6xl text-btngreen max-lg:text-center">
              <span>A book worm's </span>
              <span>heaven</span>
            </h1>
            <p className="w-[80%] max-lg:text-center">
              A multi-functional platform where authors and readers can create,
              read and share more text-based content.
            </p>

            <div className="mt-3 flex gap-8">
              <button className="flex w-fit items-center justify-center gap-1 rounded-md border border-gray-800 bg-btngreen p-3 text-lg text-gray-800 hover:rounded-3xl">
                <MdCreate />
                <span>Sign up & Create</span>
              </button>
              <button className="flex w-fit items-center justify-center gap-1 rounded-md p-3 text-lg font-light hover:text-gray-600 dark:hover:text-gray-300">
                <span>Read only</span>
                <HiOutlineArrowNarrowRight className="text-4xl" />
              </button>
            </div>
          </div>
        </div>

        <div className=""></div>
      </section>
    </>
  );
}
