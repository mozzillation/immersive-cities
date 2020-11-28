import PropTypes from 'prop-types'
import '@styles/globals.sass'
import Layout from './layout'

function App({ Component, pageProps }) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    )
}

App.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object
}

export default App
