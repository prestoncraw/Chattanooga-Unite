import styles from '../styles/Footer.module.css';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';


export default function Footer() {
    return (
        <div className={styles.footer_container}>
            <div className={styles.container}>
            <div className={styles.link_container}>
                        <ul> 
                            <li id='home-li'>
                                <Link href='/'>Home</Link>
                            </li>
                            <li id='find-help-li'>
                                <Link href='/find-help'>Find Help</Link>
                            </li>
                            <li id='your-dd214'>
                                <Link href='/your-dd214'>Your DD214</Link>
                            </li>
                            <li id='key-numbers-li'>
                                <Link href='/key-numbers'>Key Numbers</Link>
                            </li>
                            <li id='participating-organizations-li'>
                                <Link href='/participating-organizations'>Participating Organizations</Link>
                            </li>
                            <li id='contact-li'>
                                <Link href='/contact'>Contact Us</Link>
                            </li><li id='sp-login'>
                                <Link href='/dashboard'>Service Provider Login</Link>
                            </li>
                        </ul>
                </div>
            </div>
            <div className={styles.container}>
                <div className={styles.United_logo_container}>
                    <div className={styles.unitedway}>
                        <Image
                            src="/images/unitedwaylogo.png"
                            alt="Logo"
                            width={175}
                            height={150}
                        />
                    </div>
                </div>
                <div className={styles.branch_container}>
                    <div className={styles.branch_row}>
                        <div className={styles.navy}>
                            <Image
                                src="/images/navylogo.png"
                                alt="Logo"
                                width={25}
                                height={25}
                            />
                        </div>
                        <div className={styles.army}>
                            <Image
                                src="/images/armylogo.png"
                                alt="Logo"
                                width={25}
                                height={25}
                            />
                        </div>
                        <div className={styles.marine}>
                            <Image
                                src="/images/marinelogo.png"
                                alt="Logo"
                                width={25}
                                height={25}
                            />
                        </div>
                        <div className={styles.coastgaurd}>
                            <Image
                                src="/images/coastgaurd.png"
                                alt="Logo"
                                width={25}
                                height={25}
                            />
                        </div>
                        <div className={styles.airforce}>
                            <Image
                                src="/images/airforcelogo.png"
                                alt="Logo"
                                width={25}
                                height={25}
                            />
                        </div>
                        <div className={styles.spaceforce}>
                            <Image
                                src="/images/space_force_logo.png"
                                alt="Logo"
                                width={25}
                                height={25}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.chattunite_logo_container}>
                    <div className={styles.unitedway}>
                        <Image
                            src="/images/chattanoogaway.png"
                            alt="Logo"
                            width={175}
                            height={150}
                        />
 
                    </div>
                </div>
            </div>
            <div className={styles.container}>
                <div className={styles.copyright_container}>
                    Copyright © 2023 Chattanooga Unite.
                </div>
            </div>
        </div>
 
 )
}