import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import ServiceProvider from "./menu-card";
import Typography from "@mui/material/Typography";

const drawerWidth = 240;

function Menu() {
  const serviceProviderData = {
    link: "/dashboard/metric-nomatch-table",
    title: "Service Provider",
    description: "Test information blah blah blah",
    image: "/images/chattanooga-unite-logo.jpg",
    buttonHref: "/dashbservice-provider-panel",
  };

  const serviceProviders = new Array(20).fill(serviceProviderData);

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Typography gutterBottom variant="h3" component="div">
          Service Provider Panel
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          {serviceProviders.map((provider, index) => (
            <Box key={index} sx={{ width: "20%" }}>
              <ServiceProvider
                link={provider.link}
                title={provider.title}
                description={provider.description}
                image={provider.image}
                buttonHref={provider.buttonHref}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default Menu;
