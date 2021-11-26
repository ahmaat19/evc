import Navigation from './Navigation'
import Head from 'next/head'

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Storybooks</title>
        <meta property='og:title' content='Storybooks' key='title' />
        <link rel='icon' href='/logo.svg' />
      </Head>
      <Navigation />
      <div className='container my-3'>{children}</div>
    </>
  )
}
