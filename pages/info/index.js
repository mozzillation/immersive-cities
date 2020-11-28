import styles from './Info.module.sass'
import { useRouter } from 'next/router'
import { getMore } from '@api'
import { getKeyByValue } from '@utils'
import PropTypes from 'prop-types'

export default function InfoPage({ info }) {
    const router = useRouter()
    const { locale } = router

    const currentTrans = getKeyByValue(info, locale)

    return (
        <div className={styles.Info}>
            <div className={styles.Wrapper}>
                <div className={styles.Title}>{info.title}</div>
                <div className={styles.Text}>
                    {currentTrans.map((line) => (
                        <p key={line}>{line}</p>
                    ))}
                </div>
            </div>
        </div>
    )
}

export async function getStaticProps() {
    return {
        props: {
            info: await getMore('info')
        }
    }
}

InfoPage.propTypes = {
    info: PropTypes.array
}
