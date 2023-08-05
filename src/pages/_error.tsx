import { NextPageContext } from "next";
import { useState, useEffect } from "react";

import dynamic from "next/dynamic";

const ThemeSwitch = dynamic(() => import("@/components/ThemeSwitch"), {
  ssr: false,
});

interface statusCodeType {
  statusCode?: number;
}

function ErrorPage({ statusCode }: statusCodeType) {
  const [online, setOnline] = useState(false);

  useEffect(() => {
    if (window.navigator && window.navigator.onLine) {
      setOnline(true);
    } else {
      setOnline(false);
    }
  }, []);

  return (
    <>
      <div className="absolute right-3 top-3">
        <ThemeSwitch />
      </div>

      <div className="flex h-screen flex-col items-center justify-center gap-y-3">
        <a href="#" title="https://www.flaticon.com/free-icons/error">
          <img
            src="/pngs/warning.png"
            alt="error icons"
            className="w-[300px]"
          />
        </a>
        <p className="mx-auto text-center text-4xl sm:w-[85%] md:w-[70%]">
          {statusCode
            ? `THE ERROR ${statusCode} OCCURRED ON THE SERVER`
            : `AN ERROR OCCURRED ON THE CLIENT/BROWSER`}
        </p>
        {!statusCode && (
          <code className="text-sm font-semibold italic">
            {!online ? "You are not connected to the internet" : ""}
          </code>
        )}
      </div>
    </>
  );
}

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;
