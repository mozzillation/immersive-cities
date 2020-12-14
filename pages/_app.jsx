import PropTypes from 'prop-types'
import '@styles/globals.sass'
import Layout from '@component/layout'
import { useRouter } from 'next/router'

function App({ Component, pageProps }) {
    const router = useRouter()
    const { locale, locales, asPath } = router

    return (
        <Layout current={locale} all={locales} path={asPath}>
            <Component {...pageProps} />
        </Layout>
    )
}

App.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object
}

export default App
