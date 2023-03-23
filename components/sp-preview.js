import styles from '../styles/SPPreview.module.css';
import Image from 'next/image';
import { useState } from "react";
import { useRouter } from "next/router";
import Link from 'next/link';

export default function SPPreview({ provider, service_id, county_id }) {
    // later check if logo is given in props and use placeholder as backup if not given
    let logo_url = "/images/placeholder-logo.png";
    const [showDescription, setShowDescription] = useState(false);
    const router = useRouter();
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
                        <Link href={{pathname: "/orgs/"+ provider.id, query: {service_id: service_id, county_id: county_id}}}>View Organization Information ↗</Link>
                            {/*<a href={"/orgs/"+ provider.id}>View Organization Information ↗</a>*/}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


