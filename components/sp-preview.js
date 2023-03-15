import styles from '../styles/SPPreview.module.css';
import Image from 'next/image';
import { useState } from "react";

export default function SPPreview({ provider }) {
    // later check if logo is given in props and use placeholder as backup if not given
    let logo_url = "/images/placeholder-logo.png";
    const [showDescription, setShowDescription] = useState(false);

    console.log(provider);

    function handleDescriptionToggle() {
        setShowDescription(!showDescription);
    }

    return (
        <div className={styles.container_box}>
            <div className={styles.logo}></div>
            <div className={styles.providerDetails}>
                <div className={styles.providerName}>{provider.name}</div>
                <div className={styles.providerContacts}>
                    <div className={styles.contactsRow}>
                        {provider.description !== "" && <div onClick={handleDescriptionToggle}>
                            View Description <span className={styles.bold}>∨</span>
                        </div>}
                        {
                           provider.description === "" && <div>
                           <span className={styles.bold}></span>
                       </div> 
                        }
                        <div className={styles.contactsWebsite}>
                            <a href={"/orgs/"+ provider.id}>View Organization Information ↗</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}