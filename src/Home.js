import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TouchAppOutlinedIcon from '@mui/icons-material/TouchAppOutlined';
import { useNavigate } from "react-router-dom";
import CampaignIcon from '@mui/icons-material/Campaign';
import Avatar from '@mui/material/Avatar';
import { deepOrange, green, blue, purple } from '@mui/material/colors';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import CommAlert from './CommAlert';
import TtsPlayer from './TtsPlayer';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import TextField from '@mui/material/TextField';

function Home(props, ref) {
  const navigate = useNavigate();
  const [textKor, setTextKor] = React.useState('안녕하세요.');
  const [textEn, setTextEn] = React.useState('Hello');

  return (
    <React.Fragment>
      <Typography variant="h4" gutterBottom></Typography>
      <Box sx={{ width: '100%' }}>
        <Typography variant="h4" gutterBottom>  
          Welcome!
        </Typography>
        <Typography variant="h5" gutterBottom>
          youngjak.com에서는 다음의 서비스를 지원합니다.
        </Typography>
        <ol>
          <li><strong>랜덤 My book :</strong> 내가 저장한 문장을 한번의 클릭으로 계속해서 랜덤으로 자동 재생합니다.</li>
          <li><strong>랜덤 제안 재생 : </strong> youngjak.com에서 제안하는 문장을 한번의 클릭으로 계속해서 랜덤으로 자동 재생합니다.</li>
        </ol>
        <Typography variant="h3" gutterBottom></Typography>
      </Box>
      <Box textAlign="right">
        <Button onClick={() => props.play(textEn, 'en', 'female')} color="success" variant="contained" endIcon={<CampaignIcon />}>
          재생하기
        </Button>
      </Box>
      
      <Typography variant="h6" gutterBottom></Typography>

      <TextField
        label="한국어"
        fullWidth
        multiline
        minRows="2"
        defaultValue={textKor}
        onChange={(e) => console.log(setTextKor(e.target.value))}
      />

      <Typography variant="h4" gutterBottom></Typography>

      <TextField
          label="영어"
          fullWidth
          multiline
          minRows="2"
          defaultValue={textEn}
          onChange={(e) => console.log(setTextEn(e.target.value))}
      />

      <Typography variant="h5" gutterBottom></Typography>

      <Box textAlign="center">
        <Button onClick={() => navigate('join')} size="large" color="success" variant="contained" endIcon={<TouchAppOutlinedIcon />}>
          회원가입
        </Button>
     </Box>
    </React.Fragment>
  )
}

export default React.forwardRef(Home);