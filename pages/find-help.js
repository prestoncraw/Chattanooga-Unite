import Head from 'next/head';
import executeQuery from '../lib/db';
import NavBar from '../components/navbar'
import Footer from '../components/footer';
import React, { useState, useEffect } from 'react';
import Router from 'next/router';


export default function FindHelp({ serviceProviders }) {
  const SELECTED_OPTION_INITIAL_STATE = {
    service: '',
    county: '',
  };
  const [selectedOption, setSelectedOption] = useState(SELECTED_OPTION_INITIAL_STATE);

  const handleServiceChange = (event) => {
    setSelectedOption({
      ...selectedOption,
      service: event.target.value,
    });
  };

  const handleCountyChange = (event) => {
    setSelectedOption({
      ...selectedOption,
      county: event.target.value,
    });
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
        <title>Find Help &raquo; Chattanooga Unite - Veterans Resource Center</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <NavBar />
        <div>Welcome to the Find Help (services provided) page</div>
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
                    <option value="Bradley">Bradley</option>
                    <option value="Catoosa">Catoose</option>
                    <option value="Bledsoe">Bledsoe</option>
                    <option value="Hamilton">Hamilton</option>
                    <option value="Marion">Marion</option>
                    <option value="McMinn">McMinn</option>
                    <option value="Meigs">Meigs</option>
                    <option value="Polk">Polk</option>
                    <option value="Rhea">Rhea</option>
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
        <p>Website: {serviceProvider.website_url}</p>
      </div>
    ))
  }
</div>
      </main>
      <Footer />
    </>
  );
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
    