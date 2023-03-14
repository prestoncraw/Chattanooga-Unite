import { useSession, getSession, signOut } from "next-auth/react"
import Head from 'next/head';
import * as React from 'react';
import Navbar from '../../components/dashboard/navbar';
import DashboardComp from '../../components/dashboard/dashboard';
import { Typography } from "@mui/material";

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
            <title>Metrics &raquo; Chattanooga Unite - Veterans Resource Center</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Navbar/>
          <Typography variant="h3" component="div" style={{ mt: 8 }}>
            Metric Menu
          </Typography>
          <DashboardComp/>
          <div>You are logged in as {session.user.email}</div>
        </>
      );
}
