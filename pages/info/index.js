import styles from './Info.module.sass'
import { useRouter } from 'next/router'
import { getMore, getAllArtists } from '@api'
import { getKeyByValue } from '@utils'
import PropTypes from 'prop-types'
import Link from 'next/link'

export default function InfoPage({ info, artists }) {
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

                <div className={styles.List}>
                    {artists.map((artist, index) => (
                        <Link href={'/artist/' + artist.slug} key={index}>
                            <div className={styles.Card}>
                                <div className={styles.Portrait}>
                                    <img src={'/artist/' + artist.portrait} />
                                </div>
                                <div className={styles.CardTitle}>
                                    {artist.firstName} {artist.lastName}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export async function getStaticProps() {
    return {
        props: {
            info: await getMore('info'),
            artists: await getAllArtists()
        }
    }
}

InfoPage.propTypes = {
    info: PropTypes.object,
    artists: PropTypes.array
}
