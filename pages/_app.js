import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '../utils/createEmotionCache';
import { StateContext } from '../utils/context/StateContext';
import { Toaster } from 'react-hot-toast';
import { CurrencyContext } from '../utils/context/CurrencyContext';
import SettingsContext from '../utils/context/SettingsContext';
import { getClient } from '../lib/sanity.server';
import { groq } from 'next-sanity';


// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();


export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps, settings } = props;
  
 
  return (
    <CacheProvider value={emotionCache}>
          <SettingsContext.Provider value={{ settings }} >
          <Head>
            <meta name="viewport" content="initial-scale=1, width=device-width" />
          </Head>
          <StateContext>
            <CurrencyContext>
                <Toaster />
                <Component {...pageProps} />
            </CurrencyContext>
          </StateContext>
          
    </SettingsContext.Provider>
        </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};

MyApp.getInitialProps = async ({ preview = false }) => {
  const query = groq`*[_type == "siteSettings"]`
  const settings = await getClient(preview).fetch(query)

  if (!settings) return {notFound: true}

  return {
       settings 
  }
  
};