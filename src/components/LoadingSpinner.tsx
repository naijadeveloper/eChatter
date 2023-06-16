import { CgSpinnerTwo } from "react-icons/cg";

type spinProps = {
  position: string;
  size: string;
};
export default function LoadingSpinner({ position, size }: spinProps) {
  return (
    <div
      className={`${position} left-0 top-0 z-20 flex h-full w-full items-center justify-center bg-gray-100/70 dark:bg-gray-900/70`}
    >
      <div
        className={`relative rounded p-2 ${size} text-maingreen-400 dark:text-maingreen-100`}
      >
        <CgSpinnerTwo className="animate-spin" />
      </div>
    </div>
  );
}

LoadingSpinner.defaultProps = {
  position: "fixed",
  size: "text-9xl",
};
