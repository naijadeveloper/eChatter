import { useState } from "react";

import Header from "@/components/Header";

export default function notificationsPage() {
  const [searchedPhrase, setSearchedPhrase] = useState<string>("");

  const [openDashboardDropDown, setOpenDashboardDropDown] =
    useState<boolean>(false);

  const headerProps = {
    page: "Notifications",

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
          setOpenDashboardDropDown(false);
        }}
        className="min-h-[500px] py-5 px-2"
      >
        Welcome to {!searchedPhrase ? "notifications" : searchedPhrase}
      </section>
    </>
  );
}
