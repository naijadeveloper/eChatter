import { useState } from "react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function explorePage() {
  const [openSearchDropDown, setOpenSearchDropDown] = useState<boolean>(false);
  const [searchDropDown, setSearchDropDown] = useState<string>("eChat");

  const [searchedPhrase, setSearchedPhrase] = useState<string>("");

  const [openDashboardDropDown, setOpenDashboardDropDown] =
    useState<boolean>(false);

  const headerProps = {
    page: "Explore",

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
        Welcome to {!searchedPhrase ? "explore" : searchedPhrase}
      </section>

      <Footer />
    </>
  );
}


explorePage.auth = true;