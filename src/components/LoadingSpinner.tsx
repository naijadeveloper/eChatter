import { CgSpinnerTwo } from "react-icons/cg";

export default function LoadingSpinner() {
  return (
    <div className="fixed left-0 top-0 z-20 flex h-full w-full items-center justify-center bg-gray-100/70 dark:bg-gray-900/70">
      <div className="relative rounded p-2 text-9xl text-maingreen-400 dark:text-maingreen-100">
        <CgSpinnerTwo className="animate-spin" />
      </div>
    </div>
  );
}
