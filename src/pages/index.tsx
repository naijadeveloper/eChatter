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
      <header className="sticky top-0 z-50 mx-auto flex items-center justify-between overflow-hidden bg-gray-100 px-4 py-3 transition-all dark:bg-gray-900 max-lg:flex-col max-lg:gap-5">
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
          <button className="flex w-fit items-center justify-center gap-1 rounded-md border border-gray-800 bg-maingreen-200 p-3 text-lg text-gray-800 hover:rounded-3xl">
            <MdCreate />
            <span>Start Creating</span>
          </button>
          <button
            title="change the theme from light to dark"
            className="flex items-center justify-center border-l-2 border-gray-800 p-3 dark:border-gray-100"
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

          <div className="flex flex-col gap-2 p-1 pl-4 max-lg:items-center">
            <h2 className="addStroke flex flex-col text-6xl text-maingreen-200 max-lg:text-center">
              <span>A book worm's </span>
              <span>heaven</span>
            </h2>
            <p className="w-[80%] max-lg:text-center">
              A multi-functional platform where authors and readers can create,
              read and share more text-based content.
            </p>

            <div className="mt-3 flex gap-8">
              <button className="flex w-fit items-center justify-center gap-1 rounded-md border border-gray-800 bg-maingreen-200 p-3 text-lg text-gray-800 hover:rounded-3xl">
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

        <div className="flex items-start justify-center">
          <div className="mt-8 w-fit overflow-hidden rounded-[89%_79%_88%_67%_/_66%_45%_22%_10%] border border-gray-800 bg-maingreen-200">
            <img
              src="/svgs/readingman.svg"
              className="relative top-10 z-0 h-[400px] w-[400px]"
              alt="Illustration of man reading"
            />
          </div>
        </div>
      </section>

      <section className="relative min-h-screen border-2 border-transparent">
        <div className="absolute -top-[180px] w-full max-lg:-top-[0px]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#a7ff83"
              fill-opacity="0.9"
              d="M0,192L34.3,170.7C68.6,149,137,107,206,122.7C274.3,139,343,213,411,245.3C480,277,549,267,617,224C685.7,181,754,107,823,112C891.4,117,960,203,1029,229.3C1097.1,256,1166,224,1234,208C1302.9,192,1371,192,1406,192L1440,192L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
            ></path>
          </svg>
        </div>

        <section className="relative mt-[150px] pb-8">
          <h3 className="text-center text-4xl">Who is eChatter for?</h3>

          <div className="mt-14 grid grid-cols-[repeat(auto-fit,_minmax(350px,_1fr))] gap-6 px-4 text-gray-100">
            <article className="flex flex-col items-center rounded-md bg-maingreen-300 p-3 text-center">
              <img
                src="/pngs/female-face.png"
                alt="illustration of a woman's face"
                className="w-[80px]"
              />
              <h4 className="my-4 text-2xl">This is Sarah</h4>
              <p className="text-lg text-gray-300">
                Sarah loves to travel, and sometimes she would love to share
                detailed guides about the places she has visited, including
                popular attractions, local culture, best restaurants,
                accommodation options, tips for getting around, recommended
                activities, must-see sights, and tips for optimizing travel
                logistics.
                <span>
                  If your story relates to sarah, eChatter is for you.
                </span>
              </p>
            </article>

            <article className="flex flex-col items-center rounded-md bg-maingreen-300 p-3 text-center">
              <img
                src="/pngs/female-face.png"
                alt="illustration of a woman's face"
                className="w-[80px]"
              />
              <h4>This is Sarah</h4>
              <p>
                Sarah loves to travel, and sometimes she would love to share
                detailed guides about the places she has visited, including
                popular attractions, local culture, best restaurants,
                accommodation options, tips for getting around, recommended
                activities, must-see sights, and tips for optimizing travel
                logistics.
                <span>
                  If your story relates to sarah, eChatter is for you.
                </span>
              </p>
            </article>

            <article className="flex flex-col items-center rounded-md bg-maingreen-300 p-3 text-center">
              <img
                src="/pngs/female-face.png"
                alt="illustration of a woman's face"
                className="w-[80px]"
              />
              <h4>This is Sarah</h4>
              <p>
                Sarah loves to travel, and sometimes she would love to share
                detailed guides about the places she has visited, including
                popular attractions, local culture, best restaurants,
                accommodation options, tips for getting around, recommended
                activities, must-see sights, and tips for optimizing travel
                logistics.
                <span>
                  If your story relates to sarah, eChatter is for you.
                </span>
              </p>
            </article>
          </div>
        </section>
      </section>
    </>
  );
}
