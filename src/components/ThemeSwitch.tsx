import { BsFillMoonFill } from "react-icons/bs";
import { FaSun } from "react-icons/fa";

import { useTheme } from "next-themes";

import { cookieStorage } from "@/utilities/cookie_storage";

export default function ThemeSwitch() {
  const { resolvedTheme, setTheme } = useTheme();

  function handleThemeChange() {
    if (resolvedTheme == "dark") {
      setTheme("light");
      cookieStorage.setItem("theme", "light");
      return;
    }

    setTheme("dark");
    cookieStorage.setItem("theme", "dark");
  }

  return (
    <button
      title={`${
        resolvedTheme == "dark"
          ? "change the theme from dark to light"
          : "change the theme from light to dark"
      }`}
      className="flex items-center justify-center rounded-md border border-gray-800 bg-maingreen-300 p-3 text-gray-100 dark:bg-maingreen-200 dark:text-maingreen-100"
      onClick={handleThemeChange}
    >
      {resolvedTheme == "dark" ? <FaSun /> : <BsFillMoonFill />}
    </button>
  );
}
