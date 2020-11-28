import PropTypes from 'prop-types'
import { Header } from '@component/header'

export default function Layout({ children }) {
    return (
        <>
            <Header />
            <main>{children}</main>
        </>
    )
}

Layout.propTypes = {
    children: PropTypes.object.isRequired
}
