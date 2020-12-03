import Head from 'next/head'
import List from '@component/list'
import PropTypes from 'prop-types'
import { getAllCities } from '@api'
import { useDeviceDetect } from '@utils'

export default function Home({ cities }) {
    const { isMobile } = useDeviceDetect()

    return (
        <div>
            <Head>
                <title>Immersive Cities</title>
            </Head>

            {isMobile ? <List cities={cities} /> : null}
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
