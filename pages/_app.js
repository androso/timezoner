// import '../app/styles/globals.css'
import 'react-datepicker/dist/react-datepicker.css';
import { GlobalStyle } from "../app/styles";
import '@fortawesome/fontawesome-svg-core/styles.css';
import Script from "next/script";
import Head from "next/head";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Timezoner</title>
        
      </Head>
      <Script
          strategy="lazyOnload"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        />

        <Script strategy="lazyOnload">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
