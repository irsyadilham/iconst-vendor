import { useReducer } from 'react';
import '../styles/globals.css';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import type { App } from '../types/app';

import AppContext from '../context/app';
import loadingReducer from '../reducers/loading';

import Loading from '../components/loading';

import ValueMapper from '../functions/context-value-mapper';

function MyApp({ Component, pageProps }: AppProps) {
  const [loadingState, loadingDispatch] = useReducer(loadingReducer, false);

  const value: App = {
    loading: ValueMapper(loadingState, loadingDispatch)
  }
  return (
    <AppContext.Provider value={value}>
      <main className="container">
        <Head>
          <title>iconst: vendor</title>
        </Head>
        <Component {...pageProps} />
        <Loading/>
      </main>
    </AppContext.Provider>
  )
}

export default MyApp;
