import { useState } from "react";

import { useRouter } from "next/router";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

import type {
  InferGetServerSidePropsType,
  GetServerSidePropsContext,
} from "next";

import { useSession } from "next-auth/react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function userFeeds({
  following,
}: {
  following: Record<string, unknown>[];
}) {
  const router = useRouter();
  const { data: session } = useSession();

  const [openSearchDropDown, setOpenSearchDropDown] = useState<boolean>(false);
  const [searchDropDown, setSearchDropDown] = useState<string>("eChat");

  const [searchedPhrase, setSearchedPhrase] = useState<string>("");

  const [openDashboardDropDown, setOpenDashboardDropDown] =
    useState<boolean>(false);

  const headerProps = {
    page: "Home",

    openSearchDD: openSearchDropDown,
    setOpenSearchDD: (val: boolean) => {
      setOpenSearchDropDown(val);
    },
    searchDD: searchDropDown,
    setSearchDD: (val: string) => {
      setSearchDropDown(val);
    },

    searchedP: searchedPhrase,
    setSearchedP: (val: string) => {
      setSearchedPhrase(val);
    },

    openDashboardDD: openDashboardDropDown,
    setOpenDashboardDD: (val: boolean) => {
      setOpenDashboardDropDown(val);
    },
  };

  return (
    <>
      <Header {...headerProps} />

      <section
        onClick={() => {
          setOpenSearchDropDown(false);
          setOpenDashboardDropDown(false);
        }}
        className="min-h-[500px] px-2 py-5"
      >
        welcome to your {!searchedPhrase ? "feeds" : searchedPhrase}
      </section>

      <Footer />
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (
    session &&
    session.user &&
    session.user.category_interests &&
    session.user.category_interests.length === 0
  ) {
    return {
      redirect: {
        destination: "/category",
        permanent: false,
      },
    };
  }

  // perform search through db for user's 'following list' that have new posts first and all the others
  return {
    props: {
      following: [],
    },
  };
}

userFeeds.auth = true;
