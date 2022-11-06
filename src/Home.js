import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import axios from 'axios';
import Player from './Player';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import NoteAddIcon from '@mui/icons-material/NoteAdd';

function Home(props, ref) {
  const navigate = useNavigate();
  const textIdRef = React.useRef();
  const [textKrState, setTextKrState] = React.useState('안녕하세요. 재생 버튼을 클릭해보세요. \n\n일부 기능은 개발진행중입니다.....');
  const [textEnState, setTextEnState] = React.useState('Hello.');
  const [textTypeState, setTextTypeState] = React.useState('SUGGEST');

  const trySetText = () => {
    axios.post(process.env.REACT_APP_API_URL + '/setText', {
      token: localStorage.getItem('token'),
      token1: localStorage.getItem('token1'),
      textKr: textKrState,
      textEn : textEnState,
    })
    .then((res) => {
      if(res.data.success === true) {
        props.openCommAlert('Success', res.data.msg);
      }
      else {
        if(res.data.errName === 'JWT_FAIL') {

          localStorage.clear();

          props.openCommAlert('Error', res.data.msg);

          navigate('/login');
        } else {
          props.openCommAlert('Error', res.data.msg);
        }
      }
    })
    .catch((err) => {
      props.openCommAlert('Error', '데이터 처리 실패. 다시 시도하세요.');
    });
  }

  const trySetMyText = () => {
    if(localStorage.getItem('token') === null || localStorage.getItem('token') === undefined) {
      props.openCommAlert('Error', '로그인 후 이용가능합니다.');
      return;
    }

    if(textIdRef.current === null || textIdRef.current === undefined) {
      props.openCommAlert('Error', '저장 할 문장이 없습니다.');
      return;
    }

    axios.post(process.env.REACT_APP_API_URL + '/setMyText', {
      token: localStorage.getItem('token'),
      textId: textIdRef.current
    })
    .then((res) => {
      if(res.data.success === true) {
        props.openCommAlert('Success', res.data.msg);
      }
      else {
        if(res.data.errName === 'JWT_FAIL') {

          localStorage.clear();

          props.openCommAlert('Error', res.data.msg);
        } else {
          props.openCommAlert('Error', res.data.msg);
        }
      }
    })
    .catch((err) => {
      props.openCommAlert('Error', '데이터 처리 실패. 다시 시도하세요.');
    });
  }

  let btnWrite;
  const token1 = localStorage.getItem('token1');
  if (token1 === null || token1 === '') {
  } else {
    btnWrite = <Button onClick={ trySetText } color="success" variant="contained" endIcon={<AddCircleOutlineIcon />}>
      신규등록
    </Button>
  }

  return (
    <React.Fragment>
      <Typography variant="h4" gutterBottom></Typography>
      <Box textAlign="center" sx={{ width: '100%' }}>
        <Typography variant="h4" gutterBottom>  
          Welcome!
        </Typography>
      </Box>
      <Box textAlign="right">

        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          {/* <InputLabel id="demo-simple-select-standard-label">Age</InputLabel> */}
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={textTypeState}
            onChange={(e) => setTextTypeState(e.target.value)}
            // label="Age"
          >
            <MenuItem value='SUGGEST'>제안</MenuItem>
            <MenuItem value='MYTEXT'>My Text</MenuItem>
            <MenuItem value='ALL'>All</MenuItem>
          </Select>
        </FormControl>
        
      </Box>

      <Player />
      
      <Typography variant="h2" gutterBottom></Typography>

      <TextField
        label="한국어"
        fullWidth
        multiline
        minRows="2"
        value={textKrState}
        onChange={(e) => setTextKrState(e.target.value)}
      />

      <Typography variant="h4" gutterBottom></Typography>

      <TextField
          label="영어"
          fullWidth
          multiline
          minRows="2"
          value={textEnState}
          onChange={(e) => setTextEnState(e.target.value)}
      />

      <Typography variant="h4" gutterBottom></Typography>

      <Box textAlign="right">
        <Button onClick={ trySetMyText } color="success" variant="contained" endIcon={<NoteAddIcon />}>
          내 문장에 추가
        </Button>
      </Box>
      <Typography variant="h4" gutterBottom></Typography>
      <Box textAlign="right">
        {btnWrite}
      </Box>
    </React.Fragment>
  )
}

export default React.forwardRef(Home);