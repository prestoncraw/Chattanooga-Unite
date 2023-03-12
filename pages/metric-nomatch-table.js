import NavBar from '../components/dashboard/navbar-dash';
import Head from 'next/head';
import NoMatchTable from '../components/dashboard/metrics/nomatch-table';

export default function Metrics() {

  return (
    <>
      <Head>
        <title>Metrics &raquo; Chattanooga Unite - Veterans Resource Center</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar/>
      <NoMatchTable/>
    </>
  )
}
