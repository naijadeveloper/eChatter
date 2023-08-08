import toast from "react-hot-toast";

import { MdClose } from "react-icons/md";
import { BsFillCheckCircleFill } from "react-icons/bs";

interface notifyProps {
  name:
    | "notify-success"
    | "notify-warning"
    | "notify-danger"
    | "notify-info"
    | "notify-interact"
    | "notify-no-icon";
  message: string;
  mssgName?: string;
  title?: string;
  placement?: string;
  closeBtn?: boolean;
  timer?: number;
  image?: string;
  btns?: number;
  btnsFunctions?: Function[];
}

export default function Notifications(notif: notifyProps) {
  return (
    <>
      {toast.custom(
        (t) => (
          <div className="flex !min-w-[300px] !max-w-[80%] items-center justify-between rounded bg-gray-300 p-2 drop-shadow-[0px_1px_2px_rgb(54,_54,_54)] dark:bg-gray-800 dark:drop-shadow-[0px_1px_2px_#030712] sm:!max-w-[70%] md:!max-w-[50%]">
            {/* for the icon if image isn't present */}
            {!notif?.image && notif.name !== "notify-no-icon" && (
              <div className="flex h-full items-start justify-center">
                <div className="flex h-[35px] w-[35px] shrink-0 items-center justify-center rounded-md border border-gray-800 bg-green-500 text-lg text-green-700 dark:bg-green-800 dark:text-green-300/60">
                  {notif.name == "notify-success" && <BsFillCheckCircleFill />}
                </div>
              </div>
            )}

            {/* for the title, message, message header, image and buttons if more than one */}
            <div className="mx-2 grow-[2] pl-1">{notif.message}</div>

            {/* if btns is just one */}
            <button></button>

            {/* close button */}
            {notif?.closeBtn && (
              <div className="flex h-full items-start justify-center">
                <button
                  className="rounded-md p-1 hover:bg-gray-500/30"
                  onClick={() => toast.remove(t.id)}
                >
                  <MdClose size={24} />
                </button>
              </div>
            )}
          </div>
        ),
        {
          // options for toast
          duration: notif?.timer || Infinity,
        }
      )}
    </>
  );
}
