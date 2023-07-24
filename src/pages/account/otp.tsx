import Link from "next/link";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useState, useMemo } from "react";
import { useAppSelector } from "@/store/store_hooks";

import { MdClose } from "react-icons/md";

const ThemeSwitch = dynamic(() => import("@/components/ThemeSwitch"), {
  ssr: false,
});
import OtpInput from "@/components/OtpInput";
import LoadingSpinner from "@/components/LoadingSpinner";
import Footer from "@/components/Footer";

import environment_url from "@/utilities/check_env";
import { cookieStorage } from "@/utilities/cookie_storage";

/////////////////////////////////////////////////
export default function Otp() {
  const router = useRouter();

  const userInfo = useAppSelector((state) => state.user.value);

  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string>("");
  const [dbError, setDbError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const onError = (message: string) => setError(message);
  const onChange = (value: string) => setOtp(value);

  const otpLen = useMemo(
    () =>
      otp
        .trim()
        .split("")
        .filter((str) => str != " ")
        .join("").length,
    [otp]
  );

  /////////////////////////////function
  async function handleOtpSubmit() {
    // loading
    setLoading(true);
    const inputOtpCode = otp.trim();

    // get _id of user from cookie or session
    let cookieUserId = cookieStorage.getItem("user")
      ? JSON.parse(cookieStorage.getItem("user")!)?._id
      : "";
    const userId = cookieUserId;

    // if userId is still empty
    if (!userId) {
      setLoading(false);
      setDbError("Please log in or sign up first, before account verification");
      return;
    }

    // otherwise fetch api
    const res = await fetch(`${environment_url}/api/users/otp-verify`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        inputOtpCode,
      }),
    });
    const objectData = await res.json();

    // done loading
    setLoading(false);

    try {
      if (res.ok) {
        cookieStorage.deleteItem("user");
        // let user know that the validation was successfull
        setDbError(
          "Account validation was a success. You can login with your account credentials now!"
        );
      } else {
        // throw error;
        throw new Error(objectData?.error);
      }
    } catch (error: any) {
      // show ui here to notify user that something went wrong
      setDbError(error?.message);
    }
  }

  ////////////////////////////////////////////////function
  async function handleOtpResend() {
    setDbError("");
    // loading
    setLoading(true);

    let cookieUserId = cookieStorage.getItem("user")
      ? JSON.parse(cookieStorage.getItem("user")!)?._id
      : "";
    const userId = userInfo?._id || cookieUserId;

    // if userId is still empty
    if (!userId) {
      setLoading(false);
      setDbError("Please log in or sign up first, before account verification");
      return;
    }

    // otherwise fetch api
    const res = await fetch(`${environment_url}/api/users/otp-resend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
      }),
    });
    const objectData = await res.json();

    // done loading
    setLoading(false);

    try {
      if (res.ok) {
        // it is primarily for errors though, but, in this case, lets make an exception
        setDbError(objectData?.success);
      } else {
        throw new Error(objectData?.error);
      }
    } catch (error: any) {
      setDbError(error?.message);
    }
  }

  return (
    <>
      <section className="relative flex min-h-[500px] w-full items-center justify-center pt-16">
        <div className="absolute right-3 top-3">
          <ThemeSwitch />
        </div>

        <div className="mt-8 w-[98%] max-w-[430px] rounded-md">
          {dbError && (
            <div className="relative mx-auto flex w-[90%] flex-col items-center justify-center rounded-tl-md rounded-tr-md bg-red-700 p-2 text-sm text-gray-100">
              <span className="w-[90%] text-center text-lg font-semibold">
                {dbError}
              </span>
              <span
                onClick={() => setDbError("")}
                className="absolute right-[2px] top-1 cursor-pointer font-bold"
              >
                <MdClose size={24} />
              </span>

              {dbError.includes("Please log in or sign up") && (
                <div className="mt-2 flex items-center justify-center gap-4">
                  <Link
                    href="/account/login"
                    className="flex items-center justify-center rounded-md border-2 border-gray-900 bg-maingreen-200 p-2 px-4 text-gray-800"
                  >
                    Log in
                  </Link>

                  <Link
                    href="/account/signup"
                    className="flex items-center justify-center rounded-md border-2 border-gray-900 bg-maingreen-200 p-2 px-4 text-gray-800"
                  >
                    Sign up
                  </Link>
                </div>
              )}

              {dbError.includes("You are not a registered user") && (
                <div className="mt-2 flex items-center justify-center gap-4">
                  <Link
                    href="/account/signup"
                    className="flex items-center justify-center rounded-md border-2 border-gray-900 bg-maingreen-200 p-2 px-4 text-gray-800"
                  >
                    Sign up
                  </Link>
                </div>
              )}

              {dbError.includes("You are already verified") && (
                <div className="mt-2 flex items-center justify-center gap-4">
                  <Link
                    href="/account/login"
                    className="flex items-center justify-center rounded-md border-2 border-gray-900 bg-maingreen-200 p-2 px-4 text-gray-800"
                  >
                    Log in
                  </Link>
                </div>
              )}

              {dbError.includes("The otp has expired") && (
                <div className="mt-2 flex items-center justify-center gap-4">
                  <button
                    onClick={handleOtpResend}
                    className="flex items-center justify-center rounded-md border-2 border-gray-900 bg-maingreen-200 p-2 px-4 text-gray-800"
                  >
                    Resend otp
                  </button>
                </div>
              )}
            </div>
          )}

          <div
            className={`rounded-md bg-gray-900 p-7 text-gray-100 dark:bg-gray-100 dark:text-gray-800`}
          >
            <header className="flex flex-col gap-3 text-center font-semibold">
              <h2 className="text-3xl">Verify Your Account</h2>
              <p className="flex flex-col gap-1 text-sm text-gray-400 dark:text-gray-600">
                <span>
                  A one-time-password has been sent to your email address.
                  Please enter / copy & paste the password into the input boxes
                  below.
                </span>
              </p>
            </header>

            <OtpInput {...{ value: otp, valueLength: 8, onChange, onError }} />

            {error && (
              <span className="mt-5 flex w-full items-center justify-center text-sm text-red-700">
                {error}
              </span>
            )}

            <div className="mt-8 h-14 w-full">
              <button
                disabled={!(otpLen === 8)}
                onClick={handleOtpSubmit}
                className={`h-full w-full rounded-md ${
                  otpLen === 8
                    ? "bg-maingreen-300 text-gray-100 dark:bg-maingreen-200"
                    : "cursor-not-allowed bg-gray-500"
                } hover:opacity-95 dark:border dark:border-gray-800 dark:text-gray-800`}
              >
                Verify
              </button>
            </div>

            <small className="mt-4 flex w-full justify-center">
              Did not receive a code?{" "}
              <button
                onClick={handleOtpResend}
                className="px-1 text-gray-500 underline decoration-2 underline-offset-2 hover:text-maingreen-100 dark:hover:text-maingreen-400"
              >
                RESEND!!
              </button>
            </small>
          </div>
        </div>

        {loading && <LoadingSpinner />}
      </section>

      <Footer />
    </>
  );
}
