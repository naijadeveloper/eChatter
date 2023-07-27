import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

import { signIn, useSession } from "next-auth/react";

import { useForm } from "react-hook-form";

import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import toast from "react-hot-toast";

const ThemeSwitch = dynamic(() => import("@/components/ThemeSwitch"), {
  ssr: false,
});
import LoadingSpinner from "@/components/LoadingSpinner";
import Footer from "@/components/Footer";

type formData = {
  email: string;
  password: string;
};

const schema: ZodType<formData> = z.object({
  email: z.string().email("Email is not valid"),
  password: z
    .string()
    .min(8, { message: "Password should be at least 8 characters long" })
    .max(20, {
      message: "Password cannot be more than 20 characters long",
    }),
});

/////////////////////////////////////////////////////////////////////////////////////////
export default function Login() {
  const router = useRouter();
  const { status } = useSession();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<formData>({
    resolver: zodResolver(schema),
  });

  // `watch` is called on every input's onChange trigger
  let data = watch();
  const signupValues = useMemo(() => {
    // `safeParse` would determine if the inputs values are correct according to the validation rules
    return schema.safeParse(data);
  }, [data]);

  ///////////////////////////////////////////////////
  async function submitForm(data: formData) {
    if (signupValues.success == false) return;

    // loading
    setLoading(true);

    // email and password needed
    const email = data.email;
    const password = data.password;

    // login with next auth
    const info = await signIn("credentials", {
      email,
      password,
      type: "login",
      redirect: false,
    });

    // loading done.
    setLoading(false);

    if (!info?.ok) return toast.error(info?.error!);

    // if ok is true then push to feed for user
    router.push("/feed");
  }

  async function handleGoogleLogin() {}

  async function handleFacebookLogin() {}

  return (
    <>
      <section className="relative flex min-h-[500px] w-full items-center justify-center pt-16">
        <div className="absolute right-3 top-3">
          <ThemeSwitch />
        </div>

        <div className="mt-8 w-[98%] max-w-[430px] rounded-md">
          <div className="rounded-md bg-gray-900 p-7 text-gray-100 dark:bg-gray-100 dark:text-gray-800">
            <header className="text-center text-3xl font-semibold">
              Log In
            </header>

            <form className="mt-7" onSubmit={handleSubmit(submitForm)}>
              <div className="min-h-14 mt-5 w-full">
                <input
                  type="email"
                  placeholder="Email"
                  {...register("email")}
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
                  placeholder="Password"
                  {...register("password")}
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

              <div className="mt-2 text-center">
                <Link
                  href="#"
                  className="text-gray-500 underline decoration-2 underline-offset-2 hover:text-maingreen-100 dark:hover:text-maingreen-400"
                >
                  Forgot password
                </Link>
              </div>

              <div className="mt-5 h-14 w-full">
                <button
                  className={`h-full w-full rounded-md ${
                    signupValues.success
                      ? "bg-maingreen-300 text-gray-100 dark:bg-maingreen-200"
                      : "cursor-not-allowed bg-gray-500"
                  } hover:opacity-95 dark:border dark:border-gray-800 dark:text-gray-800`}
                >
                  Log In
                </button>
              </div>
            </form>

            <div className="mt-2 text-center">
              <span>
                Don't have an account?{" "}
                <Link
                  href="/account/signup"
                  className="text-gray-500 underline decoration-2 underline-offset-2 hover:text-maingreen-100 dark:hover:text-maingreen-400"
                >
                  Sign up
                </Link>
              </span>
            </div>

            <div className="relative mt-9 h-[1px] w-full bg-gray-500 before:absolute before:left-2/4 before:top-2/4 before:-translate-x-2/4 before:-translate-y-2/4 before:bg-gray-900 before:px-2 before:text-gray-500 before:content-['OR'] dark:before:bg-gray-100"></div>

            <div className="mt-5 h-14 w-full">
              <button
                onClick={handleFacebookLogin}
                className="flex h-full w-full items-center rounded-md bg-blue-700 px-2 text-gray-100 hover:opacity-95 dark:border dark:border-gray-800"
              >
                <span className="flex h-[28px] w-[28px] items-center justify-center rounded-[100%] bg-gray-100 text-blue-700">
                  <FaFacebookF />
                </span>
                <span className="flex grow items-center justify-center">
                  Authorize with Facebook
                </span>
              </button>
            </div>

            <div className="mt-5 h-14 w-full">
              <button
                onClick={handleGoogleLogin}
                className="flex h-full w-full items-center rounded-md bg-gray-100 px-2 text-gray-800 hover:opacity-95 dark:border dark:border-gray-800"
              >
                <span className="flex h-[28px] w-[28px] items-center justify-center text-2xl">
                  <FcGoogle />
                </span>
                <span className="flex grow items-center justify-center">
                  Authorize with Google
                </span>
              </button>
            </div>
          </div>
        </div>

        {loading && <LoadingSpinner />}
      </section>

      <Footer />
    </>
  );
}
