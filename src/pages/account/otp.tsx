import Link from "next/link";
import { useState } from "react";

import ThemeSwitch from "@/components/ThemeSwitch";

export default function Otp() {
  const [otp1, setOtp1] = useState<number>(0);

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    let value = Number(event.target.value);

    setOtp1((prev) => {
      prev = value;
      return prev;
    });
  }

  return (
    <section className="relative flex min-h-[500px] w-full items-center justify-center pt-16">
      <div className="absolute right-3 top-3">
        <ThemeSwitch />
      </div>

      <div className="mt-8 w-[98%] max-w-[450px] rounded-md bg-gray-900 p-7 text-gray-100 dark:bg-gray-100 dark:text-gray-800">
        <div>
          <header className="flex flex-col gap-3 text-center font-semibold">
            <h2 className="text-3xl">Verify Your Account</h2>
            <p className="flex flex-col gap-1 text-sm text-gray-300 dark:text-gray-700">
              <span>
                We emailed{" "}
                <span className="text-gray-500">mmejuenoch@gmail.com</span> a
                six digit code
              </span>
              <span>Enter the code below to confirm your email address</span>
            </p>
          </header>

          <div className="mt-8 flex w-full flex-wrap gap-3">
            <input
              type="number"
              placeholder="0"
              value={otp1}
              min={0}
              max={9}
              maxLength={1}
              required
              onChange={(e) => handleInput(e)}
              className="remove-default h-[70px] w-[70px] rounded-md border-2 border-gray-500 bg-gray-100 text-center text-4xl font-normal text-gray-800 outline-none dark:bg-gray-800 dark:text-gray-100"
            />
          </div>

          <div className="mt-8 h-12 w-full">
            <button className="h-full w-full rounded-md bg-maingreen-200 text-gray-800 hover:opacity-95 dark:border dark:border-gray-800">
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
