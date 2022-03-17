// import '../app/styles/globals.css'
import 'react-datepicker/dist/react-datepicker.css';
import { GlobalStyle } from "../app/styles";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
