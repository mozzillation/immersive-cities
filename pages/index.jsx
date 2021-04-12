import Head from 'next/head'
import Space from '@component/space'
import List from '@component/list'
import PropTypes from 'prop-types'
import { getAllCities, getMore } from '@api'
import { useDeviceDetect } from '@utils'
import { useRouter } from 'next/router'
import Countdown from '@component/countdown'
import React, { useState } from 'react'

export default function Home({ cities, letter }) {
    const { isMobile } = useDeviceDetect()
    const [isVisible, setIsVisible] = useState(false)

    const router = useRouter()
    const { locale } = router

    function setVisible() {
        setIsVisible(true)
    }

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
            cities: await getAllCities(),
            letter: await getMore('letter')
        }
    }
}

Home.propTypes = {
    cities: PropTypes.array,
    letter: PropTypes.object
}
