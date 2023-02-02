import styles from '../styles/Footer.module.css';
import Link from 'next/link';

export default function Footer() {
    return (
        <>
            <div className={styles.footer_background}>
                <p className={styles.description}>Branches</p>
                <p className={styles.description}>Logos</p>
            </div>
        </>


    )
}