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
import AssignmentIcon from '@mui/icons-material/Assignment';
import { deepOrange, green } from '@mui/material/colors';
import HomeIcon from '@mui/icons-material/Home';

function Header(props, ref) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const tryLogout = () => {
    localStorage.clear();
    navigate('/')
  }

  // if(token === null || token === '')

  let btnLogInOut;
  let btnJoin;
  const token = localStorage.getItem('token');
  if (token === null || token === '') {
    btnLogInOut = <Button onClick={() => navigate('/login')} color="inherit">로그인</Button>
    btnJoin = <Button onClick={() => navigate('/join')} color="inherit">회원가입</Button>
  } else {
    btnLogInOut = <Button onClick={() => tryLogout()} color="inherit">로그아웃</Button>
  }

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
            {btnJoin}
            {btnLogInOut}
            {/* <Button onClick={() => navigate('/login')} color="inherit">Login</Button> */}
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
        <MenuItem onClick={() => navigate('/home')}>
          <Avatar sx={{ bgcolor: deepOrange[500] }} variant="rounded">
            <HomeIcon />
          </Avatar> Home
        </MenuItem>
        <MenuItem onClick={() => navigate('/mytext')}>
          <Avatar sx={{ bgcolor: green[500] }} variant="rounded">
            <AssignmentIcon />
          </Avatar> My Text
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          내 정보
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

export default React.forwardRef(Header)