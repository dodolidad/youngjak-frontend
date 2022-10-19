import * as React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CommAlert from './CommAlert';

function Login(props, ref) {
  const [open, setOpen] = React.useState(false);
  const userIdRef = React.useRef('');
  const userPwdRef = React.useRef('');
  const CommAlertRef = React.useRef(); 
  let commAlertType = React.useRef('');
  let commAlertMsg = React.useRef('');

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
      commAlertType.current = res.data.success === true ? 'Success' : 'Error'
      commAlertMsg.current = res.data.msg;
      CommAlertRef.current.handleClickOpen();
    })
    .catch((err) => {
      commAlertType.current ='Error'
      commAlertMsg.current = '데이터 처리 실패. 다시 시도하세요.';
      CommAlertRef.current.handleClickOpen();
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
          />
          <TextField
            margin="dense"
            id="userPwd"
            label="비밀번호"
            type="password"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>닫기</Button>
          <Button onClick={tryLogin}>로그인</Button>
        </DialogActions>
      </Dialog>
    </div>
    <CommAlert ref={CommAlertRef} type={commAlertType} msg={commAlertMsg} />
    </>
  );
}

export default React.forwardRef(Login);