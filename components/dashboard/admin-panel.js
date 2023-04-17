import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import MenuCard from "./menu-card";

const drawerWidth = 240;

function AdminPanel() {
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
        {/* Top Cards */}

          <Typography
            variant="h4"
            component="h2"
            align="center"
            sx={{ fontWeight: "bold", mt: 2 }}
          >
            Admin Actions
          </Typography>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "nowrap",
              justifyContent: "space-around",
              gap: 2,
            }}
          >
            <MenuCard
              link={"/dashboard/admin/orgs/create"}
              title={"Create a Service Provider"}
              description={"Add a new service provider to the database"}
              image={"/images/edit-icon.png"}
              buttonHref={"/dashboard/admin/orgs/create"}
            />
            <MenuCard
              link={"/dashboard/admin/orgs/service-provider-panel"}
              title={"View Service Providers"}
              description={"Edit information regarding service providers"}
              buttonHref={"/dashboard/admin/orgs/service-provider-panel"}
              image={"/images/gear-icon.png"}
            />
            <MenuCard
              link={"/dashboard/admin/orgs/user-panel"}
              title={"View Users"}
              description={"Delete a user from the dashboard"}
              buttonHref={"/dashboard/admin/orgs/user-panel"}
              image={"/images/trash.svg"}
            />
            <MenuCard
              link={"/dashboard/admin/metrics"}
              title={"Metrics"}
              description={
                "Metrics regarding searches and service provider engagement"
              }
              image={"/images/graph.png"}
              buttonHref={"/dashboard/admin/metrics"}
            />
            <MenuCard
              link={"/dashboard/admin/activity"}
              title={"Activity Log"}
              image={"/images/alert.png"}
              description={
                "View information regarding activity logs of the admin dashboard"
              }
              buttonHref={"/dashboard/admin/activity"}
            />
          </CardContent>
      </Box>
    </Box>
  );
}

export default AdminPanel;
