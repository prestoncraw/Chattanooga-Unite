import * as React from 'react'
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box'; 


export default function OrgCard({sName, sDefault, width, sRow}){
    return(
        <Card variant="outlined" elevation={4}>
            <Box sx={{ minWidth: 320 }}>
            <React.Fragment>
            
            <CardContent>
            <Typography sx={{ fontSize: 22 }} color="text.secondary" gutterBottom>
                {sName} 
            </Typography>
            <TextField id={sName} defaultValue={sDefault} variant="standard" fullWidth={width} multiline rows={sRow}/>
            </CardContent>
            <CardActions>
                
            </CardActions>
            </React.Fragment>
            </Box>
        </Card>
    );
}