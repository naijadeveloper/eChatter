import Link from "next/link";

import { AiOutlineEyeInvisible } from "react-icons/ai";

import ThemeSwitch from "@/components/ThemeSwitch";

export default function Login() {
  return (
    <section
      id="container-forms"
      className="relative flex min-h-[500px] w-full items-center justify-center"
    >
      <div className="absolute right-3 top-3">
        <ThemeSwitch />
      </div>

      <div
        id="form-login"
        className="mt-8 w-[98%] max-w-[430px] rounded-md bg-gray-900 p-7 text-gray-100 dark:bg-gray-100 dark:text-gray-800"
      >
        <div id="form_content">
          <header className="text-center text-3xl font-semibold">Log In</header>

          <form className="mt-7">
            <div id="field-input_field" className="mt-5 h-11 w-full">
              <input
                type="email"
                placeholder="Email"
                className="h-full w-full rounded-md bg-gray-100 px-3 text-gray-800 outline-none dark:bg-gray-800 dark:text-gray-100"
              />
            </div>

            <div id="field-input_field" className="relative mt-5 h-11 w-full">
              <input
                type="password"
                placeholder="Password"
                className="h-full w-full rounded-md bg-gray-100 px-3 text-gray-800 outline-none dark:bg-gray-800 dark:text-gray-100"
              />
              <button className="absolute right-3 top-2/4 -translate-y-2/4 cursor-pointer text-lg text-gray-500">
                <AiOutlineEyeInvisible />
              </button>
            </div>

            <div id="form-link" className="mt-2 text-center">
              <Link
                href="#"
                id="forgot_pass"
                className="text-gray-500 underline decoration-2 underline-offset-2 hover:text-maingreen-100 dark:hover:text-maingreen-400"
              >
                Forgot Password
              </Link>
            </div>

            <div id="field-button_field" className="mt-5 h-11 w-full">
              <button className="h-full w-full rounded-md bg-maingreen-200 text-gray-800 hover:opacity-95 dark:border dark:border-gray-800">
                Log In
              </button>
            </div>

            <div id="form-link" className="mt-2 text-center">
              <span>
                Don't have an account?{" "}
                <Link
                  href="/account/signup"
                  id="signup_link"
                  className="text-gray-500 underline decoration-2 underline-offset-2 hover:text-maingreen-100 dark:hover:text-maingreen-400"
                >
                  Sign up
                </Link>
              </span>
            </div>
          </form>

          <div className="relative mt-9 h-[1px] w-full bg-gray-500 before:absolute before:left-2/4 before:top-2/4 before:-translate-x-2/4 before:-translate-y-2/4 before:bg-gray-900 before:px-2 before:text-gray-500 before:content-['OR'] dark:before:bg-gray-100"></div>
        </div>
      </div>
    </section>
  );
}
