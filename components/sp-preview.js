import styles from '../styles/SPPreview.module.css';
import Image from 'next/image';

export default function SPPreview({ provider }) {
    // later check if logo is given in props and use placeholder as backup if not given
    let logo_url = "/images/placeholder-logo.png";

    return (
        <div className={styles.container_box}>
            <div className={styles.logo}></div>
            <div className={styles.providerDetails}>
                <div className={styles.providerName}>{provider.name}</div>
                <div className={styles.providerContacts}>
                    <div className={styles.contactsRow}>
                        <div>
                            View Description <span className={styles.bold}>∨</span>
                        </div>
                        <div className={styles.contactsWebsite}>
                            <a href='https://google.com' target='_blank'>Visit Website ↗</a>
                        </div>
                    </div>
                    <div className={styles.contactPhone}>
                        (423) 555-5555
                    </div>
                    <div className={styles.contactsRow}>
                        <div className={styles.contactAddress}>
                            123 Market Street, Chattanooga TN, 37421
                        </div>
                        <div className={styles.contactEmail}>
                            <a href="mailto:example@example.com">example@example.com ↗</a>
                        </div>
                    </div>


                    <div><span className={styles.blue}>Services:</span> Advocacy, Benefits, Clothing, Housing</div>
                    <div><span className={styles.blue}>Counties:</span> Bledsoe, Bradley, Dekalb, Hamilton, Sequatchie, Catoosa, Dade, Walker, Grundy, Marion, McMinn</div>
                </div>
            </div>
        </div>
    )
}