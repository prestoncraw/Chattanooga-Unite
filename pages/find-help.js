import { services, counties } from "../lib/services-provided";
import styles from '../styles/FindHelp.module.css';
import { useEffect, useState } from "react";
import NavBar from '../components/navbar';
import Footer from '../components/footer';
import SPPreview from "../components/sp-preview";
import Head from 'next/head';
import { useRouter } from "next/router";
import AccessibilityMenu from '../components/accessibility-menu';

export default function FindHelp() {
    // three states the page can be in:
    // service selection, county selection, and result
    const router = useRouter();
    const [step, setStep] = useState('service');
    const [service, setService] = useState(null);
    const [service_name, setServiceName] = useState(null)
    const [county, setCounty] = useState(null);
    const [county_name, setCountyName] = useState(null);
    const [serviceProviders, setServiceProviders] = useState([]);

    useEffect(() => {
        //console.log(`CURRENT APP STATE:\nSERVICE_ID: ${service}\nCOUNTY_ID: ${county}`);

        // change to make it match with only valid options
       // console.log(`router:${router.query.service},expected: !null, ${router.query.service != null} || ${router.query.service} expected: "" ${router.query.service != ""} && state_service:${service}, expected: null ${service == null}`);
        if ((router.query.service != null && router.query.service != "") && service == null) {
            // need to be able to get service id from service name
            // also need to ensure a valid value is passed ?? maybe, maybe not if it just doesnt return results.. idk
            // const service_id = getServiceIdFromName(router.query.service)

            // router:undefined,expected: null undefinedexpected: "" &&  state_service:null, expected: null

            handleServiceChange(1, router.query.service);

         //   console.log(`router:${router.query.county},expected: !null, ${router.query.county != null} || ${router.query.county} expected: !"" ${router.query.county != ""} && state_county:${county}, expected: null ${county == null}`);
            
            if ((router.query.county != null && router.query.county != "") && county == null) {
                handleCountyChange(1, router.query.county);
            }
        }
        else {
            // setService(null);
        }


        // setServiceName(null);
        // setCounty(null);
        // setCountyName(null);
        // setStep('service');
    });

    const handleServiceChange = (service, service_name) => {
        setService(service);
        setServiceName(service_name);
        if (router.query.service == null || router.query.service == "") {
            router.query.service = service_name;
            router.push(router);
        } 
        
        setStep('county');
    }
    const handleCountyChange = (county, county_name) => {
        setCounty(county);
        setCountyName(county_name);

        if (router.query.county == null || router.query.county == "") {
            router.query.county = county_name;
            router.push(router);
        } 

        // fetch the matching SPs
        fetch(`/api/find-help?service_id=${service}&county_id=${county}`)
            .then(response => response.json())
            .then(data => setServiceProviders(data.data))
            .then(() => setStep('result'));
    }
    const handleResultChange = () => {
        router.query.county = null;
        router.query.service = null;
        router.push(router);
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
                    content="/images/chattanooga-unite-logo.jpg"
                />
            </Head>
            <NavBar />
            <div className={styles.container}>

                {step === 'service' && <h1>What do you need assistance with?</h1>}
                {step === 'county' && <h1>In which county do you reside?</h1>}
                {step === 'result' && <h1>These organizations can provide assistance</h1>}

                <div className={styles.break}> </div>
                <div className={styles.content_container}>
                    {step === 'service' && services.map(s => <div className={styles.select_box} key={s.id} onClick={() => handleServiceChange(s.id, s.title)}><div className={styles.select_box_img}><div className={s.icon}></div></div><div className={styles.select_box_text}>{s.title}</div></div>)}
                    {step === 'county' && counties.map(county => <div className={styles.select_box} key={county.id} onClick={() => handleCountyChange(county.id, county.name)}><div className={styles.select_box_img}><svg viewBox={"0 0 " + county.svg_w + " " + county.svg_h}><path d={county.svg_path}></path><title>{county.alt}</title></svg></div><div className={styles.select_box_text}>{county.name}</div></div>)}

                    {(step === 'result' && Object.values(JSON.parse(serviceProviders)).length == 0) && <div className={styles.noServiceWarn}>Selected service not available in selected county.</div>}

                    {step === 'result' && Object.values(JSON.parse(serviceProviders)).map(sp => <SPPreview key={sp.id} provider={sp} service_id={service} county_id={county} />)}
                </div>

                <div className={styles.options_container}>
                    {step === 'result' && <div className={styles.results_text}>Showing results for <span className={styles.bold}>{service_name}</span> in <span className={styles.bold}>{county_name}</span> county</div>}
                    {step === 'result' && <div className={styles.button} onClick={handleResultChange}>New search →</div>}
                </div>

            </div>
            <div className={styles.break}> </div>
            <AccessibilityMenu />
            <Footer />
        </>

    )
}

// check query parameters for counties or services already provided 
export async function getServerSideProps(context) {
    return {
      props: {}, // will be passed to the page component as props
    }
  }
