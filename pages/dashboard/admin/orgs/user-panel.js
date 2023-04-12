import { useSession } from "next-auth/react"
import { useState  } from "react";
import { getServerSession } from "next-auth/next"
import Head from 'next/head';
import * as React from 'react';
import Navbar from '../../../../components/dashboard/navbar';
import { Typography } from "@mui/material";
import UserTable from '../../../../components/dashboard/user-panel';

import getAuthUser from "../../../../lib/get-auth-user";

export default function Activity({ user, session }) {
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
                <title>User Panel &raquo; Admin Dashboard Chattanooga Unite</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Typography variant="h2" component="div" style={{ mt: 8 }}>
                Users
            </Typography>

            <Navbar />
            <UserTable />
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