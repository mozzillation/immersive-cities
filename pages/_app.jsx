import PropTypes from 'prop-types'
import '@styles/globals.sass'
import Layout from '@component/layout'
import { useRouter } from 'next/router'
import { DefaultSeo } from 'next-seo'
import { useEffect } from 'react'
import Head from 'next/head'
import * as gtag from '@utils'

function App({ Component, pageProps }) {
    const router = useRouter()
    const { locale, locales, asPath } = router

    console.log(router)

    useEffect(() => {
        const handleRouteChange = (url) => {
            gtag.pageview(url)
        }
        router.events.on('routeChangeComplete', handleRouteChange)
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange)
        }
    }, [router.events])

    return (
        <>
            <DefaultSeo
                title="Immersive Cities"
                description="Soundscapes for Language Learners"
                canonical="https://www.immersivecities.org/"
                openGraph={{
                    type: 'website',
                    locale: 'en_GB',
                    url: 'https://www.immersivecities.org/',
                    site_name: 'Immersive Cities',
                    description: 'Soundscapes for Language Learners',
                    images: [
                        {
                            url: require('../public/social.png'),
                            alt: 'Giuliano Mozzillo'
                        }
                    ]
                }}
                twitter={{
                    site: '@Mozzillation',
                    cardType: 'summary_large_image'
                }}
            />
            <Head>
                <link rel="manifest" href="/manifest.json" />
                <link
                    rel="apple-touch-icon"
                    href="/icons/icon-72x72.png"
                ></link>
                <meta name="theme-color" content="#803af3" />
            </Head>
            <Layout current={locale} all={locales} path={asPath}>
                <Component {...pageProps} />
            </Layout>
        </>
    )
}

App.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object
}

export default App
