import NavBar from '../components/navbar-dash';
import Head from 'next/head';
import dynamic from "next/dynamic";
const MatchTable = dynamic(import('../components/nomatch-table'),{ ssr: false });

export default function Metrics() {

  return (
    <>
      <Head>
        <title>Metrics &raquo; Chattanooga Unite - Veterans Resource Center</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar/>
      <MatchTable/>
    </>
  )
}
