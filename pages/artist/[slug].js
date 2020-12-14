import { getArtistBySlug, getAllArtists } from '@api'
import { getKeyByValue } from '@utils'
import { useRouter } from 'next/router'
import Head from 'next/head'
import PropTypes from 'prop-types'
import styles from './Artist.module.sass'
import { NextSeo } from 'next-seo'

export default function Artist({ artist }) {
    const router = useRouter()
    const { locale } = router

    const currentTrans = getKeyByValue(artist, locale)

    return (
        <section className={styles.Artist}>
            <NextSeo
                title={'Immersive Cities / Artist: ' + artist.firstName}
                canonical="https://www.immersivecities.org/"
                openGraph={{
                    url: 'https://www.immersivecities.org/' + router.asPath,
                    title: 'Immersive Cities / Artist: ' + artist.firstName,
                    description: currentTrans.bio,
                    site_name: 'Immersive Cities',
                    images: [
                        {
                            url: require('../../public/artist/' +
                                artist.portrait),
                            alt: artist.firstName
                        }
                    ]
                }}
            />

            <Head>
                <title>
                    Immersive Cities / Artist: {artist.firstName}{' '}
                    {artist.lastName}
                </title>
            </Head>

            <div className={styles.Intro}>
                <div className={styles.Wrapper}>
                    <div className={styles.Name}>
                        {artist.firstName} {artist.lastName}
                    </div>

                    <div className={styles.Portrait}>
                        <img src={'/artist/' + artist.portrait} />
                    </div>

                    {artist.website ? (
                        <div className={styles.Link}>
                            <a href={artist.website} target="_new">
                                {artist.website} ↗
                            </a>
                        </div>
                    ) : null}
                </div>
            </div>

            <div className={styles.Bio}>
                <div className={styles.Wrapper}>
                    <div className={styles.Text}>
                        <p>{currentTrans.bio}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export async function getStaticProps(context) {
    return {
        props: {
            artist: await getArtistBySlug(context.params.slug)
        }
    }
}

export async function getStaticPaths({ locales }) {
    let paths = await getAllArtists()
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

Artist.propTypes = {
    artist: PropTypes.object.isRequired
}
