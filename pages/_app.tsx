import { useReducer } from 'react';
import '../styles/globals.css';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import AppInterface from '../interfaces/app-interface';

import AppContext from '../context/app';
import loadingReducer from '../reducers/loading-reducer';

import Loading from '../components/loading';

import ValueMapper from '../functions/context-value-mapper';

function MyApp({ Component, pageProps }: AppProps) {
  const [loadingState, loadingDispatch] = useReducer(loadingReducer, false);

  const value: AppInterface = {
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
