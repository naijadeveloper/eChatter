import Link from "next/link";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useState, useMemo } from "react";

import { MdClose } from "react-icons/md";

import toast from "react-hot-toast";

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

  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string>("");
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

  //////////////////////////////////////////////////////////////////////////
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
      // show error toast
      toast.error(
        "Please log in or sign up first, before account verification"
      );
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

    if (res.ok) {
      // delete the user cookie. it saves the _id of the user
      cookieStorage.deleteItem("user");
      // show success toast
      toast.success(
        "Account validation was a success. You can login with your account credentials now!"
      );
    } else {
      // show error toast
      toast.error(objectData?.error);
    }
  }

  //////////////////////////////////////////////////////////////////////////
  async function handleOtpResend() {
    // loading
    setLoading(true);

    let cookieUserId = cookieStorage.getItem("user")
      ? JSON.parse(cookieStorage.getItem("user")!)?._id
      : "";
    const userId = cookieUserId;

    // if userId is still empty
    if (!userId) {
      setLoading(false);
      // show error toast
      toast.error(
        "Please log in or sign up first, before account verification"
      );
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

    if (res.ok) {
      // show success toast
      toast.success(objectData?.success);
    } else {
      toast.error(objectData?.error);
    }
  }

  return (
    <>
      <section className="relative flex min-h-[500px] w-full items-center justify-center pt-16">
        <div className="absolute right-3 top-3">
          <ThemeSwitch />
        </div>

        <div className="mt-8 w-[98%] max-w-[430px] rounded-md">
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
