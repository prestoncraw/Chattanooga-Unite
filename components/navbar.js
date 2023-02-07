import Head from 'next/head';
import styles from '../styles/NavBar.module.css';
import Link from 'next/link';

export default function NavBar() {
    return (
        <>
            <Head>
                <script src="https://kit.fontawesome.com/8e69a0977a.js" crossorigin="anonymous"></script>
            </Head>
            <main>
                <div className={styles.container}>
                    <div>
                        <ul>
                            <li id='home-li'>
                                <Link href='/'><i class="fa-solid fa-house"></i>Home</Link>
                            </li>
                            <li id='find-help-li'>
                                <Link href='/find-help'>Find Help</Link>
                            </li>
                            <li id='your-dd214-li'>
                                <Link href='/your-dd214'>Your DD214</Link>
                            </li>
                            <li id='key-numbers-li'>
                                <Link href='/key-numbers'>Key Numbers</Link>
                            </li>
                            <li id='participating-organizations-li'>
                                <Link href='/participating-organizations'>Participating Organizations</Link>
                            </li>
                            <li id='contact-li'>
                                <Link href='/contact'>Contact</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </main>
        </>

    )
}