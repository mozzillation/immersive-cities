import PropTypes from 'prop-types'
import Link from 'next/link'
import styles from './List.module.sass'
import { useRouter } from 'next/router'
import { getKeyByValue } from '@utils'

export default function List({ cities }) {
    const router = useRouter()
    const { locale } = router

    return (
        <div className={styles.Wrapper}>
            <div className={styles.List}>
                {cities.map((city, index) => {
                    const currentTrans = getKeyByValue(city, locale)
                    return (
                        <Link href={'/city/' + city.slug} key={index}>
                            <div
                                className={styles.Card}
                                style={{ backgroundColor: city.color }}
                            >
                                <div className={styles.Name}>
                                    {currentTrans.name}
                                </div>
                                <div className={styles.Title}>{city.title}</div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

List.propTypes = {
    cities: PropTypes.array
}
