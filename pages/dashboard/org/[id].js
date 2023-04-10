import { useRouter } from 'next/router'
import Head from 'next/head';
import * as React from 'react'
import Button from '@mui/material/Button'
import FilterHdrIcon from '@mui/icons-material/FilterHdr';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Toolbar from "@mui/material/Toolbar";



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
    'Bledsoe',
    'Bradley',
    'Catoosa',
    'Dade',
    'Dekalb',
    'Grundy',
    'Hamilton',
    'Jackson',
    'Marion',
    'McMinn',
    'Meigs',
    'Murray',
    'Polk',
    'Rhea',
    'Sequatchie',
    'Walker',
    'Whitfield'
  ];
  const services = [
    'Advocacy',
    'Benefits',
    'Clothing',
    'Dental',
    'Education',
    'Employment',
    'Food',
    'Health Care',
    'Housing',
    'Memorial and Burial Benefits',
    'Therapeutic Recreation',
    'Transportation',
    'Utility Assistance',
    'Other'
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
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
function Org({ data }) {
    const router = useRouter();

    const org_data = JSON.parse(data.data);
    const countyTheme = useTheme();
    const [countyName, setCountyName] = React.useState([]);
    const serviceTheme = useTheme();
    const [serviceName, setServiceName] = React.useState([]);
    const [submit, sOpen] = React.useState(false);
    const submitOpen = () => sOpen(true);
    const submitClose = () => sOpen(false);
    const [clear, cOpen] = React.useState(false);
    const clearOpen = () => cOpen(true);
    const clearClose = () => cOpen(false);

  const handleCountyChange = (event) => {
    const {
      target: { value },
    } = event;
    setCountyName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  const handleServiceChange = (event) => {
    const {
      target: { value },
    } = event;
    setServiceName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
    return (
        <>
        
            <Head>
                <title>Edit Organization &raquo; Chattanooga Unite - Veterans Resource Center</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Toolbar />
            <main>
              
                {/* <h1>{org_data[0].name}</h1>
                <a href="/dashboard">Back to dashboard</a>
                <ul>
                    <li>
                        {org_data[0].address}
                    </li>
                    <li>
                        {org_data[0].contact_email}
                    </li>
                    <li>
                        {org_data[0].phone_number}
                    </li>
                    <li>
                        {org_data[0].website_url}
                    </li>

                </ul> */}
                <div className="centered">
                  <Typography variant="h2">
                    {org_data[0].name}
                  </Typography>
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
                        <Card sx={{ maxWidth: 250, width: "100%", backgroundColor: "#f7f7f7" }}>
                          <CardContent>
                            <Typography variant="body2" color="text.secondary">
                              Service Name 
                            </Typography>
                            <TextField sx={{marginBottom: 4}} id="Service Name" defaultValue={org_data[0].name} variant="standard" fullWidth multiline rows={1}/>
                            <Typography variant="body2" color="text.secondary">
                              Service Description
                            </Typography>
                            <TextField sx={{marginBottom: 4}} id="Service Description" defaultValue={org_data[0].description} variant="standard" fullWidth multiline rows={3}/>
                            <Typography variant="body2" color="text.secondary">
                              Url  
                            </Typography>
                            <TextField sx={{marginBottom: 4}} id="Url" defaultValue={org_data[0].website_url} variant="standard" fullWidth multiline rows={1}/>
                          </CardContent>
                        </Card>
                        {/*Service Contact Card*/}
                        <Card sx={{ maxWidth: 250, width: "100%", backgroundColor: "#f7f7f7" }}>
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                              Service Email
                            </Typography>
                            <TextField sx={{marginBottom: 4}} id="Service Email" defaultValue={org_data[0].contact_email} variant="standard" fullWidth multiline rows={1}/>
                            <Typography variant="body2" color="text.secondary">
                              Service Phone Number 
                            </Typography>
                            <TextField sx={{marginBottom: 4}} id="Service Phone Number" defaultValue={org_data[0].phone_number} variant="standard" fullWidth multiline rows={1}/>
                            <Typography variant="body2" color="text.secondary">
                              Service Address  
                            </Typography>
                            <TextField sx={{marginBottom: 4}} id="Service Address" defaultValue={org_data[0].address} variant="standard" fullWidth multiline rows={3}/>
                          </CardContent>
                        </Card>

                        {/*Service Counties and FIle Upload*/}
                        <Card sx={{ maxWidth: 250, width: "100%", backgroundColor: "#f7f7f7" }}>
                          <React.Fragment>
                          <CardContent>
                              {/*Service Counties*/}
                              <Typography variant="body2" color="text.secondary">
                                  Serviced Counties
                              </Typography>
                              <div>
                                  <FormControl sx={{ m: 1, width: 215 }}>
                                      <InputLabel id="demo-multiple-chip-label">County</InputLabel>
                                      <Select
                                          labelId="demo-multiple-chip-label"
                                          id="demo-multiple-chip"
                                          multiple
                                          value={countyName}
                                          onChange={handleCountyChange}
                                          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                          renderValue={(selected) => (
                                              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                  {selected.map((value) => (
                                                      <Chip key={value} label={value} />
                                                  ))}
                                              </Box>
                                          )}
                                          MenuProps={MenuProps}
                                      >
                                          {counties.map((county) => (
                                          <MenuItem
                                              key={county}
                                              value={county}
                                              style={getCounties(county, countyName, countyTheme)}
                                          >
                                              {county}
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
                                <FormControl sx={{ m: 1, width: 215 }}>
                                  <InputLabel id="demo-multiple-chip-label">Services</InputLabel>
                                  <Select
                                    labelId="demo-multiple-chip-label"
                                    id="demo-multiple-chip"
                                    multiple
                                    value={serviceName}
                                    onChange={handleServiceChange}
                                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                    renderValue={(selected) => (
                                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                          <Chip key={value} label={value} />
                                        ))}
                                      </Box>
                                    )}
                                    MenuProps={MenuProps}
                                  >
                                    {services.map((service) => (
                                      <MenuItem
                                        key={service}
                                        value={service}
                                        style={getServices(service, serviceName, serviceTheme)}
                                      >
                                        {service}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </div>

                              {/*File Upload*/} 
                              <React.Fragment>
                                <CardContent>
                                  <Typography variant="body2" color="text.secondary">
                                      File Upload
                                  </Typography>
                                  <div className="centered">
                                      <FilterHdrIcon sx={{ fontSize: 100 }} />
                                  </div>
                                </CardContent>
                                <CardActions>
                                  <Button size="small" endIcon={<CloudUploadIcon />} component="label">Upload
                                      <input hidden accept="image/*" multiple type="file" />
                                  </Button>
                                  <Button size="small" endIcon={<CancelIcon />}>Cancel</Button>
                                </CardActions>
                              </React.Fragment>                           
                            </CardContent>
                          </React.Fragment>
                        </Card>
                      </CardContent>
                      <Stack direction="row" spacing={1} sx={{mt: 4, ml: 11, mb: 1}}>
                        <Chip
                          label="Submit"
                          onClick={submitOpen}
                          icon={<SaveIcon />}
                          color="primary"
                          variant="outlined"
                          sx={{marginBottom: 2}}
                        />
                        <Chip
                         label="Clear"
                         onClick={clearOpen}
                         icon={<CancelIcon />}
                         color="error"
                         variant="outlined"
                         sx={{marginBottom: 2}}
                        />
                      </Stack>
                      <Modal
                        open={submit}
                        onClose={submitClose}
                        aria-labelledby="Changes"
                        aria-describedby="lists the changes made in the editing process "
                      >
                        <Box sx={style}>
                          <Typography id="Changes" variant="h6" component="h2" align= "center">
                            Changes Made 
                          </Typography>
                          <Typography id="Changes Made" sx={{ mt: 2 }}>
                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
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
                          <Typography id="Changes" variant="h6" component="h2" align= "center">
                            You are about to revert changes 
                          </Typography>
                          <Button onCLick={clearClose} alignContent="center">Continue</Button>
                        </Box>
                      </Modal>
                    </Card>
                  </Box>
                </Box>
        </main>
        </>
    )

    // Render post...
}

export async function getServerSideProps(context) {
    const res = await fetch(`http://localhost:3000/api/get-org?sp_id=${context.params.id}`);
    const data = await res.json();

    return {
        props: { data }, // will be passed to the page component as props
    }
}



export default Org