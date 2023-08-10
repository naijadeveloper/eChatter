import dynamic from "next/dynamic";

const ThemeSwitch = dynamic(() => import("@/components/ThemeSwitch"), {
  ssr: false,
});

export default function custom404Page() {
  return (
    <>
      <div className="absolute right-3 top-3">
        <ThemeSwitch />
      </div>

      <div className="flex h-screen flex-col items-center justify-center gap-y-3">
        <div title="https://www.flaticon.com/free-icons/error">
          <img
            src="/pngs/warning.png"
            alt="error icons"
            className="w-[300px]"
          />
        </div>
        <h1 className="flex items-center justify-center text-8xl">404</h1>
        <p className="mx-auto text-center text-4xl sm:w-[85%] md:w-[70%]">
          THE PAGE YOU ARE LOOKING FOR DOES NOT EXIST!!
        </p>
      </div>
    </>
  );
}
