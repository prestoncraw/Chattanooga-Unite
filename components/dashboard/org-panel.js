import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import MenuCard from "./menu-card";

const drawerWidth = 240;

export default function OrgPanel({ organizations }) {
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
        {/* <Toolbar /> */}
        {/* <Typography
          variant="h4"
          component="h1"
          sx={{ fontWeight: "bold", textAlign: "center" }}
        >
          &nbsp;
        </Typography> */}
        
        <Card sx={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}>
        <Typography
              variant="h5"
              component="h2"
              align="center"
              sx={{ fontWeight: "bold", mt: 2, mb: 0 }}
            >
              Your Organizations
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
            {organizations.map((org) => (
              <MenuCard
                key={org.id}
                link={`/dashboard/org/${org.id}`}
                title={org.name}
                image={"/images/helping-hands.png"}
                description={"Edit information regarding your organization"}
                buttonHref={`/dashboard/org/${org.id}`}
                size={300}
              />
            ))}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
