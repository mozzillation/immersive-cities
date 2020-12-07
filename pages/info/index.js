import styles from './Info.module.sass'
import { useRouter } from 'next/router'
import { getMore, getAllArtists } from '@api'
import { getKeyByValue } from '@utils'
import PropTypes from 'prop-types'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import Markdown from 'markdown-to-jsx'

export default function InfoPage({ info, artists }) {
    const router = useRouter()
    const { locale } = router

    const currentTrans = getKeyByValue(info, locale)

    return (
        <div className={styles.Info}>
            <Head>
                <title>Immersive Cities / Info</title>
            </Head>
            <div className={styles.Wrapper}>
                <div className={styles.Title}>{info.title}</div>
                <div className={styles.Text}>
                    {currentTrans.map((line) => (
                        <p key={line}>
                            <Markdown>{line}</Markdown>
                        </p>
                    ))}
                </div>

                <div className={styles.List}>
                    {artists.map((artist, index) => (
                        <Link href={'/artist/' + artist.slug} key={index}>
                            <div className={styles.Card}>
                                <div className={styles.Portrait}>
                                    <Image
                                        src={'/artist/' + artist.portrait}
                                        alt={
                                            artist.firstName +
                                            ' ' +
                                            artist.lastName
                                        }
                                        loading="lazy"
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                </div>
                                <div className={styles.CardTitle}>
                                    {artist.firstName} {artist.lastName}
                                </div>
                            </div>
                        </Link>
                    ))}

                    <Link href="https://www.leandropisano.it/">
                        <div className={styles.Card}>
                            <div className={styles.Portrait}>
                                <Image
                                    src={'/artist/leandro-pisano.jpg'}
                                    alt={'Leandro Pisano'}
                                    loading="lazy"
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>
                            <div className={styles.CardTitle}>
                                Leandro Pisano
                            </div>
                        </div>
                    </Link>
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
