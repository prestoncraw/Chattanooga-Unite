import { useRouter } from 'next/router'
import Head from 'next/head';
import * as React from 'react'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import FilterHdrIcon from '@mui/icons-material/FilterHdr';
import TextField from '@mui/material/TextField';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import SaveIcon from '@mui/icons-material/Save';
import SendIcon from '@mui/icons-material/Send'
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { ButtonGroup } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

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
const names = [
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
function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

function Org({ data }) {
    const router = useRouter();

    const org_data = JSON.parse(data.data);
    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
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

            <main>
                <h1>{org_data[0].name}</h1>
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

                </ul>
                <div className="centered">
        <Typography variant="h2">
            Provided Service
        </Typography>
    </div><div className="left">

            <br></br>
        
        <Card variant="outlined" sx={{ml: 4}}>
            <Box sx={{ minWidth: 320 }}>
            <React.Fragment>
            
            <CardContent>
            <Typography sx={{ fontSize: 22 }} color="text.secondary" gutterBottom>
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
            </Box>
        </Card>
        
        <br />
        <Card variant="outlined">
            <Box sx={{ minWidth: 320 }}>
            <React.Fragment>
            
            <CardContent>
            <Typography sx={{ fontSize: 22 }} color="text.secondary" gutterBottom>
                Service Name
            </Typography>
            <TextField id="service name" label="Service Name" variant="standard" />
            </CardContent>
            <CardActions>
                
            </CardActions>
            </React.Fragment>
            </Box>
        </Card>

        <br />
        <Card variant="outlined" fullWidth>
            <Box sx={{ minWidth: 320 }}>
            <React.Fragment>
            
            <CardContent>
            <Typography sx={{ fontSize: 22 }} color="text.secondary" gutterBottom>
                Service Description
            </Typography>
            <TextField
                id="standard-multiline-static"
                label="Description"
                multiline
                rows={3}
                variant="standard"
                fullWidth />
            </CardContent>
            <CardActions>
                
            </CardActions>
            </React.Fragment>
            </Box>
        </Card>
            
        <br />
        <Card variant="outlined">
            <Box sx={{ minWidth: 320 }}>
            <React.Fragment>
            
            <CardContent>
            <Typography sx={{ fontSize: 22 }} color="text.secondary" gutterBottom>
                Contact Phone Number 
            </Typography>
            <TextField id="service contact" label="Phone Number" variant="standard" />
            </CardContent>
            <CardActions>

            </CardActions>
            </React.Fragment>
            </Box>
        </Card>

        <br />
        <Card variant="outlined">
            <Box sx={{ minWidth: 320 }}>
            <React.Fragment>
            
            <CardContent>
            <Typography sx={{ fontSize: 22 }} color="text.secondary" gutterBottom>
                Contact Email 
            </Typography>
            <TextField id="service email contact" label="Email" variant="standard" />
            </CardContent>
            <CardActions>
                
            </CardActions>
            </React.Fragment>
            </Box>
        </Card>
        
        <br />
        <Card variant="outlined">
            <Box sx={{ minWidth: 320 }}>
            <React.Fragment>
            
            <CardContent>
            <Typography sx={{ fontSize: 22 }} color="text.secondary" gutterBottom>
                URL
            </Typography>
            <TextField id="service URL" label="Service Url" variant="standard" />
            </CardContent>
            <CardActions>
                
            </CardActions>
            </React.Fragment>
            </Box>
        </Card>

        <br />
        <Card variant="outlined">
            <Box sx={{ minWidth: 320 }}>
            <React.Fragment>
            
            <CardContent>
            <Typography sx={{ fontSize: 22 }} color="text.secondary" gutterBottom>
                Service Address
            </Typography>
            <TextField id="service address" label="Address" variant="standard" />
            </CardContent>
            <CardActions>
                
            </CardActions>
            </React.Fragment>
            </Box>
        </Card>
        
        <br />
        <Card variant="outlined">
            <Box sx={{ minWidth: 320 }}>
            <React.Fragment>
            
            <CardContent>
            <Typography sx={{ fontSize: 22 }} color="text.secondary" gutterBottom>
                Serviced Counties
            </Typography>
            <div>
                <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-chip-label">County</InputLabel>
                <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={personName}
                    onChange={handleChange}
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
                    {names.map((name) => (
                        <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name, personName, theme)}
                        >
                            {name}
                        </MenuItem>
                    ))}
                </Select>
                </FormControl>
            </div>
            </CardContent>
            <CardActions>
                
            </CardActions>
            </React.Fragment>
            </Box>
        </Card>
        <br />

        <div className="right">
            <div className="inLine">
                
                <Button variant="contained" endIcon={<SaveIcon />}>Save</Button>
                <Button variant="contained" endIcon={<ArrowBackIcon />} onclick="history.back()">Back</Button>
            </div>
        </div>
        </div>
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