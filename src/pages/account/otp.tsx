import Link from "next/link";
import { useState, useMemo } from "react";

import ThemeSwitch from "@/components/ThemeSwitch";
import OtpInput from "@/components/OtpInput";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function Otp() {
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

  function handleOtpSubmit() {
    // Validate otp from database
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }

  return (
    <section className="relative flex min-h-[500px] w-full items-center justify-center pt-16">
      <div className="absolute right-3 top-3">
        <ThemeSwitch />
      </div>

      <div className="mt-8 w-[98%] max-w-[430px] rounded-md bg-gray-900 p-7 text-gray-100 dark:bg-gray-100 dark:text-gray-800">
        <div>
          <header className="flex flex-col gap-3 text-center font-semibold">
            <h2 className="text-3xl">Verify Your Account</h2>
            <p className="flex flex-col gap-1 text-sm text-gray-400 dark:text-gray-600">
              <span>
                A one-time-password has been sent to your email address. Please
                enter / copy & paste the password into the input boxes below.
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
                  ? "bg-maingreen-200"
                  : "cursor-not-allowed bg-gray-500"
              } text-gray-800 hover:opacity-95 dark:border dark:border-gray-800`}
            >
              Verify
            </button>
          </div>

          <small className="mt-4 flex w-full justify-center">
            Did not receive a code?{" "}
            <Link
              href="#"
              className="px-1 text-gray-500 underline decoration-2 underline-offset-2 hover:text-maingreen-100 dark:hover:text-maingreen-400"
            >
              RESEND!!
            </Link>
          </small>
        </div>
      </div>

      {loading && <LoadingSpinner />}
    </section>
  );
}
