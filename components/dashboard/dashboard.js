import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Reuse from "./metrics/cards/menu";

const drawerWidth = 240;

function ResponsiveDrawer( {name, orgId}) {
  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Typography variant="h5" component="div" textAlign="left" sc ={{}} >
          Admin Actions
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'left'}}>
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
            image={"/images/alert.png"}
            description={"View information regarding activity logs of the admin dashboard"}
            buttonHref={"/dashboard/admin/activity"}
            size={300}
          />
        </Box>
        <Typography variant="h5" component="div" textAlign="left" >
          Your Organizations
        </Typography>
        <Box sx={{ display: 'flex', gap: 2,  justifyContent: 'left', mb: 2 }}>
          <Reuse 
            link={"/dashboard/org/" + orgId }
            title={name}
            image={"/images/helping-hands.png"}
            description={"Placeholder... text blah blah blah blah"}
            buttonHref={"/dashboard/org/"+ orgId}
          />          
        </Box>
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;
