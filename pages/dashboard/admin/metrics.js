import { useState } from "react";
import { useSession, getSession, signOut } from "next-auth/react";
import Head from "next/head";
import Navbar from "../../../components/dashboard/navbar";
import MatchTable from "../../../components/dashboard/match-table";
import NoMatchTable from "../../../components/dashboard/nomatch-table";
import EngangementTable from "../../../components/dashboard/engagement-table";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import getAuthUser from "../../../lib/get-auth-user";
import { getServerSession } from "next-auth/next";
import { authorizeRequest } from "../../../lib/authorize-request";
import executeQuery from "../../../lib/db";

export default function Metrics({ user, orgs }) {
  const { user: session, status } = useSession();
  const [userData] = useState(user);

  const [selectedComponent, setSelectedComponent] = useState("matchTable");

  const handleComponentChange = (event) => {
    setSelectedComponent(event.target.value);
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <p>Access Denied</p>;
  }

  return (
    <>
      <Head>
        <title>
          Metric Match Table &raquo; Chattanooga Unite - Veterans Resource
          Center
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar
        email={userData.user_email}
        name={userData.Organizations[0].name}
      />
      <Stack
        direction="row"
        spacing={1}
        sx={{ justifyContent: "center", mt: 10, mb: 2 }}
      >
        <Chip
          label="Matching Results"
          clickable
          color={selectedComponent === "matchTable" ? "primary" : "default"}
          onClick={() => setSelectedComponent("matchTable")}
        />
        <Chip
          label="Non Matching Results"
          clickable
          color={selectedComponent === "noMatchTable" ? "primary" : "default"}
          onClick={() => setSelectedComponent("noMatchTable")}
          sx={{}}
        />
        <Chip
          label="Engagement Results"
          clickable
          color={
            selectedComponent === "searchEngagement" ? "primary" : "default"
          }
          onClick={() => setSelectedComponent("searchEngagement")}
        />
      </Stack>
      {selectedComponent === "matchTable" && (<MatchTable orgs={orgs} />)}
      {selectedComponent === "noMatchTable" && <NoMatchTable />}
      {selectedComponent === "searchEngagement" && (<EngangementTable orgs={orgs} />)}
    </>
  );
}

export async function getServerSideProps(context) {
  const domain = process.env.DOMAIN;


  //console.log( orgs);
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
  // const res = await fetch(`${domain}/api/part-orgs`);
  // const orgs = await res.json();
  let orgs;
  if (!(await authorizeRequest(context.req, context.res, "admin"))) {
    console.log("Access denied to api/part-orgs user does not haver permission to access this route");
    // res.status(401).send("Access Denied")
  }
  else {
    const query = `SELECT sp.*, u.email FROM service_providers sp JOIN users u ON sp.owner_id = u.id`;

    const serviceProviders = await executeQuery({ query });

    // res.status(200).json(serviceProviders);
    orgs = JSON.parse(serviceProviders);
    // console.log(orgs);

  }

  return {
    props: {
      orgs,
      user,
      session,
    },
  };
}
