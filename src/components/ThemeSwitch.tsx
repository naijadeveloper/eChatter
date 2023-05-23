import { BsFillMoonFill } from "react-icons/bs";
import { FaSun } from "react-icons/fa";

import { useAppSelector, useAppDispatch } from "@/store/store_hooks";
import { changeTheme } from "@/store/theme_slice";

export default function ThemeSwitch() {
  const themeValue = useAppSelector((state) => state.theme.value);
  const dispatch = useAppDispatch();

  function handleThemeChange() {
    if (themeValue == "dark") {
      dispatch(changeTheme(""));
      return;
    }

    dispatch(changeTheme("dark"));
  }

  return (
    <button
      title={`${
        themeValue == "dark"
          ? "change the theme from dark to light"
          : "change the theme from light to dark"
      }`}
      className="flex items-center justify-center rounded-md border border-gray-800 bg-maingreen-300 p-3 text-gray-100 dark:text-maingreen-100"
      onClick={handleThemeChange}
    >
      {themeValue == "dark" ? <FaSun /> : <BsFillMoonFill />}
    </button>
  );
}
