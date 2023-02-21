import { useState } from "react";
import NavBar from '../components/navbar';

import Head from 'next/head';

export default function FindHelp() {

    const [days, setDays] = useState(7);
    const [data, setData] = useState(null);
    const handleDayChange = (event) => {
        setDays(event.target.value);
        // fetch the matching SPs
        fetch(`/api/metric-search?days=${days}`)
            .then(response => response.json())
            .then(data => setData(data.data))
            console.log(data);   
    }    
    return (
        <>
            <Head>
                <title>Metrics &raquo; Chattanooga Unite - Veterans Resource Center</title>
                <link rel="icon" href="/favicon.ico" />

            </Head>
            <NavBar />
            <input type="text" onChange={handleDayChange}></input>
        </>
    )
}
