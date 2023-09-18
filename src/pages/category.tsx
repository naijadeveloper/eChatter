import { useReducer } from "react";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

import type { GetServerSidePropsContext } from "next";

import { ImCheckboxChecked } from "react-icons/im";

import Footer from "@/components/Footer";

import { all_categories } from "@/utilities/echat_variables";

export default function categorySelectingPage({
  categories,
}: {
  categories: string[];
}) {
  const echat_categories = all_categories;

  const [selectedCategories, updateSelectedCategories] = useReducer(
    (state: string[], category: string): string[] => {
      let newState: string[] = [];

      if (category === "") {
        newState = [];
      } else if (category === "All") {
        newState = all_categories.map(([category]) => category as string);
      } else if (state.includes(category)) {
        newState = state.filter((item) => item !== category);
      } else {
        newState = [...state, category];
      }

      return newState;
    },
    [...categories]
  );

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateSelectedCategories(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // remove form's default behaviour
    if (selectedCategories.length === 0) {
      return undefined;
    }

    //else update database and next auth session
    console.log(selectedCategories);
  };

  return (
    <>
      <section className="min-h-[500px] px-2 py-5">
        <div className="flex flex-col items-center justify-center gap-y-5">
          <h1 className="text-center text-4xl font-bold max-[498px]:text-3xl">
            SELECT ALL CATEGORIES OF INTEREST
          </h1>
          <div className="flex w-full items-center justify-center gap-x-5">
            <button
              onClick={() => updateSelectedCategories("All")}
              className="w-fit rounded-full p-1 px-4 font-semibold hover:bg-gray-300 dark:hover:bg-gray-800"
            >
              SELECT ALL
            </button>
            <button
              onClick={() => updateSelectedCategories("")}
              className="w-fit rounded-full p-1 px-4 font-semibold hover:bg-gray-300 dark:hover:bg-gray-800"
            >
              UNSELECT ALL
            </button>
          </div>
        </div>
        <form
          onSubmit={handleFormSubmit}
          className="mt-5 flex flex-col items-center gap-y-12"
        >
          <div className="flex flex-wrap justify-center gap-5">
            {echat_categories.map(([category, icon], index) => (
              <label
                key={index}
                htmlFor={category as string}
                className="category-labels relative flex min-w-[150px] cursor-pointer flex-col items-center justify-center gap-2 rounded-md bg-gray-300 p-2 py-4 font-semibold transition-transform dark:bg-gray-800 max-[759px]:min-w-[200px] max-[492px]:w-[100%] max-[492px]:py-6"
              >
                {/* image */}
                <div className="text-5xl max-[737px]:text-6xl">{icon}</div>
                <h1 className="text-center text-2xl max-[737px]:text-3xl max-[492px]:text-4xl">
                  {category}
                </h1>
                <input
                  type="checkbox"
                  value={category as string}
                  id={category as string}
                  checked={selectedCategories.includes(`${category as string}`)}
                  onChange={(e) => handleCheckboxChange(e)}
                  className="hidden"
                />
                <span
                  className={`absolute right-2 top-2 ${
                    selectedCategories.includes(`${category}`)
                      ? "flex"
                      : "hidden"
                  } text-lg text-maingreen-300 dark:text-maingreen-200 max-[737px]:text-xl`}
                >
                  <ImCheckboxChecked />
                </span>
              </label>
            ))}
          </div>

          <div className="flex w-full items-center justify-center">
            <button
              className={`w-[70%] rounded-md py-4 text-2xl font-semibold text-gray-100 ${
                selectedCategories.length === 0
                  ? "cursor-not-allowed bg-gray-500"
                  : "bg-maingreen-300 hover:bg-maingreen-300/75 dark:bg-maingreen-200 dark:hover:bg-maingreen-200/75"
              } max-[759px]:w-[85%] max-[492px]:w-[100%]`}
            >
              Submit
            </button>
          </div>
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
