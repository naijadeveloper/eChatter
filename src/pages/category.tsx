import { useReducer } from "react";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

import type { GetServerSidePropsContext } from "next";

import Footer from "@/components/Footer";

import { GiNewspaper } from "react-icons/gi";
import { ImCheckboxChecked } from "react-icons/im";

export default function categorySelectingPage({
  categories,
}: {
  categories: string[];
}) {
  return (
    <>
      <section className="min-h-[500px] px-2 py-5">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-center text-4xl font-bold">
            SELECT ALL CATEGORIES OF INTEREST
          </h1>
        </div>
        <form className="mx-auto mt-10 flex w-[90%] flex-wrap justify-start">
          <label
            htmlFor="news"
            className="category-labels relative flex min-w-[150px] cursor-pointer flex-col items-center justify-center rounded-md bg-gray-300 p-2 py-4 font-semibold transition-transform dark:bg-gray-800"
          >
            {/* image */}
            <div className="text-5xl">
              <GiNewspaper />
            </div>
            <h1 className="text-xl">News</h1>
            <input
              type="checkbox"
              value="news"
              defaultChecked={categories.includes("news")}
              className="hidden"
            />
            <span
              className={`absolute right-2 top-2 ${
                categories.includes("news") ? "" : ""
              } text-lg text-maingreen-300 dark:text-maingreen-200`}
            >
              <ImCheckboxChecked />
            </span>
          </label>
        </form>
      </section>
      <Footer />
    </>
  );
}

categorySelectingPage.auth = true;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  return {
    props: {
      categories: session?.user?.category_interests ?? [],
    },
  };
}

//     "News",
//     "Sports",
//     "Music",
//     "Movie",
//     "Science",
//     "Technology",
//     "Art",
//     "Fashion",
//     "Health",
//     "Lifestyle",
//     "Travel",
//     "Food & Cooking",
//     "Business & Finance",
//     "Education",
//     "Politics",
//     "Environment",
//     "Relationship",
//     "Personal Development",
//     "DIY & Crafts",
//     "Religion",
