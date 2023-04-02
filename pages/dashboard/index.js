import { useSession } from "next-auth/react";
import { useState } from "react";
import { getServerSession } from "next-auth/next";
import Head from "next/head";
import { Typography, Container, Box } from "@mui/material";

import Navbar from "../../components/dashboard/navbar";
import AdminPanel from "../../components/dashboard/admin-panel";
import getAuthUser from "../../lib/get-auth-user";
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
  const sharedStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  console;
  return (
    <>
      <Head>
        <title>Dashboard &raquo; Admin Dashboard Chattanooga Unite</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {userData.is_admin && (
        <Box sx={{ ...sharedStyles }}>
          <Navbar
            email={userData.user_email}
            name={userData.Organizations[0].name}
          />
          <Container maxWidth="lg">
            <Box sx={{ ...sharedStyles, gap: 0 }}>
              <AdminPanel
                name={userData.Organizations[0].name}
                orgId={userData.Organizations[0].id}
                sx={{ ...sharedStyles }}
              />
            </Box>
          </Container>
        </Box>
      )}
      {userData.Organizations && (
        <Box sx={{ ...sharedStyles }}>
            <Navbar
            email={userData.user_email}
            name={userData.Organizations[0].name}
          />
          <Box sx={{ ...sharedStyles, gap: 0 }}>
            <OrgPanel
              organizations={userData.Organizations}
              sx={{ ...sharedStyles }}
            />
          </Box>
        </Box>
      )}
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
