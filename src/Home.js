import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import CampaignIcon from '@mui/icons-material/Campaign';
import TextField from '@mui/material/TextField';
import axios from 'axios';

// import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import StopCircleIcon from '@mui/icons-material/StopCircle';

function Home(props, ref) {
  const navigate = useNavigate();
  const textIdRef = React.useRef();
  const [textKrState, setTextKrState] = React.useState('안녕하세요. 재생 버튼을 클릭해보세요.');
  const [textEnState, setTextEnState] = React.useState('Hello.');
  const interv = React.useRef(0);
  const textType = React.useRef('SUGGEST');
  const [isPlayng, setIsPlayng] = React.useState(false);
  const source = React.useRef();
  const audioCtx = React.useRef();
  // let audioCtx;
  // let source;
  const toPlayCountRef = React.useRef(0);
  const playedCountRef = React.useRef(0);
  const textIdxRef = React.useRef(1);
  const timer = React.useRef();

  const play = async() => {
    setIsPlayng(true);

    audioCtx.current = new (window.AudioContext || window.webkitAudioContext)();

    try {
      const {data} = await axios.get(process.env.REACT_APP_API_URL + '/getTextOneRandomForGuest', {});

      if(data.success !== true || data.results.length === 0) {
        setIsPlayng(false);
        props.openCommAlert('Error', '데이터 조회 실패.');
      }

      let textKr = '';
      let textEn = '';
      for(let i = 0; i < data.results.length; i++) {
        if(i !== data.results.length - 1) {
          textKr = textKr + data.results[i].TEXT_KR + '\n';
          textEn = textEn + data.results[i].TEXT_EN + '\n';
        } else {
          textKr = textKr + data.results[i].TEXT_KR;
          textEn = textEn + data.results[i].TEXT_EN;

          textIdRef.current = data.results[i].TEXT_ID;

          toPlayCountRef.current = data.results.length * 2;
          playedCountRef.current = 0;
          textIdxRef.current = 1;
          interv.current = data.results[i].SUM_INTERV;

          setTextKrState(textKr);
          setTextEnState(textEn);

          await playSound();
        }
      }
    } catch(err) {
      setIsPlayng(false);
      props.openCommAlert('Error', '음성 재생 실패.');
    }
  }

  const playSound = async() => {
    try {
      const results = await axios.get(process.env.REACT_APP_API_URL + '/getSound', {
        params: {
          textId: textIdRef.current,
          idx: textIdxRef.current,
          lang: playedCountRef.current < (toPlayCountRef.current / 2) ? 'kr' : 'en'
        },
        responseType : 'arraybuffer'
      })

      source.current = audioCtx.current.createBufferSource();

      source.current.buffer = await audioCtx.current.decodeAudioData(results.data);

      source.current.connect(audioCtx.current.destination);

      source.current.addEventListener("ended", () => {
        playSoundDone();
      });

      source.current.start(0);
      // source.stop();
    } catch(err) {
      setIsPlayng(false);
      props.openCommAlert('Error', '음성 재생 실패.');
    }
  }

  const playSoundDone = () => {
    playedCountRef.current = playedCountRef.current + 1;
    textIdxRef.current = playedCountRef.current === (toPlayCountRef.current / 2) ? 1 : textIdxRef.current + 1;
    let millisec = playedCountRef.current === (toPlayCountRef.current / 2) ? interv.current : 0;

    if(playedCountRef.current === toPlayCountRef.current) {
      timer.current = setTimeout(() => play(), 1500);
    } else {
      timer.current = setTimeout(() => playSound(), millisec);
    }
  }

  const stopSound = () => {
    clearTimeout(timer.current);
    audioCtx.current.close();
    setIsPlayng(false);
  }

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
    axios.post(process.env.REACT_APP_API_URL + '/setMyText', {
      token: localStorage.getItem('token'),
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

  let btnWrite;
  const token1 = localStorage.getItem('token1');
  if (token1 === null || token1 === '') {
  } else {
    btnWrite = <Button onClick={ trySetText } color="success" variant="contained" endIcon={<AddCircleOutlineIcon />}>
      신규등록
    </Button>
  }

  let btnPlayOrStop;
  if (isPlayng === false) {
    btnPlayOrStop = 
      <Button onClick={play} color="secondary" variant="contained" endIcon={<CampaignIcon />}>
        자동재생
      </Button>
  } else {
    btnPlayOrStop = 
      <Button onClick={stopSound} color="warning" variant="contained" endIcon={<StopCircleIcon />}>
        정지하기
      </Button>
  }

  return (
    <React.Fragment>
      <Typography variant="h4" gutterBottom></Typography>
      <Box textAlign="center" sx={{ width: '100%' }}>
        <Typography variant="h4" gutterBottom>  
          Welcome!
        </Typography>
        {/* <Typography variant="h5" gutterBottom>
          youngjak.com에서는 다음의 서비스를 지원합니다.
        </Typography>
        <ol>
          <li><strong>랜덤 My book :</strong> 내가 저장한 문장을 한번의 클릭으로 계속해서 랜덤으로 자동 재생합니다.</li>
          <li><strong>랜덤 제안 재생 : </strong> youngjak.com에서 제안하는 문장을 한번의 클릭으로 계속해서 랜덤으로 자동 재생합니다.</li>
        </ol>
        <Typography variant="h3" gutterBottom></Typography> */}
      </Box>
      <Box textAlign="right">

        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          {/* <InputLabel id="demo-simple-select-standard-label">Age</InputLabel> */}
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={textType.current}
            onChange={(e) => textType.current(e.target.value)}
            // label="Age"
          >
            <MenuItem value='SUGGEST'>제안</MenuItem>
            <MenuItem value='MYTEXT'>My Text</MenuItem>
            <MenuItem value='ALL'>All</MenuItem>
          </Select>
        </FormControl>

        {/* <Button onClick={() => props.play(textEn, 'en', 'female')} color="success" variant="contained" endIcon={<CampaignIcon />}>
          재생하기
        </Button> */}
        {btnPlayOrStop}
        {/* <Button onClick={play} color="success" variant="contained" endIcon={<CampaignIcon />}>
          자동재생
        </Button> */}
        
      </Box>
      
      <Typography variant="h6" gutterBottom></Typography>

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
          내 문장으로 저장
        </Button>
        {btnWrite}

      </Box>
    </React.Fragment>
  )
}

export default React.forwardRef(Home);