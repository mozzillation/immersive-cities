import { getAllCities } from '@api'
import List from '@component/list'
import Space from '@component/space'
import { useDeviceDetect } from '@utils'
import Head from 'next/head'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'

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
