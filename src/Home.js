import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TouchAppOutlinedIcon from '@mui/icons-material/TouchAppOutlined';
import { useNavigate } from "react-router-dom";
import Accordion from './Accordion';
import Avatar from '@mui/material/Avatar';
import { deepOrange, green, blue } from '@mui/material/colors';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import CampaignIcon from '@mui/icons-material/Campaign';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import CommAlert from './CommAlert';

export default function Home(props) {
  const navigate = useNavigate();
  const accordionRef = React.useRef();
  const CommAlertRef = React.useRef(); 

  let commAlertType = React.useRef('');
  let commAlertMsg = React.useRef('');

  const requestAudioFile = async () => {
    console.log(accordionRef.current.textPanel1);
    const response = await axios.get(process.env.REACT_APP_API_URL + '/listen', {
      params: {
      text: accordionRef.current.textPanel2,
      lang: 'en-US',
      voice: 'FEMALE',
      },
      responseType : 'arraybuffer'
    })
    .then(async(res) => {
      const audioContext = new AudioContext(window.AudioContext);

      const audioBuffer = await audioContext.decodeAudioData(res.data);

      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      source.start();
    })
    .catch((err) => {
      commAlertType.current ='Error'
      commAlertMsg.current = '데이터 처리 실패. 다시 시도하세요.';
      CommAlertRef.current.handleClickOpen();
    });
  }

  return (
    <>
    <Typography variant="h4" gutterBottom></Typography>
    <Box textAlign="center" sx={{ width: '100%' }}>
      <Typography variant="h4" gutterBottom>  
        Welcome!
      </Typography>
    </Box>
    <Box sx={{ width: '100%' }}>
      <Typography variant="h5" gutterBottom>
        youngjak.com에서 영어회화 실력을 향상시키세요.
      </Typography>
      <li><strong>랜덤 재생:</strong> 내가 저장한 문장 또는 제안되는 문장을 자동 재생해보세요.</li>
      <Typography variant="h3" gutterBottom></Typography>
    </Box>

    <Box textAlign="right">
      <Button onClick={requestAudioFile} color="success" variant="contained" endIcon={<CampaignIcon />}>
        재생하기
      </Button>
    </Box>

    <Typography variant="h6" gutterBottom></Typography> 

    <Accordion ref={accordionRef} textPanel1='안녕 내이름은 탐이야.' textPanel2='Hi. My name is Tom.' />

    <Typography variant="h3" gutterBottom></Typography>

    <Box textAlign="center">
      <Button onClick={() => navigate('join')} size="large" color="success" variant="contained" endIcon={<TouchAppOutlinedIcon />}>
        회원가입
      </Button>
    </Box>
    <CommAlert ref={CommAlertRef} type={commAlertType} msg={commAlertMsg} />
    </>
  );
}
