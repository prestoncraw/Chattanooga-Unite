import { services, counties } from "../lib/services-provided";
import styles from '../styles/FindHelp.module.css';
import { useState } from "react";

export default function FindHelp() {
    return (
        <div className={styles.container}>
            <h1>What Do You Need Help With?</h1>
            <div className={styles.select_box_container}>
                {services.map((service, index) => (<div className={styles.select_box} key={index}>{service.title}</div>))}
            </div>

        </div>
    )
}
