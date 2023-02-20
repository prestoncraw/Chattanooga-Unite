import { useState } from "react";
import styles from '../styles/NavBar.module.css';
import Link from 'next/link';

export default function NavBar() {
    // whether mobile hamburger menu is opened or closed
    const [showMenu, setShowMenu] = useState(false);

    function handleClickMenu() {
        setShowMenu(!showMenu);
    }


    return (
        <>
            <main>
                <div className={styles.container}>
                    <div>
                        <ul>
                            <Link href='/'>
                                <li id='home-li'>
                                    <i className="fa-solid fa-house"></i>Chattanooga Unite
                                </li>
                            </Link>
                            <Link href='/find-help'>
                                <li id='find-help-li'>
                                    Find Help
                                </li>
                            </Link>
                            <Link href='/your-dd214'>
                                <li id='your-dd214-li'>
                                    Your DD214
                                </li>
                            </Link>
                            <Link href='/key-numbers'>
                                <li id='key-numbers-li'>
                                    Key Numbers
                                </li>
                            </Link>
                            <Link href='/participating-organizations'>
                                <li id='participating-organizations-li'>
                                    Participating Organizations
                                </li>
                            </Link>
                            <Link href='/contact'>
                                <li id='contact-li'>
                                    Contact
                                </li>
                            </Link>
                        </ul>
                    </div>
                </div>
                <div className={styles.mobile_container}>
                    <Link href='/'>
                        <div id='home-li'>
                            <i className="fa-solid fa-house"></i>Chattanooga Unite
                        </div>
                    </Link>
                    <div className={styles.mobile_hamburger} onClick={handleClickMenu}>
                        <i className="fa-solid fa-bars"></i>
                    </div>
                </div>
                {showMenu && <div className={styles.mobile_menu}>
                    <ul>
                        <Link href='/find-help'>
                            <li id='find-help-li'>
                                Find Help
                            </li>
                        </Link>
                        <Link href='/your-dd214'>
                            <li id='your-dd214-li'>
                                Your DD214
                            </li>
                        </Link>
                        <Link href='/key-numbers'>
                            <li id='key-numbers-li'>
                                Key Numbers
                            </li>
                        </Link>
                        <Link href='/participating-organizations'>
                            <li id='participating-organizations-li'>
                                Participating Organizations
                            </li>
                        </Link>
                        <Link href='/contact'>
                            <li id='contact-li'>
                                Contact
                            </li>
                        </Link></ul></div>}
            </main>
        </>

    )
}