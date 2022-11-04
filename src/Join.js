import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import axios from 'axios';

function Join(props, ref) {
  const navigate = useNavigate();
  const userIdRef = React.useRef();
  const userPwdRef = React.useRef();
  const userPwdAgainRef = React.useRef();
  const chgPwdQstRef = React.useRef();
  const chgPwdAnsRef = React.useRef();

  const tryJoin = () => {
    if(userPwdRef.current !== userPwdAgainRef.current) {
      props.openCommAlert('Error', '비밀번호와 비밀번호 확인이 불일치합니다.');
      return;
    }
    
    axios.post(process.env.REACT_APP_API_URL + '/join', {
      userId: userIdRef.current,
      userPwd : userPwdRef.current,   
      chgPwdQst : chgPwdQstRef.current,
      chgPwdAns: chgPwdAnsRef.current
    })
    .then((res) => {
      props.openCommAlert(res.data.success === true ? '회원가입 완료' : 'Error', res.data.msg);

      if(res.data.success === true) {
        navigate('/');
      }
    })
    .catch((err) => {
      props.openCommAlert('Error', '데이터 처리 실패. 다시 시도하세요.');
    });
  }

  return (
    <>
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
        <TextField id="userPwdAgain" label="비밀번호 확인" variant="outlined" type="password" 
          onChange={(e) => userPwdAgainRef.current = (e.target.value)}
        />
        <TextField id="questionFor" label="질문(비밀번호 찾기용)" variant="outlined" 
          onChange={(e) => chgPwdQstRef.current = (e.target.value)}
        />
        <TextField id="outlined-basic" label="답변(비밀번호 찾기용)" variant="outlined" 
          onChange={(e) => chgPwdAnsRef.current = (e.target.value)}
        />
      </Box>
      <Button size="large" onClick={tryJoin} fullWidth color="success" variant="contained" endIcon={<InsertEmoticonIcon />}>
        가입
      </Button>
    </>
  );
}

export default React.forwardRef(Join);