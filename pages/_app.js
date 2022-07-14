import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '../utils/createEmotionCache';
import { StateContext } from '../utils/context/StateContext';
import { Toaster } from 'react-hot-toast';
import { CurrencyContext } from '../utils/context/CurrencyContext';
import { client } from '../lib/client';
import ColorContext from '../utils/context/colorContext';
import TitleContext from '../utils/context/TitleContext';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();


export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps, settings } = props;

  const sanityColors = settings[0].colorThemes;
  const companyName = settings[0].title;
  console.log(settings)
 
  return (
    <ColorContext.Provider value={{ sanityColors }} >
      <TitleContext.Provider value={{ companyName }} >
        <CacheProvider value={emotionCache}>
          <Head>
            <meta name="viewport" content="initial-scale=1, width=device-width" />
          </Head>
          <StateContext>
            <CurrencyContext>
                <Toaster />
                <Component {...pageProps} />
            </CurrencyContext>
          </StateContext>
          
        </CacheProvider>
      </TitleContext.Provider>
    </ColorContext.Provider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};

MyApp.getInitialProps = async () => {
  const query = '*[_type == "siteSettings"]';
  const settings = await client.fetch(query);

  return {
       settings 
  }
  
};