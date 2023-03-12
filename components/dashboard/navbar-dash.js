import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';
import Switch from '@mui/material/Switch';

export default function MenuAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setTimeout(() => {
      setAnchorEl(null);
    }, 1); // Delay the execution of handleClose by 100ms
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <FormGroup>
      </FormGroup>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="Large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleMenu}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            a
          </Typography>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <Link href="/dashboard" passHref>
                <MenuItem component="a" onClick={handleMenu}>
                  Dashboard
                </MenuItem>
              </Link>
              <Link href="/metric-match-table" passHref>
                <MenuItem component="a" onClick={handleMenu}>
                  Service and County - Match Table
                </MenuItem>
              </Link>
              <Link href="/metric-nomatch-table" passHref>
                <MenuItem component="a" onClick={handleMenu}>
                  Service and County - No Match Table
                </MenuItem>
              </Link>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
