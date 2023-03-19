import { useSession, getSession, signOut } from "next-auth/react"
import { useState, useEffect } from "react";
// import { authOptions } from 'pages/api/auth/[...nextauth]'
import { getServerSession } from "next-auth/next"
import SPPreview from "../../components/sp-preview";
import Head from 'next/head';
import * as React from 'react';
import Navbar from '../../components/dashboard/navbar';
import DashboardComp from '../../components/dashboard/dashboard';
import { Typography } from "@mui/material";

export default function Dashboard({data}) {
    const { data: session, status } = useSession();


    const [userData, setUserData] = useState(JSON.parse(data.data)[0])

    if (status === "loading") {
        return <p>Loading...</p>
    }

    if (status === "unauthenticated") {
        return <p>Access Denied</p>
    }
    return (
        <>
          <Head>
            <title>Dashboard &raquo; Chattanooga Unite - Veterans Resource Center</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Navbar/>
          <Typography variant="h3" component="div" style={{ mt: 8 }}>
            Metric Menu
          </Typography>
          <DashboardComp/>
          <div>You are logged in as {session.user.email}</div>
          <a href={"/dashboard/org/"+ userData.id}>Edit your Organization</a>
        </>
      );
}

export async function getServerSideProps(context) {
    const session = await getServerSession(context.req, context.res);
    console.log(session.user.email);
    const res = await fetch(`http://localhost:3000/api/get-sp?sp_email=${session.user.email}`);
    const data = await res.json();

    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    return {
        props: {
            data
        },
    }
}