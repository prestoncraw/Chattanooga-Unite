import Head from 'next/head';
import Navbar from '../components/navbarDash';
import MatchTable from "../components/match-table";


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
