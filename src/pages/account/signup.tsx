import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useMemo } from "react";

import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import ThemeSwitch from "@/components/ThemeSwitch";

//////////////////////////////////////////////////////////////
export default function Signup() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [text, setText] = useState<string>("");

  type formData = {
    email: string;
    password: string;
    confirmPassword: string;
  };

  const schema: ZodType<formData> = z
    .object({
      email: z.string().email("Email is not valid"),
      password: z
        .string()
        .min(8, { message: "Password should be at least 8 characters long" })
        .max(20, {
          message: "Password cannot be more than 20 characters long",
        }),
      confirmPassword: z.string().min(8).max(20),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["password", "confirmPassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({
    resolver: zodResolver(schema),
  });

  const allerrors = useMemo(() => {
    if (errors.email || errors.password || errors.confirmPassword) {
      return true;
    }
    return false;
  }, [text]);

  function submitForm(data: formData) {
    // check database if email already exist
    console.table(data);

    // Generate `otp` send `otp` to email and push to the otp route
    // router.push("/account/otp");
  }

  return (
    <section className="relative flex min-h-[500px] w-full items-center justify-center pt-16">
      <div className="absolute right-3 top-3">
        <ThemeSwitch />
      </div>

      <div className="mt-8 w-[98%] max-w-[430px] rounded-md bg-gray-900 p-7 text-gray-100 dark:bg-gray-100 dark:text-gray-800">
        <div>
          <header className="text-center text-3xl font-semibold">
            Sign Up
          </header>

          <form className="mt-7" onSubmit={handleSubmit(submitForm)}>
            <div className="min-h-14 mt-5 w-full">
              <input
                type="email"
                placeholder="Email"
                {...register("email")}
                onChange={() => setText(" ")}
                className="h-14 w-full rounded-md bg-gray-100 px-3 text-gray-800 outline-none focus:border-b-4 focus:border-b-gray-500 dark:bg-gray-800 dark:text-gray-100"
              />

              {errors.email && (
                <span className="mt-1 flex w-full items-center text-sm text-red-700">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="min-h-14 relative mt-5 w-full">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create password"
                {...register("password")}
                onChange={() => setText(" ")}
                className="h-14 w-full rounded-md bg-gray-100 px-3 text-gray-800 outline-none focus:border-b-4 focus:border-b-gray-500 dark:bg-gray-800 dark:text-gray-100"
              />
              <button
                className="absolute right-0 top-1 h-12 w-[35px] cursor-pointer rounded-br-md rounded-tr-md bg-gray-100 text-lg text-gray-500 dark:bg-gray-800"
                onClick={(e) => {
                  e.preventDefault();
                  setShowPassword((prev) => !prev);
                }}
              >
                {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </button>

              {errors.password && (
                <span className="mt-1 flex w-full items-center text-sm text-red-700">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div className="min-h-14 relative mt-5 w-full">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Confirm password"
                {...register("confirmPassword")}
                onChange={() => setText(" ")}
                className="h-14 w-full rounded-md bg-gray-100 px-3 text-gray-800 outline-none focus:border-b-4 focus:border-b-gray-500 dark:bg-gray-800 dark:text-gray-100"
              />
              <button
                className="absolute right-0 top-1 h-12 w-[35px] cursor-pointer rounded-br-md rounded-tr-md bg-gray-100 text-lg text-gray-500 dark:bg-gray-800"
                onClick={(e) => {
                  e.preventDefault();
                  setShowPass((prev) => !prev);
                }}
              >
                {showPass ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </button>

              {errors.confirmPassword && (
                <span className="mt-1 flex w-full items-center text-sm text-red-700">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>

            {allerrors ? (
              <span>Error about</span>
            ) : (
              <span>NO worries, you safe</span>
            )}

            <div className="mt-5 h-14 w-full">
              <button
                className={`h-full w-full rounded-md bg-maingreen-200 text-gray-800 hover:opacity-95 dark:border dark:border-gray-800`}
              >
                Sign Up
              </button>
            </div>
          </form>

          <div className="mt-2 text-center">
            <span>
              Already have an account?{" "}
              <Link
                href="/account/login"
                className="text-gray-500 underline decoration-2 underline-offset-2 hover:text-maingreen-100 dark:hover:text-maingreen-400"
              >
                Log in
              </Link>
            </span>
          </div>

          <div className="relative mt-9 h-[1px] w-full bg-gray-500 before:absolute before:left-2/4 before:top-2/4 before:-translate-x-2/4 before:-translate-y-2/4 before:bg-gray-900 before:px-2 before:text-gray-500 before:content-['OR'] dark:before:bg-gray-100"></div>

          <div className="mt-5 h-14 w-full">
            <a
              href="#"
              className="flex h-full w-full items-center rounded-md bg-blue-700 px-2 text-gray-100 hover:opacity-95 dark:border dark:border-gray-800"
            >
              <span className="flex h-[28px] w-[28px] items-center justify-center rounded-[100%] bg-gray-100 text-blue-700">
                <FaFacebookF />
              </span>
              <span className="flex grow items-center justify-center">
                Sign up with Facebook
              </span>
            </a>
          </div>

          <div className="mt-5 h-14 w-full">
            <a
              href="#"
              className="flex h-full w-full items-center rounded-md bg-gray-100 px-2 text-gray-800 hover:opacity-95 dark:border dark:border-gray-800"
            >
              <span className="flex h-[28px] w-[28px] items-center justify-center text-2xl">
                <FcGoogle />
              </span>
              <span className="flex grow items-center justify-center">
                Sign up with Google
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
