import { AiFillRead, AiFillCloseCircle } from "react-icons/ai";
import { MdCreate } from "react-icons/md";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import dynamic from "next/dynamic";

const ThemeSwitch = dynamic(() => import("@/components/ThemeSwitch"), {
  ssr: false,
});
import Footer from "@/components/Footer";

import { cookieStorage } from "@/utilities/cookie_storage";

////////////////////////////////////////////////////////////////////
export default function Home() {
  const [use_of_cookie_info, set_use_of_cookie_info] = useState("true");

  useEffect(() => {
    set_use_of_cookie_info(
      () => cookieStorage.getItem("use_of_cookie_info") ?? "false"
    );
  }, []);

  function use_of_cookie_info_function() {
    cookieStorage.setItem("use_of_cookie_info", "true");
    set_use_of_cookie_info(() => "true");
  }

  return (
    <>
      <header className="sticky top-0 z-50 mx-auto flex items-center justify-between overflow-hidden bg-gray-100 px-4 py-3 dark:bg-gray-900 max-lg:flex-col max-lg:gap-5">
        <div className="flex items-center justify-center max-sm:w-full max-sm:justify-between">
          <h1 className="rounded bg-gray-800 p-1 text-xl text-gray-100 dark:bg-gray-100 dark:text-gray-800">
            eChatter
          </h1>

          <div className="hidden max-sm:flex">
            <ThemeSwitch />
          </div>
        </div>

        <div className="flex items-center justify-evenly gap-8 transition-all max-sm:w-full sm:justify-center">
          <button className="flex w-fit items-center justify-center gap-1 rounded-md p-3 text-lg font-light underline decoration-2 underline-offset-8 hover:text-gray-600 dark:hover:text-gray-300 max-[420px]:p-2 max-[420px]:text-base max-[420px]:font-normal">
            <AiFillRead />
            <Link href="/feed/readonly">Start Reading</Link>
          </button>

          <button className="flex w-fit items-center justify-center gap-1 rounded-md border border-gray-800 bg-maingreen-300 p-3 text-lg text-gray-100 hover:rounded-3xl dark:bg-maingreen-200 dark:text-gray-800 max-[420px]:p-2 max-[420px]:text-base">
            <MdCreate />
            <Link href="/account/signup">Start Creating</Link>
          </button>

          <div className="max-sm:hidden">
            <ThemeSwitch />
          </div>
        </div>
      </header>

      <section className="my-5 mt-14 grid grid-cols-[repeat(2,_1fr)] max-lg:grid-cols-[repeat(1,_1fr)]">
        <div className="flex flex-col justify-start gap-24 max-lg:items-center">
          <p className="mt-8 border-gray-900 p-1 pl-4 text-sm uppercase text-gray-500 dark:border-gray-100 max-lg:pl-1 lg:border-l-4">
            FOR THE LOVE OF WRITTEN LANGUAGE
          </p>

          <div className="flex flex-col gap-2 p-1 pl-4 transition-all max-lg:items-center max-lg:pl-1">
            <h2
              className={`flex flex-col font-sans text-6xl font-semibold text-maingreen-300 dark:text-maingreen-200 max-lg:text-center max-[448px]:text-5xl`}
            >
              <span>A book worm&apos;s </span>
              <span>heaven</span>
            </h2>
            <p className="w-[80%] max-lg:mt-3 max-lg:text-center">
              A multi-functional platform where authors and readers can create,
              read and share more text-based content.
            </p>

            <div className="mt-3 flex gap-8 max-lg:mt-5">
              <button className="flex w-fit items-center justify-center gap-1 rounded-md border border-gray-800 bg-maingreen-300 p-3 text-lg text-gray-100 hover:rounded-3xl dark:bg-maingreen-200 dark:text-gray-800 max-[420px]:p-2 max-[420px]:text-base">
                <MdCreate />
                <Link href="/account/signup">Sign up & Create</Link>
              </button>

              <button className="flex w-fit items-center justify-center gap-1 rounded-md p-3 text-lg font-light underline decoration-2 underline-offset-8 hover:text-gray-600 dark:hover:text-gray-300 max-[420px]:p-2 max-[420px]:text-base max-[420px]:font-normal">
                <Link href="/feed/readonly">Read only</Link>
                <HiOutlineArrowNarrowRight className="text-4xl" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-start justify-center max-lg:mt-5 max-[420px]:mx-auto max-[420px]:w-[98%]">
          <div className="mt-8 w-fit overflow-hidden rounded-[89%_79%_88%_67%_/_66%_45%_22%_10%] bg-gray-200 dark:bg-gray-800 max-[500px]:rounded-md">
            <Image
              priority
              src="/svgs/readingman.svg"
              width={2624}
              height={2102}
              className="relative top-10 z-0 h-[400px] w-[400px] max-[500px]:top-12 max-[400px]:top-14 max-[380px]:top-16"
              alt="Illustration of man reading"
            />
          </div>
        </div>
      </section>

      <section className="relative mt-28">
        <section className="relative pb-4">
          <h3 className="mx-auto w-fit rounded bg-gray-800 p-1 text-center text-4xl text-gray-100 dark:bg-gray-100 dark:text-gray-800 max-[420px]:text-3xl">
            Who is eChatter for?
          </h3>

          <div className="mt-10 grid grid-cols-[repeat(auto-fit,_minmax(350px,_1fr))] gap-6 px-4 text-gray-800 max-[420px]:mx-auto max-[420px]:w-[98%] max-[420px]:px-0 max-[375px]:flex max-[375px]:flex-col">
            <article className="flex flex-col items-center rounded-md border border-gray-800 bg-maingreen-300 p-3 text-center text-gray-950">
              <div className="w-[80px]">
                <Image
                  width={400}
                  height={350}
                  src="/pngs/female-face.png"
                  alt="illustration of a woman's face"
                />
              </div>
              <h4 className="my-4 text-2xl">This is Sarah</h4>
              <p className="text-lg">
                Sarah loves to travel, and sometimes she would love to share
                detailed guides about the places she has visited, including
                popular attractions, local culture, best restaurants,
                accommodation options, tips for getting around, recommended
                activities, must-see sights, and tips for optimizing travel
                logistics.
                <span className="my-4 block text-sm">
                  IF YOUR STORY RELATES TO SARAH'S{" "}
                  <span className="text-base underline decoration-2">
                    eChatter
                  </span>{" "}
                  IS FOR YOU.
                </span>
              </p>
            </article>

            <article className="flex flex-col items-center rounded-md border border-gray-800 bg-maingreen-200 p-3 text-center text-gray-950">
              <div className="w-[68px]">
                <Image
                  width={350}
                  height={400}
                  src="/pngs/male-face.png"
                  alt="illustration of a man's face"
                />
              </div>
              <h4 className="my-4 text-2xl">This is Jon</h4>
              <p className="text-lg">
                Jon loves to cook and he wants to write about his favorite
                dishes, provide step-by-step instructions, ingredient lists, and
                cooking techniques. His recipes range from simple and quick
                meals to elaborate gourmet creations. He also wants to write
                about various cooking utensils.
                <span className="my-4 block text-sm">
                  IF YOUR STORY RELATES TO JON'S{" "}
                  <span className="text-base underline decoration-2">
                    eChatter
                  </span>{" "}
                  IS FOR YOU.
                </span>
              </p>
            </article>

            <article className="flex flex-col items-center rounded-md border border-gray-800 bg-maingreen-300 p-3 text-center text-gray-950">
              <div className="w-[80px]">
                <Image
                  width={400}
                  height={399}
                  src="/pngs/female-face2.png"
                  alt="illustration of a woman's face"
                />
              </div>
              <h4 className="my-4 text-2xl">This is Esther</h4>
              <p className="text-lg">
                Esther covers the rest of us. Whether you are a professional in
                finance, technology, marketing, journalism or healthcare, or
                it's about organic gardening, sustainable fashion, or DIY
                crafts, or about your company and you want to share company news
                and product or you just like to gossip.
                <span className="my-4 block text-sm">
                  IF YOUR STORY RELATES TO ESTHER'S{" "}
                  <span className="text-base underline decoration-2">
                    eChatter
                  </span>{" "}
                  IS FOR YOU.
                </span>
              </p>
            </article>
          </div>
        </section>
      </section>

      {use_of_cookie_info == "false" && (
        <div className="fixed bottom-0 left-0 right-0 mx-auto flex min-h-[60px] w-[90%] items-center rounded-tl-md rounded-tr-md border border-gray-900 bg-gray-600 p-3 text-gray-100">
          <div className="flex w-full items-center justify-between">
            <p>
              By continuing to use this website, you consent to the use of
              cookies in accordance with the{" "}
              <span className="cursor-pointer text-maingreen-100 underline decoration-2">
                cookie policy
              </span>
            </p>
            <button
              className="ml-4 text-3xl"
              onClick={use_of_cookie_info_function}
            >
              <AiFillCloseCircle />
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
