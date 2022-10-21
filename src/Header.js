import * as React from 'react';
import { useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { deepOrange, green, blue } from '@mui/material/colors';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import HomeIcon from '@mui/icons-material/Home';

export default function Header() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              onClick={handleClick}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              youngjak.com
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'hidden',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => navigate('/listen')}>
          <Avatar sx={{ bgcolor: deepOrange[500] }} variant="rounded">
            <HeadphonesIcon />
          </Avatar> Listen to
        </MenuItem>
        <MenuItem onClick={() => navigate('/mybook')}>
          <Avatar sx={{ bgcolor: green[500] }} variant="rounded">
            <AssignmentIcon />
          </Avatar> My book
        </MenuItem>
        <MenuItem onClick={() => navigate('/home')}>
          <Avatar sx={{ bgcolor: blue[500] }} variant="rounded">
            <HomeIcon />
          </Avatar> Home
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );


    // <Box sx={{ flexGrow: 1 }}>
    //   <AppBar>
    //     <Toolbar>
    //       <IconButton
    //         size="large"
    //         edge="start"
    //         color="inherit"
    //         aria-label="menu"
    //         sx={{ mr: 2 }}
    //         onClick={toggleDrawer(true)}
    //       >
    //         <MenuIcon />
    //       </IconButton>
    //       <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
    //         News
    //       </Typography>
    //       <Button color="inherit">Login</Button>
    //     </Toolbar>
    //     <Drawer
    //       anchor='left'
    //       open={open}
    //       onClose={toggleDrawer(false)}
    //       sx={{
    //         width: 200,
    //         flexShrink: 0,
    //         '& .MuiDrawer-paper': {
    //           width: 200,
    //           boxSizing: 'border-box',
    //         },
    //       }}
    //     >
    //       <DrawerHeader onClick={toggleDrawer(false)}>
    //         <IconButton onClick={toggleDrawer(false)}>
    //           {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
    //         </IconButton>
    //       </DrawerHeader>
    //       <Divider />
    //       <List>
    //         <ListItem onClick={abc} disablePadding>
    //           <ListItemButton>
    //             <ListItemIcon>
    //               <PlayCircleOutlineIcon style={{ color: "blue" }}/>
    //             </ListItemIcon>
    //             <ListItemText style={{ color: "blue" }} primary='Play' />
    //           </ListItemButton>
    //         </ListItem>
    //         <ListItem onClick={toggleDrawer(false)} disablePadding>
    //           <ListItemButton>
    //             <ListItemIcon>
    //               <MenuBookIcon style={{ color: "green" }}/>
    //             </ListItemIcon>
    //             <ListItemText style={{ color: "green" }} primary='My Book' />
    //           </ListItemButton>
    //         </ListItem>
    //         {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
    //           <ListItem key={text} disablePadding>
    //             <ListItemButton>
    //               <ListItemIcon>
    //                 {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
    //               </ListItemIcon>
    //               <ListItemText primary={text} />
    //             </ListItemButton>
    //           </ListItem>
    //         ))} */}
    //       </List>
    //       <Divider />
    //       <ListItem onClick={toggleDrawer(false)} disablePadding>
    //           <ListItemButton>
    //             <ListItemIcon>
    //               <HomeIcon />
    //             </ListItemIcon>
    //             <ListItemText primary="Home" />
    //           </ListItemButton>
    //         </ListItem>
    //       <ListItem onClick={toggleDrawer(false)} disablePadding>
    //         <ListItemButton>
    //           <ListItemIcon>
    //             <InsertEmoticonIcon />
    //           </ListItemIcon>
    //           <ListItemText primary='회원가입' />
    //         </ListItemButton>
    //       </ListItem>
    //       {/* <List>
    //         {['All mail', 'Trash', 'Spam'].map((text, index) => (
    //           <ListItem key={text} disablePadding>
    //             <ListItemButton>
    //               <ListItemIcon>
    //                 {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
    //               </ListItemIcon>
    //               <ListItemText primary={text} />
    //             </ListItemButton>
    //           </ListItem>
    //         ))}
    //       </List> */}
    //     </Drawer>
    //   </AppBar>
    // </Box>
}
