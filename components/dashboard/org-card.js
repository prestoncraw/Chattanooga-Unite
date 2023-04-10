import * as React from 'react'
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box'; 


export default function OrgCard({sName, sName2, sName3, sDefault, sDefault2, sDefault3, sRow, sRow2, sRow3}){
    return(
        <Card variant="outlined" elevation={4}>
          <Box sx={{ minWidth: 300, display: 'inline-block'}}>
            <React.Fragment>
              <CardContent>
                  <Typography sx={{ fontSize: 22 }} color="text.secondary" gutterBottom>
                    {sName} 
                  </Typography>
                  <TextField sx={{marginBottom: 4}} id={sName} defaultValue={sDefault} variant="standard" fullWidth multiline rows={sRow}/>
                  <Typography sx={{ fontSize: 22 }} color="text.secondary" gutterBottom>
                    {sName2}
                  </Typography>
                  <TextField sx={{marginBottom: 4}} id={sName2} defaultValue={sDefault2} variant="standard" fullWidth multiline rows={sRow2}/>
                  <Typography sx={{ fontSize: 22 }} color="text.secondary" gutterBottom>
                    {sName3}
                  </Typography>
                  <TextField sx={{marginBottom: 4}} id={sName3} defaultValue={sDefault3} variant="standard" fullWidth multiline rows={sRow3}/>                                          
              </CardContent>
              <CardActions>
              </CardActions>
            </React.Fragment>
          </Box>
        </Card>
    );
}