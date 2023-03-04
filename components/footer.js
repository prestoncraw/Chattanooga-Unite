import styles from '../styles/Footer.module.css';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';


export default function Footer() {
    return (
        <div className={styles.footer_container}>
            <div className={styles.link_container}>
                <ul>
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/find-help">Find Help</Link></li>
                    <li><Link href="/your-dd214">DD214 Information</Link></li>
                    <li><Link href="/key-numbers">Key Numbers</Link></li>
                    <li><Link href="/get-involved">Get Involved</Link></li>
                    <li><Link href="/contact">Contact</Link></li>
                    <li><Link href="/dashboard">Service Provider Login</Link></li>
                </ul>
            </div>

            <div className={styles.logo_container}>
                <div className={styles.vaLogo}>
                    <Image
                        src="/images/VA logo.svg"
                        alt="VA Logo"
                        width={100}
                        height={100}
                    />
                </div>
                <div className={styles.branches}>
                    <Image
                        src="/images/navylogo.png"
                        alt="Navy logo"
                        width={50}
                        height={50}
                    />
                    <Image
                        src="/images/armylogo.png"
                        alt="Army logo"
                        width={50}
                        height={50}
                    />
                    <Image
                        src="/images/marinelogo.png"
                        alt="Marine logo"
                        width={50}
                        height={50}
                    />
                    <Image
                        src="/images/coastgaurd.png"
                        alt="Coast Guard logo"
                        width={50}
                        height={50}
                    />
                    <Image
                        src="/images/airforcelogo.png"
                        alt="Air Force logo"
                        width={50}
                        height={50}
                    />
                    <Image
                        src="/images/space_force_logo.png"
                        alt="Space Force logo"
                        width={50}
                        height={50}
                    />
                </div>
                <div className={styles.chattUniteLogo}>
                    <Image
                        src="/images/chattanoogaway.png"
                        alt="Chattanooga Unite Logo"
                        width={100}
                        height={100}
                    />
                </div>
            </div>
            <p className={styles.description}>Proud partner of the Department of Veteran Affairs.</p>
            <p className={styles.copyright_container}>Copyright © 2023 Chattanooga Unite.</p>
        </div>
 
 )
}