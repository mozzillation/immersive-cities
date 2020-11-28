import styles from './Header.module.sass'
import Link from 'next/link'

export const Header = () => {
    return (
        <header className={styles.Header}>
            <div className={styles.Wrapper}>
                <div className={styles.Name}>
                    <Link href={'/'}>
                        <div className={styles.Logo}>
                            <span>Immersive</span> <span>Cities</span>
                        </div>
                    </Link>
                </div>

                <div className={styles.Info}>
                    <Link href={'/info'}>Info</Link>
                </div>
            </div>
        </header>
    )
}
