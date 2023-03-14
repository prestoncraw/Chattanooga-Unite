import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MetricIcon from '@mui/icons-material/SignalCellularAlt';
import ManageAccountsSharpIcon from '@mui/icons-material/ManageAccountsSharp';
import GridIcon from '@mui/icons-material/GridView';
import HomeIcon from '@mui/icons-material/Home';
import Link from 'next/link';
import LogoutIcon from '@mui/icons-material/Logout';
import { signOut } from 'next-auth/react';

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <List>
        <Link href="/dashboard/">
          <ListItem disablePadding divider >
            <ListItemButton component="a">
              <ListItemIcon>
                <GridIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link href="/dashboard/metrics-menu">
          <ListItem disablePadding divider>
            <ListItemButton component="a">
              <ListItemIcon>
                <MetricIcon />
              </ListItemIcon>
              <ListItemText primary="Metrics" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link href="/dashboard/service-provider-menu">
          <ListItem disablePadding divider>
            <ListItemButton component="a">
              <ListItemIcon>
                <ManageAccountsSharpIcon />
              </ListItemIcon>
              <ListItemText primary="Service Providers" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link href="/">
          <ListItem disablePadding divider>
            <ListItemButton component="a">
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Exit Dashboard" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link href="/">
          <ListItem disablePadding divider>
            <ListItemButton component="a" onClick={() => signOut({ redirect: false })}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Sign Out" />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Link href="/dashboard/">
            <Typography variant="h6" noWrap component="div">
              Chattanooga Unite Admin Dashboard
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

export default ResponsiveDrawer;