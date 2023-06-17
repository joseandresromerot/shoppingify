import '@/styles/globals.css';
import { SessionProvider } from "next-auth/react";
import BaseApp from '@/components/layout/base-app';
import { wrapper, store } from "../store/store";
import { Provider } from "react-redux";
import Modal from 'react-modal';
import Head from 'next/head';

Modal.setAppElement('body');

function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <Provider store={store}>
        <BaseApp>
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          </Head>
          <Component {...pageProps} />
        </BaseApp>
      </Provider>
    </SessionProvider>
  );
} 

export default wrapper.withRedux(App);