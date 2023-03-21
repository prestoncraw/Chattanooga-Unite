import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import MetricCard from "./metrics/cards/menu";
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
          link={"/dashboard/admin/metric-menu"}
          title={"Search Metrics"}
          description={"Metrics regarding searches and service provider engagement"}
          buttonHref={"/dashboard/admin/metric-match-table"}
          size={140}
          />
          <MetricCard
          image={"/images/line-graph.png"}
          link={"/dashboard/admin/metric-nomatch-table"}
          title={"Non-Matching Metrics"}
          description={"Metrics regarding non-matching services and county searches"}
          buttonHref={"/dashboard/admin/metric-nomatch-table"}
          size={140}

          />
          <MetricCard
          image={"/images/line-graph.png"}
          link={"/dashboard/admin/metric-match-table"}
          title={"Matching Metrics"}
          description={"Metrics regardin matching services and county searches"}
          buttonHref={"/dashboard/admin/metric-match-table"}
          size={140}

          />
        </Box>
      </Box>
      
    </Box>
    
  );
}

export default Menu;
