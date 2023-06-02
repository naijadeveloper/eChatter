import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mx-auto mt-5 flex min-h-[100px] w-[80%] items-center max-lg:flex-col-reverse max-md:w-full">
      <div className="flex h-[200px] w-[200px] shrink-0 flex-col items-center justify-center">
        <Image
          priority
          src="/logo/echatter_logo.svg"
          width={800}
          height={600}
          alt="echatter logo"
        />
        <span className="-mt-5 block text-sm font-semibold text-gray-500">
          copyright &copy; 2023, eChatter
        </span>
        <span className="mt-1 text-sm font-bold text-gray-500">
          ❤️ from Nigeria
        </span>
      </div>

      <div className="relative flex w-full grow items-center max-lg:top-8">
        <ul className="flex w-full flex-wrap justify-evenly gap-4 px-1 text-gray-500">
          <li className="wel-footer-links">What is eChatter?</li>
          <li className="wel-footer-links">Worktabs</li>
          <li className="wel-footer-links">Tools</li>
          <li className="wel-footer-links">Issues</li>
          <li className="wel-footer-links">Terms</li>
          <li className="wel-footer-links">Privacy Policy</li>
          <li className="wel-footer-links">Cookie Policy</li>
        </ul>
      </div>
    </footer>
  );
}
