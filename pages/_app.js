import '../styles/globals.css';
import NProgress from 'nprogress';
import Router from 'next/router';

import 'nprogress/nprogress.css';
import { useEffect } from 'react';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    //remove default server side injected css to allow MUI SSR CSS
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
      <Component {...pageProps} />
  );
}

export default MyApp

