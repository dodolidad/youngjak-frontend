import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import axios from 'axios';
import Player from './Player';
import DiscreteSlider from './DiscreteSlider';
import Slider from '@mui/material/Slider';

// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import NoteAddIcon from '@mui/icons-material/NoteAdd';

function Home(props, ref) {
  const playerRef = React.useRef();
  const navigate = useNavigate();
  // const textIdRef = React.useRef();
  const [textKrState, setTextKrState] = React.useState('안녕하세요.\n재생 버튼을 클릭하면 랜덤으로 한국어가 나온 후\n잠시 뒤 영어가 나옵니다.\n영작 실력을 향상해보세요.');
  const [textEnState, setTextEnState] = React.useState('Hello.');
  const [intervRate, setIntervRate] = React.useState(100);
  // const [textTypeState, setTextTypeState] = React.useState('SUGGEST');

  const insertText = () => {
    axios.post(process.env.REACT_APP_API_URL + '/insertText', {
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

  // const trySetMyText = () => {
  //   if(localStorage.getItem('token') === null || localStorage.getItem('token') === undefined) {
  //     props.openCommAlert('Error', '로그인 후 이용가능합니다.');
  //     return;
  //   }

  //   if(textIdRef.current === null || textIdRef.current === undefined) {
  //     props.openCommAlert('Error', '저장 할 문장이 없습니다.');
  //     return;
  //   }

  //   axios.post(process.env.REACT_APP_API_URL + '/setMyText', {
  //     token: localStorage.getItem('token'),
  //     textId: textIdRef.current
  //   })
  //   .then((res) => {
  //     if(res.data.success === true) {
  //       props.openCommAlert('Success', res.data.msg);
  //     }
  //     else {
  //       if(res.data.errName === 'JWT_FAIL') {

  //         localStorage.clear();

  //         props.openCommAlert('Error', res.data.msg);
  //       } else {
  //         props.openCommAlert('Error', res.data.msg);
  //       }
  //     }
  //   })
  //   .catch((err) => {
  //     props.openCommAlert('Error', '데이터 처리 실패. 다시 시도하세요.');
  //   });
  // }

  let btnWrite;
  const token1 = localStorage.getItem('token1');
  if (token1 === null || token1 === '') {
  } else {
    btnWrite = <Button onClick={ insertText } color="success" variant="contained" endIcon={<AddCircleOutlineIcon />}>
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

      <Player ref={playerRef} openCommAlert={props.openCommAlert} 
        textKrState={textKrState} 
        textEnState={textEnState} 
        setTextKrState={setTextKrState} 
        setTextEnState={setTextEnState} 
        intervRate={intervRate}
      />
      
      <Typography variant="h2" gutterBottom></Typography>

      <TextField
        label="한국어"
        fullWidth
        multiline
        minRows="2"
        value={textKrState}
        onChange={(e) => setTextKrState(e.target.value)}
      />

      <Typography variant="caption" gutterBottom>
        아래 슬라이더는 한국어가 재생되고 영어가 재생 되기 전 정해진 대기시간의 비율로 짧을수록 대기시간이 짧아집니다.
      </Typography>

      <Box width={'100%'}>
        <Slider
          value={intervRate}
          onChange={(e, newVal) => setIntervRate(newVal)}
          // defaultValue={intervRate.current}
          valueLabelDisplay="auto"
          min={30}
          max={180}
        />
      </Box>

      <TextField
          label="영어"
          fullWidth
          multiline
          minRows="2"
          value={textEnState}
          onChange={(e) => setTextEnState(e.target.value)}
      />

      <Typography variant="h4" gutterBottom></Typography>

      {/* <Box textAlign="right">
        <Button onClick={ trySetMyText } color="success" variant="contained" endIcon={<NoteAddIcon />}>
          내 문장에 추가
        </Button>
      </Box> */}
      <Typography variant="h4" gutterBottom></Typography>
      <Box textAlign="right">
        {btnWrite}
      </Box>
    </React.Fragment>
  )
}

export default React.forwardRef(Home);