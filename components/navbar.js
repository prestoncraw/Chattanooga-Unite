import styles from '../styles/NavBar.module.css';
import Link from 'next/link';

export default function NavBar() {
    return (
        <div className={styles.container}>
            <div>
                <ul>
                    <li id='home-li'>
                        <Link href='/'>Home</Link>
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
                    <li id='participating-orginaizations-li'>
                        <Link href='/participating-organizations'>Participating Organizations</Link>
                    </li>
                    <li id='contact-li'>
                        <Link href='/contact'>Contact</Link>
                    </li>
                    
                </ul>
            </div>
        </div>

    )
}