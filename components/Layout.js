import Head from 'next/head'

function Layout({ children, title }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content="white"
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: dark)"
          content="black"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
      </Head>
      <body>{children}</body>
    </>
  )
}

export default Layout
