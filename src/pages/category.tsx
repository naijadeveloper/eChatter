import { useReducer, useEffect } from "react";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

import type { GetServerSidePropsContext } from "next";

import { GiNewspaper } from "react-icons/gi";
import { ImCheckboxChecked } from "react-icons/im";

import Footer from "@/components/Footer";

import all_categories from "@/utilities/echats_categories.json";

export default function categorySelectingPage({
  categories,
}: {
  categories: string[];
}) {
  const echat_categories = all_categories?.categories;
  useEffect(() => {
    // @ts-ignore
    window.myLib = {
      varing: "enoch",
    };
  });
  return (
    <>
      <section className="min-h-[500px] px-2 py-5">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-center text-4xl font-bold max-[498px]:text-3xl">
            SELECT ALL CATEGORIES OF INTEREST
          </h1>
        </div>
        <form className="mx-auto mt-10 flex w-[90%] flex-wrap justify-center gap-5 max-[737px]:justify-center">
          {echat_categories.map((category) => (
            <label
              key={category}
              htmlFor={category}
              className="category-labels relative flex min-w-[150px] cursor-pointer flex-col items-center justify-center gap-2 rounded-md bg-gray-300 p-2 py-4 font-semibold transition-transform dark:bg-gray-800 max-[759px]:min-w-[200px] max-[492px]:w-[100%] max-[492px]:py-6"
            >
              {/* image */}
              <div className="text-5xl max-[737px]:text-6xl">
                <GiNewspaper />
              </div>
              <h1 className="text-center text-2xl max-[737px]:text-3xl max-[492px]:text-4xl">
                {category}
              </h1>
              <input
                type="checkbox"
                value="news"
                defaultChecked={categories.includes(`${category}`)}
                className="hidden"
              />
              <span
                className={`absolute right-2 top-2 ${
                  categories.includes(`${category}`) ? "" : ""
                } text-lg text-maingreen-300 dark:text-maingreen-200 max-[737px]:text-xl`}
              >
                <ImCheckboxChecked />
              </span>
            </label>
          ))}
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
