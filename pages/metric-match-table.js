import Head from 'next/head';
import Navbar from '../components/dashboard/navbar-dash';
import MatchTable from "../components/dashboard/metrics/match-table";


export default function Metrics() {

  return (
    <>
      <Head>
        <title>Metrics &raquo; Chattanooga Unite - Veterans Resource Center</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar/>
      <MatchTable/>
    </>
  )
}
