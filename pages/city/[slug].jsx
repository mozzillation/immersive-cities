import { getCityBySlug, getAllPosts } from '@api'
import { getKeyByValue } from '@utils'
import { useRouter } from 'next/router'
import Head from 'next/head'
import PropTypes from 'prop-types'
import Audio from '@component/audio'
import Link from 'next/link'
import styles from './City.module.sass'

export default function City({ city }) {
    const router = useRouter()
    const { locale } = router

    const currenTrans = getKeyByValue(city, locale)

    return (
        <section className={styles.City}>
            <Head>
                <title>Immersive Cities / {currenTrans.name} </title>
            </Head>

            <div className={styles.Header}>
                <div className={styles.Wrapper}>
                    <div className={styles.Name}>{currenTrans.name}</div>

                    <div className={styles.Title}>{city.title}</div>

                    <div className={styles.Authors}>
                        {city.authors.map((author, index) => (
                            <Link href={author.link} key={index}>
                                <div className={styles.Author}>
                                    {author.name}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <div className={styles.Audios}>
                <div className={styles.Wrapper}>
                    <div className={styles.AudioTitle}>AUDIO</div>

                    <div className={styles.AudioWrapper}>
                        <Audio
                            title="Mercato al minuto (Rialto)"
                            src="/audio/venice/01.wav"
                        />
                        <Audio
                            title="La bottega del remér"
                            src="/audio/venice/02.wav"
                        />
                        <Audio
                            title="Campo San Giacomo da l’Orio"
                            src="/audio/venice/03.wav"
                        />
                        <Audio
                            title="La spesa a remi"
                            src="/audio/venice/04.wav"
                        />
                        <Audio
                            title="A cena da Marta"
                            src="/audio/venice/05.wav"
                        />
                    </div>
                </div>
            </div>

            <div className={styles.Content}>
                <div className={styles.Wrapper}>
                    <div className={styles.Text}>
                        <p>{currenTrans.text}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export async function getStaticProps(context) {
    return {
        props: {
            city: await getCityBySlug(context.params.slug)
        }
    }
}

export async function getStaticPaths({ locales }) {
    let paths = await getAllPosts()

    const internalization = []

    for (let post of paths) {
        for (let locale of locales) {
            internalization.push({
                params: { slug: post.slug },
                locale: locale
            })
        }
    }

    return {
        paths: internalization,
        fallback: false
    }
}

City.propTypes = {
    city: PropTypes.object.isRequired
}
