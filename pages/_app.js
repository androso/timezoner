// import '../app/styles/globals.css'
import 'react-datepicker/dist/react-datepicker.css';
import { GlobalStyle } from "../app/styles";
import '@fortawesome/fontawesome-svg-core/styles.css';
function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
