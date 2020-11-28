import PropTypes from 'prop-types'
import { Header } from '@component/header'
import { Footer } from '@component/footer'

export default function Layout({ children, all, path }) {
    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer all={all} path={path} />
        </>
    )
}

Layout.propTypes = {
    current: PropTypes.string,
    all: PropTypes.array,
    path: PropTypes.string,
    children: PropTypes.object.isRequired
}
