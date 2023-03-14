import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import MetricCard from "./metrics/cards/menu-metric";
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
          Metric Menu
        </Typography>  
        <Box sx={{ display: 'flex', gap: 2 }}>
          <MetricCard
          image={"/images/line-graph.png"}
          link={"/dashboard/metric-menu"}
          title={"Search Metrics"}
          description={"Metrics regarding searches and service provider engagement"}
          buttonHref={"/metric-match-table"}
          />
          <MetricCard
          image={"/images/line-graph.png"}
          link={"/dashboard/metric-nomatch-table"}
          title={"Non-Matching Metrics"}
          description={"Metrics regarding non-matching services and county searches"}
          buttonHref={"/metric-nomatch-table"}
          />
          <MetricCard
          image={"/images/line-graph.png"}
          link={"/dashboard/metric-match-table"}
          title={"Matching Metrics"}
          description={"Metrics regardin matching services and county searches"}
          buttonHref={"/metric-match-table"}
          />
        </Box>
      </Box>
      
    </Box>
    
  );
}

export default Menu;
