import { useState, useEffect } from "react";

import { useRouter } from "next/router";

import { useSession } from "next-auth/react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function userFeeds() {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (
      session?.user?.category_interests &&
      session?.user.category_interests.length === 0
    ) {
      router.replace("/category");
    }
  }, [session?.user]);

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

userFeeds.auth = true;
