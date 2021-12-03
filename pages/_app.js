import { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import '../styles/globals.css'
import Layout from '../components/Layout'
import 'animate.css'

import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import { UserProvider } from '@auth0/nextjs-auth0'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    typeof document !== undefined
      ? require('bootstrap/dist/js/bootstrap')
      : null
  }, [])
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserProvider>
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
    </QueryClientProvider>
  )
}

export default MyApp
