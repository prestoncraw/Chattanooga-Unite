import { useSession } from "next-auth/react";
import { useState } from "react";
import { getServerSession } from "next-auth/next";
import Head from "next/head";
import { Typography, Container, Box } from "@mui/material";

import Navbar from "../../components/dashboard/navbar";
import DashboardComp from "../../components/dashboard/dashboard";
import getAuthUser from "../../lib/get-auth-user";
import AdminOptionsPanel from "../../components/dashboard/admin-options-panel";
import OrgPanel from "../../components/dashboard/org-panel";

export default function Dashboard({ user, session }) {
  const { data, status } = useSession();
  const [userData] = useState(user);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <p>Access Denied</p>;
  }
console
  return (
    <>
      <Head>
        <title>Dashboard &raquo; Admin Dashboard Chattanooga Unite</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Navbar email={userData.user_email} name={userData.Organizations[0].name} />
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <DashboardComp
              name={userData.Organizations[0].name}
              orgId={userData.Organizations[0].id}
            />
          </Box>
        </Container>
      </Box>
      {userData.is_admin==true && <AdminOptionsPanel />}
            <OrgPanel organizations={userData.Organizations}></OrgPanel>
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