import '../styles/globals.css'
import '../styles/NavBar.css'
import '../styles/Dropdown.css'
import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import MobileConnexionLayout from '../components/layout/MobileConnexionLayout'
import Head from 'next/head'
import { SecuboxProvider } from '../components/SecuboxContext'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <Head>
        <title>Secubox</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/sx.png" />
      </Head>
      <SecuboxProvider>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </SecuboxProvider>
    </>
  )
}

export default MyApp
