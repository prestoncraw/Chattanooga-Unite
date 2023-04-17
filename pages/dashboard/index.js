import { useSession } from "next-auth/react";
import { useState } from "react";
import { getServerSession } from "next-auth/next";
import Head from "next/head";
import { Container, Box } from "@mui/material";

import Navbar from "../../components/dashboard/navbar";
import AdminPanel from "../../components/dashboard/admin-panel";
import getAuthUser from "../../lib/get-auth-user";
import OrgPanel from "../../components/dashboard/org-panel";

export default function Dashboard({ user, session }) {
    const { status } = useSession();
    const [userData] = useState(user);

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    if (status === "unauthenticated") {
        return <p>Access Denied</p>;
    }
    const sharedStyles = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    };

    //   console;
    return (
        <>
            <Head>
                <title>Dashboard &raquo; Admin Dashboard Chattanooga Unite</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
                <Box sx={{ ...sharedStyles }}>
                    <Navbar
                        email={userData.user_email}
                    />
                    {userData.is_admin ? (<AdminPanel
                        sx={{ ...sharedStyles }}
                    />) : null}
                    {userData.Organizations && (
                        <OrgPanel
                            organizations={userData.Organizations}
                            sx={{ ...sharedStyles }}
                        />
                    )}
                </Box>
        </>
    );
}

export async function getServerSideProps(context) {
    const session = await getServerSession(context.req, context.res);

    if (!session) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }
    const user = await getAuthUser(session.user);

    return {
        props: {
            user,
            session,
        },
    };
}
