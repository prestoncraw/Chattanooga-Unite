import Head from 'next/head';
import executeQuery from '../lib/db';
import NavBar from '../components/navbar';
import Footer from '../components/footer';
import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function FindHelp({ serviceProviders }) {
    const SELECTED_OPTION_INITIAL_STATE = {
        service: 'Advocacy',
        county: 'Bledsoe',
      };
      const [selectedOption, setSelectedOption] = useState(SELECTED_OPTION_INITIAL_STATE);
    
      const handleServiceChange = (event) => {
        setSelectedOption({
          ...selectedOption,
          service: event.target.value,
        });
        document.getElementById("resources").style.display = "none";
        document.getElementById("counties").style.display = "block";
        
      };
    
      const handleCountyChange = (event) => {
        setSelectedOption({
          ...selectedOption,
          county: event.target.value,
        });
        document.getElementById("counties").style.display = "none";
        handleFormSubmit;
      };
    
      const handleFormSubmit = (event) => {
        event.preventDefault();
        Router.push({
          pathname: '/find-help',
          query: {
            service: selectedOption.service,
            county: selectedOption.county
          }
        });
      };
    
    return (
        <>
            <Head>
                <title>Contact us &raquo; Chattanooga Unite - Veterans Resource Center</title>
                <link rel="icon" href="/favicon.ico" />
                <script src="https://kit.fontawesome.com/8e69a0977a.js" crossorigin="anonymous"></script>
            </Head>
            <main>
            <NavBar/>
              <div className={styles.grayBackground}>
                <form onSubmit={handleFormSubmit}>
                  <div id="resources">
                    <label className={styles["title_dark"] + " " + styles["centered"]} htmlFor="service">What Can We Help You With?</label>
                    <div name="service" id="service" onClick={handleServiceChange} value={selectedOption.service}>
                      <div className={styles.cards_container}>
                        <div value="Advocacy" className={styles.square_box}><span className={styles.square_icon}><i class="fa-solid fa-handshake-angle"></i></span><span className={styles.square_content}>Benefits</span></div>
                        <div value="Benefits" className={styles.square_box}><span className={styles.square_icon}><i class="fa-solid fa-shirt"></i></span><span className={styles.square_content}>Clothing</span></div>
                        <div value="Clothing" className={styles.square_box}><span className={styles.square_icon}><i class="fa-solid fa-tooth"></i></span><span className={styles.square_content}>Dental</span></div>
                        <div value="Dental" className={styles.square_box}><span className={styles.square_icon}><i class="fa-solid fa-graduation-cap"></i></span><span className={styles.square_content}>Education</span></div>
                        <div value="Education" className={styles.square_box}><span className={styles.square_icon}><i class="fa-solid fa-briefcase"></i></span><span className={styles.square_content}>Employment</span></div>
                        <div value="Food" className={styles.square_box}><span className={styles.square_icon}><i class="fa-solid fa-utensils"></i></span><span className={styles.square_content}>Food</span></div>
                        <div value="Housing" className={styles.square_box}><span className={styles.square_icon}><i class="fa-solid fa-house-user"></i></span><span className={styles.square_content}>Housing</span></div>
                        <div value="Memorial and Burial" className={styles.square_box}><span className={styles.square_icon}><i class="fa-solid fa-monument"></i></span><span className={styles.square_content}>Memorial and Burial</span></div>
                        <div value="Theraputic Recreation" className={styles.square_box}><span className={styles.square_icon}><i class="fa-solid fa-person-swimming"></i></span><span className={styles.square_content}>Theraputic Recreation</span></div>
                        <div value="Transportation" className={styles.square_box}><span className={styles.square_icon}><i class="fa-solid fa-car-side"></i></span><span className={styles.square_content}>Transportation</span></div>
                        <div value="Utility" className={styles.square_box}><span className={styles.square_icon}><i class="fa-solid fa-faucet-drip"></i></span><span className={styles.square_content}>Utility</span></div>
                        <div value="Other" className={styles.square_box}><span className={styles.square_icon}><i class="fa-solid fa-circle-question"></i></span><span className={styles.square_content}>Other</span></div>
                      </div>
                    </div>
                  </div>
                  <div id="counties" style={{display: "none"}}>
                    <label className={styles.title} htmlFor="county">Choose a county:</label>
                    <div name="county" id="county" onClick={handleCountyChange} value={selectedOption.county}>
                      <div className={styles.cards_container}>
                        <div value="Bledsoe" className={styles.square_box}><span className={styles.square_icon}><i class="fa-solid fa-b"></i></span><span className={styles.square_content}>Bledsoe</span></div>
                        <div value="Bradley" className={styles.square_box}><span className={styles.square_icon}><i class="fa-solid fa-b"></i></span><span className={styles.square_content}>Bradley</span></div>
                        <div value="Catoosa" className={styles.square_box}><span className={styles.square_icon}><i class="fa-solid fa-c"></i></span><span className={styles.square_content}>Catoosa</span></div>
                        <div value="Dade" className={styles.square_box}><span className={styles.square_icon}><i class="fa-solid fa-d"></i></span><span className={styles.square_content}>Dade</span></div>
                        <div value="Dekalb" className={styles.square_box}><span className={styles.square_icon}><i class="fa-solid fa-d"></i></span><span className={styles.square_content}>Dekalb</span></div>
                        <div value="Grundy" className={styles.square_box}><span className={styles.square_icon}><i class="fa-solid fa-g"></i></span><span className={styles.square_content}>Grundy</span></div>
                        <div value="Hamilton" className={styles.square_box}><span className={styles.square_icon}><i class="fa-solid fa-h"></i></span><span className={styles.square_content}>Hamilton</span></div>
                        <div value="Jackson" className={styles.square_box}><span className={styles.square_icon}><i class="fa-solid fa-j"></i></span><span className={styles.square_content}>Jackson</span></div>
                        <div value="Marion" className={styles.square_box}><span className={styles.square_icon}><i class="fa-solid fa-m"></i></span><span className={styles.square_content}>Marion</span></div>
                        <div value="McMinn" className={styles.square_box}><span className={styles.square_icon}><i class="fa-solid fa-m"></i></span><span className={styles.square_content}>McMinn</span></div>
                        <div value="Murray" className={styles.square_box}><span className={styles.square_icon}><i class="fa-solid fa-m"></i></span><span className={styles.square_content}>Murray</span></div>
                        <div value="Polk" className={styles.square_box}><span className={styles.square_icon}><i class="fa-solid fa-p"></i></span><span className={styles.square_content}>Polk</span></div>
                        <div value="Rhea" className={styles.square_box}><span className={styles.square_icon}><i class="fa-solid fa-r"></i></span><span className={styles.square_content}>Rhea</span></div>
                        <div value="Sequatchie" className={styles.square_box}><span className={styles.square_icon}><i class="fa-solid fa-s"></i></span><span className={styles.square_content}>Sequatchie</span></div>
                        <div value="Walker" className={styles.square_box}><span className={styles.square_icon}><i class="fa-solid fa-w"></i></span><span className={styles.square_content}>Walker</span></div>
                        <div value="Whitfield" className={styles.square_box}><span className={styles.square_icon}><i class="fa-solid fa-w"></i></span><span className={styles.square_content}>Whitfield</span></div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              <form onSubmit={handleFormSubmit}>
            <div>
                <label htmlFor="service">Choose a service:</label>
                <select name="service" id="service" onChange={handleServiceChange} value={selectedOption.service}>
                    <option value="Advocacy">Advocacy</option>
                    <option value="Benefits">Benefits</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Education">Education</option>
                    <option value="Employment">Employment</option>
                    <option value="Food">Food</option>
                    <option value="Health Care">Health Care</option>
                    <option value="Housing">Housing</option>
                    <option value="Memorial and Burial Benefits">Memorial and Burial Benefits</option>
                    <option value="Other">Other</option>
                    <option value="Therapeutic Recreation">Therapeutic Recreation</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Utility Assistance">Utility Assistance</option>
                </select>
            </div>
            <div>
                <label htmlFor="county">Choose a county:</label>
                <select name="county" id="county" onChange={handleCountyChange} value={selectedOption.county}>
                    <option value="Bledsoe">Bledsoe</option>
                    <option value="Bradley">Bradley</option>
                    <option value="Catoosa">Catoosa</option>
                    <option value="Dade">Dade</option>
                    <option value="Dekalb">Dekalb</option>
                    <option value="Grundy">Grundy</option>
                    <option value="Hamilton">Hamilton</option>
                    <option value="Jackson">Jackson</option>
                    <option value="Marion">Marion</option>
                    <option value="McMinn">McMinn</option>
                    <option value="Meigs">Meigs</option>
                    <option value="Murray">Murray</option>
                    <option value="Polk">Polk</option>
                    <option value="Rhea">Rhea</option>
                    <option value="Sequatchie">Sequatchie</option>
                    <option value="Walker">Walker</option>
                    <option value="Whitfield">Whitfield</option>
                    </select>
            </div>
            <button type="submit">Submit</button>
        </form>
        <div>
  {
   Object.values(JSON.parse(serviceProviders)).map((serviceProvider, index) => (
    <div key={index}>
      <h2>{serviceProvider.name}</h2>
      <p>Address: {serviceProvider.address}</p>
      <p>Description: {serviceProvider.description}</p>
      <p>Phone Number: {serviceProvider.contact_phone_number}</p>
      <p>Contact Email: {serviceProvider.contact_email}</p>
      <p>Phone: {serviceProvider.login_email}</p>
      <p>Website: <a className={styles.websiteurl}href={serviceProvider.website_url}>{serviceProvider.website_url}</a></p>
    </div>
  ))
  
  }
</div>
<Footer></Footer>
            </main>
            

        </>

    )
}

export async function getServerSideProps(context) {
    const { service, county } = context.query;

   const query = `
   SELECT sp.* FROM service_providers sp JOIN sp_services s ON sp.id = s.service_provider_id 
   JOIN sp_counties c ON sp.id = c.service_provider_id 
   JOIN service se ON s.service_id = se.id JOIN county co ON c.county_id = co.id 
   WHERE se.title = '${service}' AND co.name = '${county}'`;
        console.log('Query:', query);
        const values = []
        const serviceProviders = await executeQuery({query, values});      
    console.log(serviceProviders)
    return {
        props: {
            serviceProviders,
        },
    };
}