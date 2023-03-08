import { useState } from "react";
import NavBar from '../components/navbar';
import Head from 'next/head';
import dynamic from "next/dynamic";
const SimplePieChart = dynamic(
        import('../components/simple-pie-chart'),
        { ssr: false }
    );

export default function FindHelp() {
  const [days, setDays] = useState(7);
  const [data, setData] = useState(null);

  const handleDayChange = (event) => {
    const newDays = event.target.value;
    setDays(newDays);
    // fetch the matching SPs
    fetch(`/api/metric-search?days=${newDays}`)
      .then(response => response.json())
      .then(data => setData(data.data))
  }

  return (
    <>
      <Head>
        <title>Metrics &raquo; Chattanooga Unite - Veterans Resource Center</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <input type="text" value={days} onChange={handleDayChange}></input>
      <SimplePieChart />
      <SimplePieChart/>
      {data && data.map((item, index) => (
        <div key={index}>
          <p>Timestamp: {item.search_timestamp}</p>
          <p>County ID: {item.county_id}</p>
          <p>Service ID: {item.service_id}</p>
          <p>Found match: {item.found_match}</p>
        </div>
      ))}
    </>
  )
}
