import { useState, useMemo } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

import { useSession } from "next-auth/react";

import toast from "react-hot-toast";

const ThemeSwitch = dynamic(() => import("@/components/ThemeSwitch"), {
  ssr: false,
});
import OtpInput from "@/components/OtpInput";
import LoadingSpinner from "@/components/LoadingSpinner";
import Footer from "@/components/Footer";

import environment_url from "@/utilities/check_env";

/////////////////////////////////////////////////
export default function Otp() {
  const router = useRouter();
  const { data: session, status } = useSession();

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
    const userId = session?.user?.id;

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
      // user is verified push to feed page
      router.push("/feed");
    } else {
      // show error toast
      toast.error(objectData?.error);
    }
  }

  //////////////////////////////////////////////////////////////////////////
  async function handleOtpResend() {
    // loading
    setLoading(true);

    const userId = session?.user?.id;

    // if userId is still empty
    if (!userId) {
      setLoading(false);
      // show error toast
      toast.error(
        "Please log in or sign up first, before account verification"
      );
      return;
    }

    // fetch api
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
