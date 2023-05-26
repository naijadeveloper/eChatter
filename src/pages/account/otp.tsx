import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";

import ThemeSwitch from "@/components/ThemeSwitch";

let currentOtpIndex: number = 0;

export default function Otp() {
  const [otp, setOtp] = useState<string[]>(new Array(8).fill(""));
  const [activeOtpIndex, setActiveOtpIndex] = useState<number>(0);

  const indexRef = useRef<HTMLInputElement>(null);

  function handleChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    const { value } = target;
    const newOtp: string[] = [...otp];
    newOtp[currentOtpIndex] = value.substring(value.length - 1);

    if (!value) {
      setActiveOtpIndex(currentOtpIndex - 1);
    } else setActiveOtpIndex(currentOtpIndex + 1);
    setOtp(newOtp);
  }

  function handlekeyDown(
    { key }: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) {
    currentOtpIndex = index;
    if (key == "Backspace") setActiveOtpIndex(currentOtpIndex - 1);
  }

  useEffect(() => {
    indexRef.current?.focus();
  }, [activeOtpIndex]);

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

          <div className="mt-8 flex w-full flex-wrap items-center justify-center gap-3">
            {otp.map((_, index) => (
              <input
                ref={index === activeOtpIndex ? indexRef : null}
                key={index}
                type="number"
                className="remove-default h-[60px] w-[60px] rounded-md bg-gray-100 text-center text-4xl font-semibold text-gray-800 outline-none dark:bg-gray-800 dark:text-gray-100"
                onChange={handleChange}
                onKeyDown={(e) => handlekeyDown(e, index)}
                value={otp[index]}
              />
            ))}
          </div>

          <div className="mt-8 h-14 w-full">
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
