import { NextPage } from 'next'
import { Html, Head, Main, NextScript } from 'next/document'

const Document: NextPage = () => {
    return (
        <Html lang="en">
            <Head>
                <link rel="manifest" href="/manifest.json" />
                <link rel="apple-touch-icon" href="/icon.png"></link>
                <meta name="theme-color" content="#fff" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}

export default Document;