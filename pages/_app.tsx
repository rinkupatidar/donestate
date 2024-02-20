import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import NextNProgress from 'nextjs-progressbar'
import { useEffect } from 'react'
import DashboardFooter from '../components/Footer/Footer'
import NavbarWrapper from '../components/Navbar/NavbarWrapper'
import { AuthProvider } from '../context/authContext'
import '../styles/globals.scss'

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, retry: 0 } },
})

function MyApp({ Component, pageProps }: AppProps) {
  const page = useRouter().pathname

  useEffect(() => {
    if (page.includes('dashboard')) {
      const style = document.createElement('style')
      style.id = 'dashboard-font'
      style.innerHTML = `
				body,button,input,optgroup,select,textarea {
					font-family: Roboto Mono,monospace,BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,Helvetica,Arial,sans-serif !important;
				}
				`
      document.getElementsByTagName('head')[0].appendChild(style)

      return () => {
        const style = document.getElementById('dashboard-font')
        style?.remove()
      }
    }
  }, [page])

  return (
    <>
      <NextNProgress
        color="hsla(141, 99%, 17%, 1)"
        options={{ showSpinner: false }}
      />
      <Head>
        <link rel="shortcut icon" href="/favicon.svg" />
        <title>
          DoneStat | Data Intelligence Platform providing, financial and
          alternative data around the world | Predictive Analysis and AI
          incorporation
        </title>
      </Head>

      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          {page != '/' ? (
            <NavbarWrapper>
              <Component {...pageProps} />
              {/* <DashboardFooter /> */}
            </NavbarWrapper>
          ) : (
            <Component {...pageProps} />
          )}
        </AuthProvider>
      </QueryClientProvider>
    </>
  )
}

export default MyApp
