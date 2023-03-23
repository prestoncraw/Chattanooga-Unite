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
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { signOut } from 'next-auth/react';

const drawerWidth = 240;

function ResponsiveDrawer(props, {email}) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
              <ListItemText primary="Dashboard Home" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link href="/dashboard/admin/metrics-menu">
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
        <ListItem disablePadding divider onClick={() => signOut({ redirect: false })}>
          <ListItemButton component="a">
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Sign Out" />
          </ListItemButton>
        </ListItem>
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
          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircleIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>{email}placeholder...</MenuItem>
            <MenuItem onClick={() => signOut({ redirect: false })}>Logout</MenuItem>
          </Menu>
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

