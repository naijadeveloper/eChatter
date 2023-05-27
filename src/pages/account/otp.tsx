import Link from "next/link";
import { useState, useMemo } from "react";

import ThemeSwitch from "@/components/ThemeSwitch";
import OtpInput from "@/components/OtpInput";

export default function Otp() {
  const [otp, setOtp] = useState("");
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
              <span>Eight digits code has been sent to your email.</span>
              <span>
                Enter / Copy & paste the code into the inputs below to verify
                your account.
              </span>
            </p>
          </header>

          <OtpInput {...{ value: otp, valueLength: 8, onChange }} />

          <div className="mt-8 h-14 w-full">
            <button
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
    </section>
  );
}
