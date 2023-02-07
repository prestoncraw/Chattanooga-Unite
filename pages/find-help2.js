import { services, counties } from "../lib/services-provided";
import styles from '../styles/FindHelp.module.css';
import { useState } from "react";

export default function FindHelp() {
    // three states the page can be in:
    // service selection, county selection, and result
    const [step, setStep] = useState('service');
    const [service, setService] = useState(null);
    const [county, setCounty] = useState(null);
    const [serviceProviders, setServiceProviders] = useState([]); 

    const handleServiceChange = (service) => {
        setService(service);
        setStep('county');
    }
    const handleCountyChange = (county) => {
        setCounty(county);

        // fetch the matching SPs
        fetch(`/api/find-help?service_id=${service}&county_id=${county}`)
            .then(response => response.json())
            .then(data => setServiceProviders(data.data))
            .then(() => setStep('result'));
    }
    const handleResultChange = () => {
        setStep('service');
    }


    return (
        <div className={styles.container}>
            <h1>What Do You Need Help With?</h1>
            <h2>Select a {step}</h2>
            <div className={styles.select_box_container}>
                {step === 'service' && services.map(service => <div className={styles.select_box} key={service.id} onClick={() => handleServiceChange(service.id)}>{service.title}</div>)}
                {step === 'county' && counties.map(county => <div className={styles.select_box} key={county.id} onClick={() => handleCountyChange(county.id)}>{county.name}</div>)}
            </div>
            <div>Selected service: {service} Selected County:  {county}</div>
            {step === 'result' && Object.values(JSON.parse(serviceProviders)).map(sp => <div key={sp.id}>{sp.name}</div>)}

            <div className={styles.results_container}></div>
            {step === 'result' && <h3 onClick={handleResultChange}>New search</h3>}

        </div>
    )
}