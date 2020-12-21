import styles from './Footer.module.sass'
import Link from 'next/link'
import PropTypes from 'prop-types'

export const Footer = ({ all, path }) => {
    return (
        <footer className={styles.Footer}>
            <div className={styles.Wrapper}>
                <div className={styles.Switcher}>
                    {all.map((lang) => {
                        return (
                            <Link href={path} locale={lang} key={lang}>
                                {lang === 'it-IT' ? 'Italiano' : 'English'}
                            </Link>
                        )
                    })}

                    <a
                        href="https://www.iubenda.com/privacy-policy/14694546"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Privacy Policy
                    </a>
                </div>
            </div>
        </footer>
    )
}

Footer.propTypes = {
    all: PropTypes.array,
    path: PropTypes.string
}
