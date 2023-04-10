import { useSession, getSession, signOut } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import getAuthUser from "../../../../lib/get-auth-user";
import Head from "next/head";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import Button from "@mui/material/Button";
import FilterHdrIcon from "@mui/icons-material/FilterHdr";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Navbar from "../../../../components/dashboard/navbar";

const drawerWidth = 240;
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
function Org({ user }) {
const [userData] = useState(user);
  
  const [submit, sOpen] = useState(false);
  const submitOpen = () => sOpen(true);
  const submitClose = () => sOpen(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const insertServiceProvider = (
  ) => {
    fetch(
      `/api/add-service-provider?name=${name}&email=${email}`
    ).then((response) => response.json());
  };

  return (
    <>
      <Head>
        <title>
          Create Organization &raquo; Chattanooga Unite - Veterans Resource Center
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar
        email={userData.user_email}
        name={userData.Organizations[0].name}
      />
      <Toolbar />
      <main>
        <div className="centered">
          <Typography variant="h2">Create a Service Provider</Typography>
        </div>

        <br></br>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: { sm: `calc(100% - ${drawerWidth}px)` },
            }}
          >
            <Card sx={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)", mb: 2 }}>
              <Typography
                variant="h5"
                component="h2"
                align="center"
                sx={{ fontWeight: "bold", mt: 2 }}
              >
                Create Service Provider
              </Typography>
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-around",
                  gap: 2,
                }}
              >
                {/*Service Infromation Card*/}
                
                {/*Service Contact Card*/}
                <Card
                  sx={{
                    maxWidth: 500,
                    width: "100%",
                    backgroundColor: "#f7f7f7",
                  }}
                >
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      Service Provider Name
                    </Typography>
                    <TextField
                      sx={{ marginBottom: 4 }}
                      id="Name"
                      defaultValue="Enter Service Provider Name"
                      onChange={handleNameChange}
                      variant="standard"
                      fullWidth
                      multiline
                      rows={1}
                    />
                    <Typography variant="body2" color="text.secondary">
                      Auth0 Email
                    </Typography>
                    <TextField
                      sx={{ marginBottom: 4 }}
                      id="Email"
                      defaultValue="Enter email of Auth0 user you want to own this service provider"
                      onChange={handleEmailChange}
                      variant="standard"
                      fullWidth
                      multiline
                      rows={1}
                    />
                  </CardContent>
                </Card>

                {/*Service Counties and FIle Upload*/}


              </CardContent>
              <Stack direction="row" spacing={1} sx={{ mt: 4, ml: 11, mb: 1 }}>
                <Chip
                  label="Submit"
                  onClick={submitOpen}
                  icon={<SaveIcon />}
                  color="primary"
                  variant="outlined"
                  sx={{ marginBottom: 2 }}
                />
              </Stack>
              <Modal
                open={submit}
                onClose={submitClose}
                aria-labelledby="Changes"
                aria-describedby="lists the changes made in the editing process "
              >
                <Box sx={style}>
                  <Typography
                    id="Changes"
                    variant="h6"
                    component="h2"
                    align="center"
                  >
                    Changes Made
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemText primary="Service Name" secondary={name} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Email of Auth0 account" secondary={email} />
                    </ListItem>
                  </List>
                  <Button
                    onClick={() => {
                      insertServiceProvider();
                      submitClose();
                    }}
                    sx={{ mt: 2 }}
                  >
                    Submit
                  </Button>
                  <Typography>Note a page refresh is required to see changes</Typography>
                </Box>
              </Modal>
            </Card>
          </Box>
        </Box>
      </main>
    </>
  );

  // Render post...
}


export default Org;


export async function getServerSideProps(context) {
    const domain = process.env.DOMAIN;
  
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