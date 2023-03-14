import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Reuse from "./metrics/cards/menu-dashboard";

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Reuse 
          link={"/dashboard/metrics-menu"}
          title={"Metric Menu"}
          description={"Metrics regarding searches and service provider engagement"}
          image={"/images/graph.png"}
          buttonHref={"/dashboard/metrics-menu"}
          />
          <Reuse
          link={"/dashboard/service-provider-menu"}
          title={"Service Provider Menu"}
          image={"/images/edit-icon.png"}
          description={"Edit information regarding service providers"}
          buttonHref={"/dashboard/service-provider-menu"}
          />      
        </Box>
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;
