import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Reuse from "./metrics/cards/menu";

const drawerWidth = 240;

function ResponsiveDrawer( {name, orgId}) {
  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Card sx={{ width: '100%', mb: 2,  backgroundColor: '#f7f7f7'  }}>
          <CardContent>
            <Typography variant="h5" component="div" textAlign="center">
              Admin Actions
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center'}}>
              <Reuse
                link={"/dashboard/admin/orgs/create"}
                title={"Create a Service Provider"}
                description={"Add a new service provider to the database"}
                image={"/images/gear-icon.png"}
                buttonHref={"/dashboard/admin/orgs/create"}
                size={300}
              />             
              <Reuse
                link={"/dashboard/admin/orgs/service-provider-panel"}
                title={"View Service Providers"}
                description={"Edit information regarding service providers"}
                buttonHref={"/dashboard/admin/orgs/service-provider-panel"}
                image={"/images/gear-icon.png"}
                size={300}
              /> 
              <Reuse 
                link={"/dashboard/admin/metrics-menu"}
                title={"Metrics"}
                description={"Metrics regarding searches and service provider engagement"}
                image={"/images/graph.png"}
                buttonHref={"/dashboard/admin/metrics-menu"}
                size={300}
              />
              <Reuse
                link={"/dashboard/admin/activity"}
                title={"Activity Log"}
                image={"/images/edit-icon.png"}
                description={"View information regarding activity logs of the admin dashboard"}
                buttonHref={"/dashboard/admin/activity"}
                size={300}
            />
            </Box>
          </CardContent>
        </Card>
        <Card sx={{ width: '100%',  backgroundColor: '#f7f7f7'  }}>
          <CardContent>
            <Typography variant="h5" component="div" textAlign="center">
              Your Organizations
            </Typography>
            <Box sx={{ display: 'flex', gap: 2,  justifyContent: 'center'  }}>
              <Reuse 
                link={"/dashboard/org/" + orgId }
                title={name}
                image={"/images/helping-hands.png"}
                description={"Placeholder... text blah blah blah blah"}
                buttonHref={"/dashboard/org/"+ orgId}
              />          
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;
