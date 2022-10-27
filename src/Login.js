import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function Login(props, ref) {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const userIdRef = React.useRef();
  const userPwdRef = React.useRef();

  React.useImperativeHandle(ref, () => ({
    handleClickOpen
  }));

  const handleClose = () => {
    setOpen(false);
  }

  const handleClickOpen = () => {
    setOpen(true);
  }

  const tryLogin = () => {
    axios.post(process.env.REACT_APP_API_URL + '/login', {
      userId: userIdRef.current,
      userPwd : userPwdRef.current,
    })
    .then((res) => {
      console.log(res);
      if(res.data.success !== true) alert(res.data.msg)
      else {
        localStorage.setItem('token', res.data.token);

        handleClose();

        navigate('/listen');
      }
      // props.openCommAlert(res.data.success === true ? 'Success' : 'Error', res.data.msg);
    })
    .catch((err) => {
      console.log(err);
      props.openCommAlert('Error', '데이터 처리 실패. 다시 시도하세요.');
    });
  }

  return (
    <>
      <div>
        <Dialog
          PaperProps={{ sx: { position: "fixed", top: 10, m: 8 } }}
          open={open} onClose={handleClose}
        >
          <DialogTitle>로그인</DialogTitle>
          <DialogContent>
            <DialogContentText>
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="userId"
              label="아이디"
              fullWidth
              variant="standard"
              onChange={(e) => userIdRef.current = (e.target.value)}
            />
            <TextField
              margin="dense"
              id="userPwd"
              label="비밀번호"
              type="password"
              fullWidth
              variant="standard"
              onChange={(e) => userPwdRef.current = (e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>닫기</Button>
            <Button onClick={tryLogin}>로그인</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

export default React.forwardRef(Login);