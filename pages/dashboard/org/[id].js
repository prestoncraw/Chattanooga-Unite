import { useRouter } from "next/router";
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
import { getServerSession } from "next-auth/next";
import getAuthUser from "../../../lib/get-auth-user";
import Navbar from "../../../components/dashboard/navbar";
import { authorizeRequest } from "../../../lib/authorize-request";
import executeQuery from "../../../lib/db";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

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

const counties = [
  { id: 1, name: "Bradley" },
  { id: 2, name: "Catoosa" },
  { id: 3, name: "Dekalb" },
  { id: 4, name: "Grundy" },
  { id: 5, name: "Bledsoe" },
  { id: 6, name: "Dade" },
  { id: 7, name: "Hamilton" },
  { id: 8, name: "Jackson" },
  { id: 9, name: "Marion" },
  { id: 10, name: "McMinn" },
  { id: 11, name: "Meigs" },
  { id: 12, name: "Murray" },
  { id: 13, name: "Polk" },
  { id: 14, name: "Rhea" },
  { id: 15, name: "Sequatchie" },
  { id: 16, name: "Walker" },
  { id: 17, name: "Whitfield" },
];

const services = [
  { id: 1, name: "Advocacy" },
  { id: 2, name: "Benefits" },
  { id: 3, name: "Clothing" },
  { id: 4, name: "Dental" },
  { id: 5, name: "Education" },
  { id: 6, name: "Employment" },
  { id: 7, name: "Food" },
  { id: 8, name: "Health Care" },
  { id: 9, name: "Housing" },
  { id: 10, name: "Memorial and Burial Benefits" },
  { id: 11, name: "Other" },
  { id: 12, name: "Therapeutic Recreation" },
  { id: 13, name: "Transportation" },
  { id: 14, name: "Utility Assistance" },
];

function getCounties(county, countyName, theme) {
  return {
    fontWeight:
      countyName.indexOf(county) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
function getServices(service, serviceName, serviceTheme) {
  return {
    fontWeight:
      serviceName.indexOf(service) === -1
        ? serviceTheme.typography.fontWeightRegular
        : serviceTheme.typography.fontWeightMedium,
  };
}
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
function Org({ data, user, servedCounties, servedServices }) {
  const router = useRouter();

  const org_data = data;
  const countyTheme = useTheme();
  const serviceTheme = useTheme();
  const [submit, sOpen] = useState(false);
  const submitOpen = () => sOpen(true);
  const submitClose = () => sOpen(false);
  const [clear, cOpen] = useState(false);
  const clearOpen = () => cOpen(true);
  const clearClose = () => cOpen(false);
  const [name, setName] = useState(org_data[0].name);
  const [address, setAddress] = useState(org_data[0].address);
  const [contact_email, setContactEmail] = useState(org_data[0].contact_email);
  const [phone_number, setPhoneNumber] = useState(
    org_data[0].contact_phone_number
  );
  const [website_url, setWebsiteUrl] = useState(org_data[0].website_url);
  const [description, setDescription] = useState(org_data[0].description);
  const [selectedCountyId, setSelectedCountyId] = useState();
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const uniqueServiceIds = Array.from(
    new Set(servedCounties.map(({ county_id }) => county_id))
  ); // I know these values seem backwards... couldnt trace down the issue before turning in the project
  const uniqueCountyIds = Array.from(
    new Set(servedServices.map(({ service_id }) => service_id))
  ); // I know these values seem backwards... couldnt trace down the issue before turning in the project

  const uniqueCountyNames = uniqueCountyIds.map((id) => {
    const county = counties.find((county) => county.id === id);
    return county ? county.name : null;
  });

  const [countyName, setCountyName] = useState(uniqueCountyNames);

  const uniqueServiceNames = uniqueServiceIds.map((id) => {
    const service = services.find((service) => service.id === id);
    return service ? service.name : null;
  });
  const [serviceName, setServiceName] = useState(uniqueServiceNames);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleWebsiteUrlChange = (event) => {
    setWebsiteUrl(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleContactEmailChange = (event) => {
    setContactEmail(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const resetEntries = () => {
    setName(org_data[0].name);
    setAddress(org_data[0].address);
    setContactEmail(org_data[0].contact_email);
    setPhoneNumber(org_data[0].contact_phone_number);
    setWebsiteUrl(org_data[0].website_url);
    setDescription(org_data[0].description);
    setCountyName([]);
    setServiceName([]);
  };

  const handleCountyChange = (event) => {
    const {
      target: { value },
    } = event;
    setCountyName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    const selectedCountyIds = countyName.map((name) => {
      const selectedCounty = counties.find((county) => county.name === name);
      return selectedCounty ? selectedCounty.id : null;
    });
    setSelectedCountyId(selectedCountyIds.filter((id) => id !== null));
    // console.log(selectedCountyId);
  };

  const handleServiceChange = (event) => {
    const { value } = event.target;
    setServiceName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    const selectedServiceIds = serviceName.map((name) => {
      const selectedService = services.find((service) => service.name === name);
      return selectedService ? selectedService.id : null;
    });
    setSelectedServiceId(selectedServiceIds.filter((id) => id !== null));
    // console.log(selectedServiceId);
  };

  useEffect(() => {
    const selectedCountyIds = countyName.map((name) => {
      const selectedCounty = counties.find((county) => county.name === name);
      return selectedCounty ? selectedCounty.id : null;
    });
    setSelectedCountyId(selectedCountyIds.filter((id) => id !== null));
  }, [countyName, counties]);

  useEffect(() => {
    const selectedServiceIds = serviceName.map((name) => {
      const selectedService = services.find((service) => service.name === name);
      return selectedService ? selectedService.id : null;
    });
    setSelectedServiceId(selectedServiceIds.filter((id) => id !== null));
  }, [serviceName, services]);

  //console.log(selectedServiceId);
  console.log(selectedCountyId);
  const updateServiceProvider = (
    name,
    website_url,
    description,
    address,
    contact_phone_number,
    contact_email
  ) => {
    fetch(
      `/api/update-service-provider?logo_url=${""}&name=${name}&description=${description}&contact_phone_number=${contact_phone_number}&contact_email=${contact_email}&website_url=${website_url}&address=${address}&id=${
        org_data[0].id
      }`
    ).then((response) => response.json());

    fetch(
      `/api/update-service-county?sp_id=${org_data[0].id}&service_id=${selectedServiceId}&county_id=${selectedCountyId}`
    ).then((response) => {
      if (response.status === 200) {
        setSnackbarSeverity("success");
        setSnackbarMessage("Organization updated created.");
      } else {
        setSnackbarSeverity("error");
        setSnackbarMessage("Error occurred while updating organization.");
      }
      setSnackbarOpen(true);
      return response.json();
    });
  };
  const [userData] = useState(user);
  console.log("this is servedCounties", servedCounties);
  console.log("this is servedServices", servedServices);
  return (
    <>
      <Head>
        <title>
          Edit Organization &raquo; Chattanooga Unite - Veterans Resource Center
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
          <Typography variant="h2">{org_data[0].name}</Typography>
          <div>
            <a href={"/orgs/" + org_data[0].id} target="_blank">
              View {org_data[0].name}'s public page here ↗
            </a>
          </div>
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
                Edit Service
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
                <Card
                  sx={{
                    maxWidth: 350,
                    width: "100%",
                    backgroundColor: "#f7f7f7",
                  }}
                >
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      Service Name
                    </Typography>
                    <TextField
                      sx={{ marginBottom: 4 }}
                      id="Service Name"
                      onChange={handleNameChange}
                      value={name}
                      variant="standard"
                      fullWidth
                      multiline
                      rows={1}
                    />
                    <Typography variant="body2" color="text.secondary">
                      Service Description
                    </Typography>
                    <TextField
                      sx={{ marginBottom: 4 }}
                      id="Service Description"
                      onChange={handleDescriptionChange}
                      value={description}
                      variant="standard"
                      fullWidth
                      multiline
                      rows={3}
                    />
                    <Typography variant="body2" color="text.secondary">
                      Url
                    </Typography>
                    <TextField
                      sx={{ marginBottom: 4 }}
                      id="Url"
                      value={website_url}
                      onChange={handleWebsiteUrlChange}
                      variant="standard"
                      fullWidth
                      multiline
                      rows={1}
                    />
                  </CardContent>
                </Card>
                {/*Service Contact Card*/}
                <Card
                  sx={{
                    maxWidth: 350,
                    width: "100%",
                    backgroundColor: "#f7f7f7",
                  }}
                >
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      Service Email
                    </Typography>
                    <TextField
                      sx={{ marginBottom: 4 }}
                      id="Service Email"
                      value={contact_email}
                      onChange={handleContactEmailChange}
                      variant="standard"
                      fullWidth
                      multiline
                      rows={1}
                    />
                    <Typography variant="body2" color="text.secondary">
                      Service Phone Number
                    </Typography>
                    <TextField
                      sx={{ marginBottom: 4 }}
                      id="Service Phone Number"
                      value={phone_number}
                      onChange={handlePhoneNumberChange}
                      variant="standard"
                      fullWidth
                      multiline
                      rows={1}
                    />
                    <Typography variant="body2" color="text.secondary">
                      Service Address
                    </Typography>
                    <TextField
                      sx={{ marginBottom: 4 }}
                      id="Service Address"
                      value={address}
                      onChange={handleAddressChange}
                      variant="standard"
                      fullWidth
                      multiline
                      rows={3}
                    />
                  </CardContent>
                </Card>

                {/*Service Counties and FIle Upload*/}
                <Card
                  sx={{
                    maxWidth: 350,
                    width: "100%",
                    backgroundColor: "#f7f7f7",
                  }}
                >
                  <CardContent>
                    {/*Service Counties*/}
                    <Typography variant="body2" color="text.secondary">
                      Serviced Counties
                    </Typography>
                    <div>
                      <FormControl sx={{ m: 1, width: 275 }}>
                        <InputLabel id="demo-multiple-chip-label">
                          County
                        </InputLabel>
                        <Select
                          labelId="demo-multiple-chip-label"
                          id="demo-multiple-chip"
                          multiple
                          value={countyName}
                          onChange={handleCountyChange}
                          input={
                            <OutlinedInput
                              id="select-multiple-chip"
                              label="Chip"
                            />
                          }
                          renderValue={(selected) => (
                            <Box
                              sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 0.5,
                              }}
                            >
                              {selected.map((value) => (
                                <Chip key={value} label={value} />
                              ))}
                            </Box>
                          )}
                          MenuProps={MenuProps}
                        >
                          {counties.map((county) => (
                            <MenuItem
                              key={county.id}
                              value={county.name}
                              style={getCounties(
                                county,
                                countyName,
                                countyTheme
                              )}
                            >
                              {county.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                    {/*Services*/}
                    <Typography variant="body2" color="text.secondary">
                      Services Provided
                    </Typography>
                    <div>
                      <FormControl sx={{ m: 1, width: 275 }}>
                        <InputLabel id="demo-multiple-chip-label">
                          Services
                        </InputLabel>
                        <Select
                          labelId="demo-multiple-chip-label"
                          id="demo-multiple-chip"
                          multiple
                          value={serviceName}
                          name={
                            services.find(
                              (service) => service.name === serviceName
                            )?.id || ""
                          }
                          onChange={handleServiceChange}
                          input={
                            <OutlinedInput
                              id="select-multiple-chip"
                              label="Chip"
                            />
                          }
                          renderValue={(selected) => (
                            <Box
                              sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 0.5,
                              }}
                            >
                              {selected.map((value) => (
                                <Chip key={value} label={value} />
                              ))}
                            </Box>
                          )}
                          MenuProps={MenuProps}
                        >
                          {services.map((service) => (
                            <MenuItem
                              key={service.id}
                              value={service.name}
                              name={service.name}
                              style={getServices(
                                service,
                                serviceName,
                                serviceTheme
                              )}
                            >
                              {service.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>

                    {/*File Upload*/}
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        File Upload
                      </Typography>
                      <div className="centered">
                        <FilterHdrIcon sx={{ fontSize: 100 }} />
                      </div>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        endIcon={<CloudUploadIcon />}
                        component="label"
                      >
                        Upload
                        <input hidden accept="image/*" multiple type="file" />
                      </Button>
                      <Button size="small" endIcon={<CancelIcon />}>
                        Cancel
                      </Button>
                    </CardActions>
                  </CardContent>
                </Card>
              </CardContent>
              <Stack direction="row" spacing={1} sx={{ mt: 4, ml: 9, mb: 1 }}>
                <Chip
                  label="Submit"
                  onClick={submitOpen}
                  icon={<SaveIcon />}
                  color="primary"
                  variant="outlined"
                  sx={{ marginBottom: 2 }}
                />
                <Chip
                  label="Clear"
                  onClick={clearOpen}
                  icon={<CancelIcon />}
                  color="error"
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
                <Box sx={{ ...style, width: "90vw", maxHeight: "90vh" }}>
                  <Typography
                    id="Changes"
                    variant="h6"
                    component="h2"
                    align="center"
                  >
                   Preview for {name}
                  </Typography>
                  <Box sx={{ maxHeight: "60vh", overflow: "auto" }}>
                    <List>
                      <ListItem>
                        <ListItemText primary="Service Name" secondary={name} />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Description"
                          secondary={description}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Website URL"
                          secondary={website_url}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Contact Email"
                          secondary={contact_email}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Phone Number"
                          secondary={phone_number}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Address" secondary={address} />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary={
                            <Typography variant="h6">
                              Serviced Counties
                              <br />
                              <Typography variant="caption" component="span" sx={{color: "red"}}>
                                *Note: You cannot undo serviced counties once
                                inserted into the database.*
                              </Typography>
                            </Typography>
                          }
                          secondary={countyName.join(", ")}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary={
                            <Typography variant="h6">
                              Services Provided
                              <br />
                              <Typography variant="caption" component="span" sx={{color: "red"}}>
                                *Note: You cannot undo services provided once
                                inserted into the database.*
                              </Typography>
                            </Typography>
                          }
                          secondary={countyName.join(", ")}
                        />
                      </ListItem>
                    </List>{" "}
                  </Box>
                  <Button
                    onClick={() => {
                      updateServiceProvider(
                        name,
                        website_url,
                        description,
                        address,
                        phone_number,
                        contact_email
                      );
                      submitClose();
                    }}
                    sx={{ mt: 2 }}
                  >
                    Submit
                  </Button>
                  <Typography style={{ color: "red" }}>
                    *Note a page refresh is required to see changes*
                  </Typography>
                </Box>
              </Modal>
              <Modal
                open={clear}
                onClose={clearClose}
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
                    You are about to revert changes
                  </Typography>
                  <Button
                    onClick={() => {
                      resetEntries();
                      clearClose();
                    }}
                    alignContent="center"
                  >
                    Continue
                  </Button>
                </Box>
              </Modal>
            </Card>
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={6000}
              onClose={() => setSnackbarOpen(false)}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
              <Alert
                onClose={() => setSnackbarOpen(false)}
                severity={snackbarSeverity}
                variant="filled"
              >
                {snackbarMessage}
              </Alert>
            </Snackbar>
          </Box>
        </Box>
      </main>
    </>
  );

  // Render post...
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
  let servedCounties;
  let servedServices;
  let data;

  if (!(await authorizeRequest(context.req, context.res, "admin"))) {
    console.log(
      "Access denied to apiuser does not haver permission to access this route"
    );
    // res.status(401).send("Access Denied")
  } else {
    const res = `SELECT sp.* FROM service_providers sp WHERE sp.id = ?`;
    const resData = await executeQuery({
      query: res,
      values: [context.params.id],
    });
    data = JSON.parse(resData);

    const query = `SELECT * FROM sp_counties WHERE service_provider_id = ?`;
    const counties = await executeQuery({
      query: query,
      values: [context.params.id],
    });
    servedCounties = JSON.parse(counties);

    const query2 = `SELECT * FROM sp_services WHERE service_provider_id = ?`;
    const services = await executeQuery({
      query: query2,
      values: [context.params.id],
    });
    servedServices = JSON.parse(services);
  }

  return {
    props: {
      user,
      session,
      data,
      servedCounties,
      servedServices,
    },
  };
}

export default Org;
