import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import MenuCard from "./menu-card";

const drawerWidth = 240;

function Dashboard({ name, orgId }) {
  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Typography
          variant="h4"
          component="h1"
          sx={{ fontWeight: "bold", textAlign: "center", mb: 2 }}
        >
          {name} - Dashboard
        </Typography>

        {/* Top Cards */}
        <Card sx={{ mb: 2 }}>
          <Typography variant="h5" component="h2" align="center" sx={{  mt: 1}}>
            Admin Actions
          </Typography>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-around",
              gap: 2,
            }}
          >
            <MenuCard
              link={"/dashboard/admin/orgs/create"}
              title={"Create a Service Provider"}
              description={"Add a new service provider to the database"}
              image={"/images/gear-icon.png"}
              buttonHref={"/dashboard/admin/orgs/create"}
              size={300}
            />
            <MenuCard
              link={"/dashboard/admin/orgs/service-provider-panel"}
              title={"View Service Providers"}
              description={"Edit information regarding service providers"}
              buttonHref={"/dashboard/admin/orgs/service-provider-panel"}
              image={"/images/gear-icon.png"}
              size={300}
            />
            <MenuCard
              link={"/dashboard/admin/metrics"}
              title={"Metrics"}
              description={
                "Metrics regarding searches and service provider engagement"
              }
              image={"/images/graph.png"}
              buttonHref={"/dashboard/admin/metrics"}
              size={300}
            />
            <MenuCard
              link={"/dashboard/admin/activity"}
              title={"Activity Log"}
              image={"/images/alert.png"}
              description={
                "View information regarding activity logs of the admin dashboard"
              }
              buttonHref={"/dashboard/admin/activity"}
              size={300}
            />
          </CardContent>
        </Card>

        {/* Bottom Cards */}
        <Card>
          <Typography variant="h5" component="h2" align="center" sx={{ mt: 1}}>
            Your organizations
          </Typography>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-around",
              gap: 2,
            }}
          >
            <MenuCard
              link={"/dashboard/org/" + orgId}
              title={name}
              image={"/images/helping-hands.png"}
              description={"Edit information regarding your organization"}
              buttonHref={"/dashboard/org/" + orgId}
            />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default Dashboard;
