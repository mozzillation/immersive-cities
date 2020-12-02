import Head from 'next/head'
import List from '@component/list'
import PropTypes from 'prop-types'
import { getAllCities } from '@api'

export default function Home({ cities }) {
    return (
        <>
            <Head>
                <title>Immersive Cities</title>
            </Head>

            <List cities={cities} />
        </>
    )
}

export async function getStaticProps() {
    console.log('static props', await getAllCities())

    return {
        props: {
            cities: await getAllCities()
        }
    }
}

Home.propTypes = {
    cities: PropTypes.array
}
