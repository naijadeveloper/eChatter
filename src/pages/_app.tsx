import type { AppProps } from "next/app";
import { Provider } from "react-redux";

import GlobalLayout from "@/components/global_layout";
import store from "@/store";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <GlobalLayout>
        <Component {...pageProps} />
      </GlobalLayout>
    </Provider>
  );
}
