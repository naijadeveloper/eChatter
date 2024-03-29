import toast from "react-hot-toast";
import type { ToastPosition } from "react-hot-toast";

import { MdClose, MdError, MdNotificationAdd } from "react-icons/md";
import { BsFillCheckCircleFill, BsQuestionCircleFill } from "react-icons/bs";
import { RiInformationFill } from "react-icons/ri";

// the `name` determines the icon to be used or if no icon is preferred
// the `message`, self explanatory and `mssgName` for times when
// -- you want to show one notification of one user out of many
// `placement` for where to place the toast `top-left`, `top-center`, `top-right`
// -- `bottom-left`, `bottom-center`, `bottom-right`
// the `title` above describe what part of the app the notification belongs to
// -- e.g if its eConvo notification or eChat notification or notification
// -- about some user wanting to follow you.
// if you want the presence of a `closeBtn` to exit the toast
// `timer` for the toast, if `timer` is undefined toast will be Infinity
// if `image` is present, icon won't be
// `btns` array of buttons for the toast. Each item is `{ btnName:string, active:boolean }`
// btnsFunctions array of functions for each of the btns

interface btn {
  btnName: string;
  active?: boolean;
}

interface notifyProps {
  name:
    | "notify-success"
    | "notify-warning"
    | "notify-error"
    | "notify-info"
    | "notify-interact"
    | "notify-no-icon";
  message: string;
  mssgName?: string;
  placement?: ToastPosition;
  title?: string;
  closeBtn?: boolean | (() => void);
  timer?: 3000 | 5000;
  image?: [string] | [string, "multiple"];
  btns?: btn[];
  btnsFunctions?: Function[];
}

// call this component like a function when using e.g Notification({name:"" ... e.tc});
// I don't know if this is proper but, it works, sooooo, yeah
export default function Notifications(notif: notifyProps) {
  function handleExit(id: string) {
    toast.remove(id);
    if (typeof notif?.closeBtn == "function") {
      (notif?.closeBtn as () => void)();
    }
  }

  function handleBtnClick(index: number, id: string) {
    (notif?.btnsFunctions as Function[])[index]();
    toast.remove(id);
  }
  return (
    <>
      {toast.custom(
        (t) => {
          if (notif?.timer) {
            setTimeout(() => {
              toast.dismiss(t.id);
              // call the function of the close btn if present
              if (typeof notif?.closeBtn == "function") {
                (notif?.closeBtn as () => void)();
              }
            }, notif?.timer);
          }
          return (
            <div
              className={`!min-w-[360px] !max-w-[90%] rounded-md bg-gray-300 drop-shadow-[0px_1px_2px_rgb(54,_54,_54)] dark:bg-gray-800 dark:drop-shadow-[0px_1px_2px_#030712] sm:!max-w-[80%] md:!max-w-[65%] lg:!max-w-[45%]`}
            >
              {notif?.title && (
                <div className="flex items-center justify-between p-1">
                  <p className="flex w-full items-center justify-start p-1 font-bold text-gray-700 dark:text-gray-200">
                    {notif?.title}
                  </p>
                  {notif?.closeBtn && (
                    <button
                      className="flex items-center justify-center rounded-md p-1 hover:bg-gray-500/30"
                      onClick={() => handleExit(t.id)}
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
                    notif?.timer === 3000
                      ? `before:animate-[decrease_3s_linear_both]`
                      : `before:animate-[decrease_5s_linear_both]`
                  }`
                }`}
              >
                {/* for the icon if image isn't present */}
                {!notif?.image && notif.name !== "notify-no-icon" && (
                  <div className="flex shrink-0 items-start justify-center">
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

                {/* for the image if image is present */}
                {notif?.image && (
                  <div className="relative">
                    <div className="flex h-[48px] w-[48px] shrink-0 overflow-hidden rounded-[100%]">
                      <img
                        src={notif?.image[0]}
                        alt={notif?.mssgName ?? "image"}
                        className="object-cover"
                      />
                    </div>

                    {notif?.image[1] === "multiple" && (
                      <span className="absolute -bottom-2 right-1 h-[20px] w-[20px] rounded-[100%] bg-gray-300 text-red-500 dark:bg-gray-800">
                        <MdNotificationAdd />
                      </span>
                    )}
                  </div>
                )}

                {/* for the message, message header, image and buttons if more than one */}
                <div
                  className={`mx-2 flex grow-[2] flex-col justify-center ${
                    notif?.image && "min-h-[48px]"
                  } ${
                    !notif?.image &&
                    notif.name !== "notify-no-icon" &&
                    "min-h-[35px]"
                  }`}
                >
                  {notif?.mssgName && (
                    <p className="flex w-full items-center justify-start text-ellipsis font-bold text-gray-700 dark:text-gray-200">
                      {notif?.mssgName}
                    </p>
                  )}

                  <p className="flex h-full w-full items-center justify-start">
                    {notif.message}
                  </p>

                  {notif?.btns &&
                    notif?.btnsFunctions &&
                    notif?.btns.length == notif?.btnsFunctions.length && (
                      <div className="my-2 flex items-center justify-start gap-x-2">
                        {notif?.btns.map((btn, index) => (
                          <button
                            key={index}
                            onClick={() => handleBtnClick(index, t.id)}
                            className={`rounded  p-1 px-2 text-gray-100 ${
                              btn?.active
                                ? "bg-maingreen-300 hover:bg-maingreen-300/90"
                                : "bg-gray-500 hover:bg-gray-500/90"
                            }`}
                          >
                            {btn.btnName}
                          </button>
                        ))}
                      </div>
                    )}
                </div>

                {/* close button */}
                {notif?.closeBtn && !notif?.title && (
                  <div className="flex h-full items-start justify-center">
                    <button
                      className="rounded-md p-1 hover:bg-gray-500/30"
                      onClick={() => handleExit(t.id)}
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
          position: notif?.placement ?? "top-center",
        }
      )}
    </>
  );
}
