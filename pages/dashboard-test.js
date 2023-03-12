import Head from 'next/head';
import Navbar from '../components/dashboard/navbar-dash';
import Drawer from "../components/dashboard/drawer-dashboard";

export default function Metrics() {
  return (
    <>
      <Head>
        <title>Metrics &raquo; Chattanooga Unite - Veterans Resource Center</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Drawer />
    </>
  );
}
