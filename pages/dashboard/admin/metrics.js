import { useState } from "react";
import {
  useSession,
  getSession,
  signOut,
} from "next-auth/react";
import Head from "next/head";
import Navbar from "../../../components/dashboard/navbar";
import MatchTable from "../../../components/dashboard/match-table";
import NoMatchTable from "../../../components/dashboard/nomatch-table";
import EngangementTable from "../../../components/dashboard/engagement-table";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import getAuthUser from "../../../lib/get-auth-user";
import { getServerSession } from "next-auth/next";

export default function Metrics({ user, orgs }) {
  const { data: session, status } = useSession();
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
      <Navbar email={userData.user_email} name={userData.Organizations[0].name} />
      <Stack
        direction="row"
        spacing={1}
        sx={{ justifyContent: "center", mt: 10, mb: 2 }}
      >
        <Chip
          label="Match Table"
          clickable
          color={selectedComponent === "matchTable" ? "primary" : "default"}
          onClick={() => setSelectedComponent("matchTable")}
        />
        <Chip
          label="No Match Table"
          clickable
          color={selectedComponent === "noMatchTable" ? "primary" : "default"}
          onClick={() => setSelectedComponent("noMatchTable")}
          sx={{}}
        />
        <Chip
          label="Search Engagement Table"
          clickable
          color={
            selectedComponent === "searchEngagement" ? "primary" : "default"
          }
          onClick={() => setSelectedComponent("searchEngagement")}
        />
      </Stack>
      {selectedComponent === "matchTable" && <MatchTable />}
      {selectedComponent === "noMatchTable" && <NoMatchTable />}
      {selectedComponent === "searchEngagement" && (
        <EngangementTable orgs={orgs} />
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch("http://localhost:3000/api/part-orgs");
  const orgs = await res.json();
  console.log(typeof orgs);
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
      orgs,
      user,
      session,
    },
  };
}
