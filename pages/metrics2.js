import { useState } from "react";
import NavBar from '../components/navbar';
import Head from 'next/head';
import dynamic from "next/dynamic";
const SimplePieChart = dynamic(import('../components/pie-match-service-county'),{ ssr: false });

export default function Metrics() {
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
      <SimplePieChart/>
    </>
  )
}
