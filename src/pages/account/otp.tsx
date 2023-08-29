import { useState, useMemo, useEffect } from "react";

import type {
  InferGetServerSidePropsType,
  GetServerSidePropsContext,
} from "next";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

import { useSession } from "next-auth/react";

const ThemeSwitch = dynamic(() => import("@/components/ThemeSwitch"), {
  ssr: false,
});
import OtpInput from "@/components/OtpInput";
import LoadingSpinner from "@/components/LoadingSpinner";
import Footer from "@/components/Footer";
import Notifications from "@/components/Notifications";

import environment_url from "@/utilities/check_env";
import sessionOrLocalStorage from "@/utilities/session_local_storage";

//////////////////////////////////////////////////////////////////////////
export default function Otp({
  referer,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  //
  let callback_url = "";
  if (referer) {
    let path = referer.split(environment_url);
    path.shift();
    callback_url = path.join("").trim();
  }
  // save the callback_url to sessionStorage because the referer url is false after a refresh of page
  useEffect(() => {
    sessionOrLocalStorage.setItem("session", "callback_url", callback_url);
  }, []);

  const router = useRouter();
  const { data: session, update } = useSession();
  console.log(session);

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
      // show error notification
      return Notifications({
        name: "notify-error",
        message: "Please log in or sign up first, before account verification",
        closeBtn: true,
        timer: 5000,
      });
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

    if (res.ok) {
      // user is verified
      // 1) update session of user
      await update({ verified: true });
      // done loading
      setLoading(false);
      // 2) push to a callback_url page
      // if its not "/signup" or false, otherwise push to feed page
      // if ok is true then push to callback_url if available otherwise go to the feed page
      let callback_url_value =
        JSON.parse(
          sessionOrLocalStorage.getItem("session", "callback_url") as string
        ) ||
        callback_url ||
        "";
      // show a success notification for the user to proceed to the feed page
      // or go back to whatever page they initial were at
      Notifications({
        name: "notify-success",
        message: `Congratulations! Your email has been verified successfully.`,
        closeBtn: true,
        btns: [
          {
            btnName: `${
              callback_url_value &&
              callback_url_value !== "/" &&
              !callback_url_value.includes("/signup")
                ? "Go Back"
                : "Proceed"
            }`,
            active: true,
          },
        ],
        btnsFunctions: [
          function () {
            if (
              callback_url_value &&
              callback_url_value !== "/" &&
              !callback_url_value.includes("/signup")
            ) {
              router.push(callback_url_value);
            } else {
              router.push("/feed");
            }
          },
        ],
      });
    } else {
      // done loading
      setLoading(false);
      // show error toast
      Notifications({
        name: "notify-error",
        message: objectData?.error as string,
        closeBtn: true,
        timer: 5000,
      });
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
      // show error Notification
      return Notifications({
        name: "notify-error",
        message: "Please log in or sign up first, before account verification",
        closeBtn: true,
        timer: 5000,
      });
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
      // show success notification
      Notifications({
        name: "notify-success",
        message: objectData?.success as string,
        closeBtn: true,
        timer: 3000,
      });
    } else {
      Notifications({
        name: "notify-error",
        message: objectData?.error as string,
        closeBtn: true,
        timer: 5000,
      });
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

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  const referer = req.headers.referer || null;
  return {
    props: { referer },
  };
}
