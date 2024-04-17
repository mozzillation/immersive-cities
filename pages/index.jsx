import Head from 'next/head'
import Space from '@component/space'
import List from '@component/list'
import PropTypes from 'prop-types'
import { getAllCities, getMore } from '@api'
import { useDeviceDetect } from '@utils'
import { useRouter } from 'next/router'
import React from 'react'

export default function Home({ cities }) {
    const { isMobile } = useDeviceDetect()

    const router = useRouter()
    const { locale } = router

    return (
        <div>
            <Head>
                <title>Immersive Cities</title>
            </Head>

            {isMobile ? (
                <List cities={cities} />
            ) : (
                <Space cities={cities} locale={locale} />
            )}
        </div>
    )
}

export async function getStaticProps() {
    return {
        props: {
            cities: await getAllCities()
        }
    }
}

Home.propTypes = {
    cities: PropTypes.array
}
