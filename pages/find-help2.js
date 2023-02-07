import { services, counties } from "../lib/services-provided";
import styles from '../styles/FindHelp.module.css';
import { useState } from "react";
import NavBar from '../components/navbar';
import Footer from '../components/footer';

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
        <>
            <NavBar />
            <div className={styles.container}>

                {step === 'service' && <h1>What Do You Need Help With?</h1>}
                {step === 'county' && <h1>Which County Are You In?</h1>}
                {step === 'result' && <h1>These Service Providers Can Help</h1>}



                {/* <h2>Select a {step}</h2> */}
                <div className={styles.content_container}>
                    {step === 'service' && services.map(service => <div className={styles.select_box} key={service.id} onClick={() => handleServiceChange(service.id)}>{service.title}</div>)}
                    {step === 'county' && counties.map(county => <div className={styles.select_box} key={county.id} onClick={() => handleCountyChange(county.id)}>{county.name}</div>)}
                
                
                    {step === 'result' && Object.values(JSON.parse(serviceProviders)).map(sp => <div key={sp.id} className={styles.result_box}>{sp.name}</div>)}
                </div>

                {step === 'result' && <h3 onClick={handleResultChange}>New search</h3>}

            </div>
            <Footer/>
        </>

    )
}
