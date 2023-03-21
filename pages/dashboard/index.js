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

import getAuthUser from "../../lib/get-auth-user";
import AdminOptionsPanel from "../../components/dashboard/admin-options-panel";
import OrgPanel from "../../components/dashboard/org-panel";

export default function Dashboard({ user, session, data }) {
    const { status } = useSession();


    const [userData] = useState(user);

    if (status === "loading") {
        return <p>Loading...</p>
    }

    if (status === "unauthenticated") {
        return <p>Access Denied</p>
    }
    const org_data = JSON.parse(data.data);
   
    return (
        <>
            <Head>
                <title>Dashboard Home &raquo; Admin Dashboard Chattanooga Unite</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar />
             <DashboardComp
             name= {org_data[0].name}
             orgId ={org_data[0].id}
            /> 
            {/* <div>You are logged in as {userData.user_email}</div> */}

            {/*userData.is_admin==true && <AdminOptionsPanel />*/}
            {/*<OrgPanel organizations={userData.Organizations}></OrgPanel>*/}
        </>
    );
}

export async function getServerSideProps(context) {
    const session = await getServerSession(context.req, context.res);
    const res = await fetch(`http://localhost:3000/api/get-org?sp_id=${1}`);
    const data = await res.json();

    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }
    const user = await getAuthUser(session.user);

    return {
        props: {
            user,
            session,
            data
        },
    }
}