import Link from "next/link";

import ThemeSwitch from "@/components/ThemeSwitch";

export default function Signup() {
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
        className="w-[98%] max-w-[430px] rounded-md bg-gray-900 p-7 text-gray-100 dark:bg-gray-100 dark:text-gray-800"
      >
        <div id="form_content">
          <header>Sign In</header>

          <form>
            <div id="field-input_field">
              <input type="email" placeholder="Email" />
            </div>

            <div id="field-input_field">
              <input type="password" placeholder="Create password" />
            </div>

            <div id="field-input_field">
              <input type="password" placeholder="Confirm password" />
            </div>

            <div id="field-button_field">
              <button>Sign up</button>
            </div>

            <div id="form-link">
              <span>
                Already have an account?{" "}
                <Link href="/account/login" id="login_link">
                  Log In
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
