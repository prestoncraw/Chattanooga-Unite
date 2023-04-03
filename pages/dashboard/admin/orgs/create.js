import { useSession } from "next-auth/react"
import { useState  } from "react";
import { getServerSession } from "next-auth/next"
import Head from 'next/head';
import * as React from 'react';
import Navbar from '../../../../components/dashboard/navbar';
import { Typography } from "@mui/material";

import getAuthUser from "../../../../lib/get-auth-user";

export default function Create({ user, session }) {
    const { status } = useSession();


    const [userData] = useState(user);

    if (status === "loading") {
        return <p>Loading...</p>
    }

    if (status === "unauthenticated") {
        return <p>Access Denied</p>
    }

    if (userData.is_admin != true) {
        return <p>Access denied.</p>
    }
    return (
        <>
            <Head>
                <title>Create New Organization &raquo; Admin Dashboard Chattanooga Unite</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar />

            <Typography variant="h2" component="div" style={{ mt: 8 }}>
                Dashboard Menu
            </Typography>

            <div>Fields for creating a new organization.</div>
        </>
    );
}

export async function getServerSideProps(context) {
    const session = await getServerSession(context.req, context.res);

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
            session
        },
    }
}