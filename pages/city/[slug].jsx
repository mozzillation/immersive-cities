import { getCityBySlug, getAllCities } from '@api'
import { getKeyByValue } from '@utils'
import { useRouter } from 'next/router'
import Head from 'next/head'
import PropTypes from 'prop-types'
import Audio from '@component/audio'
import Link from 'next/link'
import styles from './City.module.sass'
import { Fragment } from 'react'
import Markdown from 'markdown-to-jsx'
import { NextSeo } from 'next-seo'

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

            <NextSeo
                title={
                    'Immersive Cities / ' + currenTrans.name + ': ' + city.title
                }
                canonical="https://www.immersivecities.org/"
                openGraph={{
                    url: 'https://www.immersivecities.org/' + router.asPath,
                    title:
                        'Immersive Cities / ' +
                        currenTrans.name +
                        ': ' +
                        city.title,
                    description: currenTrans.text,
                    siteName: 'Immersive Cities'
                }}
            />

            <div
                className={styles.Header}
                style={{ backgroundColor: city.color }}
            >
                <div className={styles.Wrapper}>
                    <div className={styles.Name}>{currenTrans.name}</div>

                    <div className={styles.Title}>{city.title}</div>

                    <div className={styles.Authors}>
                        {city.authors.map((author) => (
                            <Link href={author.link} key={author}>
                                <div className={styles.Author} key={author}>
                                    {author.name}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <div className={styles.Audios}>
                <div className={styles.Wrapper}>
                    <div className={styles.AudioWrapper}>
                        {city.audio.map((chapter) => {
                            return (
                                <Fragment key={chapter.chapter}>
                                    <div className={styles.AudioTitle}>
                                        {chapter.chapter}
                                    </div>

                                    {chapter.audio.map((audio) => (
                                        <Audio
                                            src={audio.url}
                                            title={audio.name}
                                            key={audio.url}
                                        />
                                    ))}
                                </Fragment>
                            )
                        })}
                    </div>
                </div>
            </div>

            <div className={styles.Content}>
                <div className={styles.Wrapper}>
                    <div className={styles.Text}>
                        <Markdown>{currenTrans.text}</Markdown>
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
