import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

function Login(props, ref) {
  const navigate = useNavigate();
  const userIdRef = React.useRef();
  const userPwdRef = React.useRef();

  const tryLogin = () => {
    axios.post(process.env.REACT_APP_API_URL + '/login', {
      userId: userIdRef.current,
      userPwd : userPwdRef.current,
    })
    .then((res) => {
      if(res.data.success === true) {
        localStorage.setItem('token', res.data.token);
        if(res.data.token1) localStorage.setItem('token1', res.data.token1);

        navigate('/home');
      }
      else {
        props.openCommAlert('Error', res.data.msg);
      }
    })
    .catch((err) => {
      props.openCommAlert('Error', '데이터 처리 실패. 다시 시도하세요.');
    });
  }

  return (
    <React.Fragment>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, display: 'flex' },
        }}
        noValidate
        autoComplete="off"
        textAlign="center"
      >
        <TextField id="userId" label="아이디(4자 이상)" variant="outlined" autoFocus
          onChange={(e) => userIdRef.current = (e.target.value)}
        />
        <TextField id="userPwd" label="비밀번호(4자 이상)" variant="outlined" type="password" 
          onChange={(e) => userPwdRef.current = (e.target.value)}
        />
      </Box>
      <Button size="large" onClick={tryLogin} fullWidth color="success" variant="contained" >
        로그인
      </Button>
    </React.Fragment>
  )
}

export default React.forwardRef(Login);