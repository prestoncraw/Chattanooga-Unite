import { services, counties } from "../lib/services-provided";
import styles from '../styles/FindHelp.module.css';
import { useState } from "react";
import NavBar from '../components/navbar';
import Footer from '../components/footer';
import SPPreview from "../components/sp-preview";
import Head from 'next/head';

export default function FindHelp() {
    // three states the page can be in:
    // service selection, county selection, and result
    const [step, setStep] = useState('service');
    const [service, setService] = useState(null);
    const [service_name, setServiceName] = useState(null)
    const [county, setCounty] = useState(null);
    const [county_name, setCountyName] = useState(null);
    const [serviceProviders, setServiceProviders] = useState([]);

    const handleServiceChange = (service, service_name) => {
        setService(service);
        setServiceName(service_name);
        setStep('county');
    }
    const handleCountyChange = (county, county_name) => {
        setCounty(county);
        setCountyName(county_name);

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
            <Head>
                <title>Find Help &raquo; Chattanooga Unite - Veterans Resource Center</title>
                <link rel="icon" href="/favicon.ico" />
                <meta property="og:title" content="Find Help / Chattanooga Unite - Veterans Resource Center" />
                <meta
                    property="og:description"
                    content="Chattanooga Unite provides outreach to all military service persons including veterans and their familes by creating partnerships between VA providers and local agencies for those in the Chattanooga area. Use this page to locate help from local organizations."
                />
                <meta
                    property="og:image"
                    content="https://pub-62dc534c19094cf6b30ce047dde383e3.r2.dev/unite.jpg"
                />
            </Head>
            <NavBar />
            <div className={styles.container}>

                {step === 'service' && <h1>What Do You Need Help With?</h1>}
                {step === 'county' && <h1>Which County Are You In?</h1>}
                {step === 'result' && <h1>These Organizations Can Provide Help</h1>}

                <div className={styles.break}> </div>
                <div className={styles.content_container}>
                    {step === 'service' && services.map(s => <div className={styles.select_box} key={s.id} onClick={() => handleServiceChange(s.id, s.title)}><div className={styles.select_box_img}><div className={s.icon}></div></div><div className={styles.select_box_text}>{s.title}</div></div>)}
                    {step === 'county' && counties.map(county => <div className={styles.select_box} key={county.id} onClick={() => handleCountyChange(county.id, county.name)}><div className={styles.select_box_img}><svg viewBox={"0 0 " + county.svg_w + " " + county.svg_h}><path d={county.svg_path}></path><title>{county.alt}</title></svg></div><div className={styles.select_box_text}>{county.name}</div></div>)}

                    {(step === 'result' && Object.values(JSON.parse(serviceProviders)).length == 0) && <div className={styles.noServiceWarn}>Selected service not available in selected county.</div>}

                    {step === 'result' && Object.values(JSON.parse(serviceProviders)).map(sp => <SPPreview key={sp.id} provider={sp} />)}
                </div>

                <div className={styles.options_container}>
                    {step === 'result' && <div className={styles.results_text}>Showing results for <span className={styles.bold}>{service_name}</span> in <span className={styles.bold}>{county_name}</span> county</div>}
                    {step === 'result' && <div className={styles.button} onClick={handleResultChange}>New search →</div>}
                </div>

            </div>
            <div className={styles.break}> </div>
            <Footer />
        </>

    )
}
