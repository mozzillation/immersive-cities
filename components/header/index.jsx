import styles from "./Header.module.sass";
import Link from "next/link";

export const Header = () => {
  return (
    <div className={styles.Header}>
      <div className={styles.Wrapper}>
        <div className={styles.Name}>
          <Link href={"/"}>
            <div className={styles.Logo}>
              <span>Immersive</span> <span>Cities</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
