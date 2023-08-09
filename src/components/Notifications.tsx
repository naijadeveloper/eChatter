import toast from "react-hot-toast";
import type { ToastPosition } from "react-hot-toast";

import { MdClose, MdError } from "react-icons/md";
import { BsFillCheckCircleFill, BsQuestionCircleFill } from "react-icons/bs";
import { RiInformationFill } from "react-icons/ri";

// the `name` determines the icon to be used or if no icon is preferred
// the `message`, self explanatory and `mssgName` for times when
// -- you want to show one notification of one user out of many
// the `title` above describe what part of the app the notification belongs to
// -- e.g if its eConvo notification or eChat notification or notification
// -- about some user wanting to follow you.
// `placement` for where to place the toast `top-left`, `top-center`, `top-right`
// -- `bottom-left`, `bottom-center`, `bottom-right`
// if you want the presence of a `closeBtn` to exit the toast
// `timer` for the toast, if `timer` is undefined toast will be Infinity
// if `image` is present, icon won't be
// `btns` array of buttons for the toast. Each item is `{ btnName:string, active:boolean }`
// btnsFunctions array of functions for each of the btns

interface btn {
  btnName: string;
  active: boolean;
}

interface notifyProps {
  placement: ToastPosition;
  name:
    | "notify-success"
    | "notify-warning"
    | "notify-error"
    | "notify-info"
    | "notify-interact"
    | "notify-no-icon";
  message: string;
  mssgName?: string;
  title?: string;
  closeBtn?: boolean;
  timer?: 2000 | 4000;
  image?: string;
  btns?: btn[];
  btnsFunctions?: Function[];
}

export default function Notifications(notif: notifyProps) {
  return (
    <>
      {toast.custom(
        (t) => {
          if (notif?.timer) {
            setTimeout(() => {
              toast.remove(t.id);
            }, notif?.timer);
          }
          return (
            <div
              className={`!min-w-[300px] !max-w-[80%] rounded-md bg-gray-300 drop-shadow-[0px_1px_2px_rgb(54,_54,_54)] dark:bg-gray-800 dark:drop-shadow-[0px_1px_2px_#030712] sm:!max-w-[70%] md:!max-w-[50%]`}
            >
              {notif?.title && (
                <div className="flex items-center justify-between p-1">
                  <p className="flex w-full items-center justify-start p-1 font-bold">
                    {notif?.title}
                  </p>
                  {notif?.closeBtn && (
                    <button
                      className="flex items-center justify-center rounded-md p-1 hover:bg-gray-500/30"
                      onClick={() => toast.remove(t.id)}
                    >
                      <MdClose size={24} />
                    </button>
                  )}
                </div>
              )}

              <div
                className={`relative flex w-full items-start justify-between rounded-bl-md rounded-br-md bg-gray-300 p-2 dark:bg-gray-800 ${
                  !notif?.title && "rounded-md"
                } ${
                  notif?.timer &&
                  `before:absolute before:bottom-0 before:left-[1px] before:h-[3.5px] before:w-[100%] before:rounded before:bg-maingreen-300 before:content-['_'] dark:before:bg-maingreen-100 ${
                    notif?.timer === 2000
                      ? `before:animate-[decrease_2s_linear_both]`
                      : `before:animate-[decrease_4s_linear_both]`
                  }`
                }`}
              >
                {/* for the icon if image isn't present */}
                {!notif?.image && notif.name !== "notify-no-icon" && (
                  <div className="flex h-full shrink-0 items-start justify-center">
                    <div
                      className={`flex h-[35px] w-[35px] items-center justify-center rounded-md border border-gray-800 text-2xl ${
                        notif.name == "notify-success" &&
                        "bg-green-500 text-green-700 dark:bg-green-700 dark:text-green-500"
                      } ${
                        notif.name == "notify-error" &&
                        "bg-red-500 text-red-700 dark:bg-red-700 dark:text-red-500"
                      } ${
                        notif.name == "notify-warning" &&
                        "bg-yellow-500 text-yellow-700 dark:bg-yellow-700 dark:text-yellow-500"
                      } ${
                        notif.name == "notify-info" &&
                        "bg-blue-500 text-blue-700 dark:bg-blue-700 dark:text-blue-500"
                      } ${
                        notif.name == "notify-interact" &&
                        "bg-gray-500 text-gray-700 dark:bg-gray-700 dark:text-gray-500"
                      }`}
                    >
                      {notif.name == "notify-success" && (
                        <BsFillCheckCircleFill />
                      )}

                      {(notif.name == "notify-error" ||
                        notif.name == "notify-warning") && <MdError />}

                      {notif.name == "notify-info" && <RiInformationFill />}

                      {notif.name == "notify-interact" && (
                        <BsQuestionCircleFill />
                      )}
                    </div>
                  </div>
                )}

                {/* for the message, message header, image and buttons if more than one */}
                <div
                  className={`mx-2 grow-[2] ${
                    !notif?.image && notif.name !== "notify-no-icon" && "pl-1"
                  }`}
                >
                  {notif.message}
                </div>

                {/* close button */}
                {notif?.closeBtn && !notif?.title && (
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
            </div>
          );
        },
        {
          // options for toast
          duration: Infinity,
          position: notif.placement,
        }
      )}
    </>
  );
}
