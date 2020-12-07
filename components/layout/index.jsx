import PropTypes from 'prop-types'
import { Header } from '@component/header'
import { Footer } from '@component/footer'
import styles from './Layout.module.sass'

export default function Layout({ children, all, path }) {
    console.log(path)

    let classN

    if (path === '/') {
        classN = 'home'
    } else {
        classN = path
    }

    return (
        <div className={styles[classN]}>
            <div className={styles.Layout}>
                <Header />
                <main>{children}</main>
                <Footer all={all} path={path} />
            </div>
        </div>
    )
}

Layout.propTypes = {
    current: PropTypes.string,
    all: PropTypes.array,
    path: PropTypes.string,
    children: PropTypes.object.isRequired
}
