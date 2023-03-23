import { useSession, getSession, signOut } from "next-auth/react"
import Head from 'next/head';
import * as React from 'react';
import Navbar from '../../../components/dashboard/navbar';
import NoMatchTable from "../../../components/dashboard/metrics/nomatch-table";

export default function Dashboard() {
    const { data: session, status } = useSession()

    if (status === "loading") {
        return <p>Loading...</p>
    }

    if (status === "unauthenticated") {
        return <p>Access Denied</p>
    }
    return (
        <>
          <Head>
            <title>Metric No Match Table &raquo; Chattanooga Unite - Veterans Resource Center</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Navbar/>
          <NoMatchTable/>
        </>
      )
}
