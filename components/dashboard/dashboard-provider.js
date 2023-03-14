import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import ProviderCard from "./metrics/cards/menu-provider";
import Typography from '@mui/material/Typography';

const drawerWidth = 240;

function Menu() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
      <Toolbar />
      <Typography gutterBottom variant="h3" component="div">
          Service Provider Menu
        </Typography>  
        <Box sx={{ display: 'flex', gap: 2 }}>
          <ProviderCard
          link={"/dashboard/"}
          title={"Add Service Provider"}
          description={"Add a new service provider to the database"}
          image={"/images/gear-icon.png"}
          buttonHref={"/dashboard/"}
          />
          <ProviderCard
          link={"/dashboard/service-provider-panel"}
          title={"Edit Service Provider"}
          description={"Edit information regarding service providers"}
          buttonHref={"/dashboard/service-provider-panel"}
          image={"/images/gear-icon.png"}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default Menu;
