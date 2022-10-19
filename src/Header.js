import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Login from './Login';
import LoginIcon from '@mui/icons-material/Login';


export default function Header() {
  const LoginRef = React.useRef();

  const tryLogin = () => {
    LoginRef.current.handleClickOpen();
  }

  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            youngjak.com
          </Typography>
          <Button color="inherit" variant="outlined" endIcon={<LoginIcon />} onClick={tryLogin}>로그인</Button>
        </Toolbar>
      </AppBar>
    </Box>
    <Login ref={LoginRef} />
    </>
  );
}
