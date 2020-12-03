import { getCityBySlug, getAllCities } from '@api'
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
                <title>
                    Immersive Cities / {currenTrans.name}: {city.title}
                </title>
            </Head>

            <div
                className={styles.Header}
                style={{ backgroundColor: city.color }}
            >
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
                        {city.audio.map((audio, index) => (
                            <Audio
                                title={audio.name}
                                src={audio.url}
                                key={index}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className={styles.Content}>
                <div className={styles.Wrapper}>
                    <div className={styles.Text}>
                        {currenTrans.text.map((line, index) => (
                            <p key={index}>{line}</p>
                        ))}
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
    let paths = await getAllCities()

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
