import { useState} from 'react';;
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Select from "react-select";
import { HeadData} from '../components';
import { UsersForm, Timezones} from '../screens';
export default function Home() {
  
  const [screen, setScreen] = useState(0);

  return (
    <div className={styles.container}>
      <HeadData />

      <main className={styles.main}>
        {screen === 0 ? (<UsersForm />) : screen === 1 ? (<Timezones />) : ""}
      </main> 

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
