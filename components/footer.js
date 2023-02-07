import styles from '../styles/Footer.module.css';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';


export default function Footer() {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.branch_container}>
                    <div className={styles.branch_columns}>
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
                        <div className={styles.coastgaurd}>
                            <Image
                                src="/images/coastgaurd.png"
                                alt="Logo"
                                width={25}
                                height={25}
                            />
                        </div>
                    </div>
                    <div className={styles.branch_columns}>
                        <div className={styles.airforce}>
                            <Image
                                src="/images/airforcelogo.png"
                                alt="Logo"
                                width={35}
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
                <div className={styles.logo_container}>
                    <div className={styles.unitedway}>
                        <Image
                            src="/images/unitedwaylogo.png"
                            alt="Logo"
                            width={175}
                            height={150}
                        />
                    </div>
                    <div className={styles.twoOneOne}>
                        <Image
                            src="/images/211logo.png"
                            alt="Logo"
                            width={125}
                            height={120}
                        />
                    </div>
                    <div className={styles.chattunite}>
                        <Image
                            src="/images/chattanoogaway.png"
                            alt="Logo"
                            width={125}
                            height={120}
                        />
                    </div>
                </div>
            </div>
        </>


    )
}