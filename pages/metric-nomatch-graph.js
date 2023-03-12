import { useState } from "react";
import Head from 'next/head';
import Navbar from '../components/navbarDash';
import NoMatchTable from "../components/nomatch-table";


export default function Metrics() {

  return (
    <>
      <Head>
        <title>Metrics &raquo; Chattanooga Unite - Veterans Resource Center</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar/>
      <NoMatchTable/>
    </>
  )
}
