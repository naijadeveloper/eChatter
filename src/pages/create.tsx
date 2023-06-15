import { useRouter } from "next/router";

import { HiOutlineArrowNarrowLeft } from "react-icons/hi";

export default function createPage() {
  const router = useRouter();
  return (
    <>
      <header className="sticky top-0 z-20 mx-auto flex items-center justify-between overflow-hidden bg-gray-100 px-2 py-4 dark:bg-gray-900">
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

      <section className="flex min-h-[500px]">
        {/* Aside bar for eChat options */}
        <aside className="min-h-[100px] w-1/4 border"></aside>

        {/* Section for text editor */}
        <section className="min-h-[100px] w-3/4 border"></section>
      </section>
    </>
  );
}
