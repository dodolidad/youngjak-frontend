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

function Home(props, ref) {
  const navigate = useNavigate();

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
        <Button color="success" variant="contained" endIcon={<CampaignIcon />}>
          재생하기
        </Button>
      </Box>
      <Typography variant="h6" gutterBottom></Typography>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Accordion 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Typography variant="h5" gutterBottom></Typography>
      <Box textAlign="center">
        <Button onClick={() => navigate('join')} size="large" color="success" variant="contained" endIcon={<TouchAppOutlinedIcon />}>
          회원가입
        </Button>
     </Box>
    </React.Fragment>
  )

  // const navigate = useNavigate();
  // const accordionRef = React.useRef();

  // const play = () => {
  //   // const countdown = setInterval(() => {
  //   //   TtsPlayerRef.current.play();
  //   // }, 2000);
  //   // TtsPlayerRef.current.play();
  // } 

  // const [expanded, setExpanded] = React.useState('panel1');

  // const handleChange = (panel) => (event, newExpanded) => {
  //   setExpanded(newExpanded ? panel : false);
  // };

  // return (
  //   <React.Fragment>
  //     <Typography variant="h4" gutterBottom></Typography>
  //     <Box textAlign="center" sx={{ width: '100%' }}>
  //       <Typography variant="h4" gutterBottom>  
  //         Welcome!
  //       </Typography>
  //     </Box>
  //     <Box sx={{ width: '100%' }}>
  //       <Typography variant="h5" gutterBottom>
  //         youngjak.com에서 영어회화 실력을 향상시키세요.
  //       </Typography>
  //       <li><strong>랜덤 재생:</strong> 내가 저장한 문장 또는 제안되는 문장을 자동 재생해보세요.</li>
  //       <Typography variant="h3" gutterBottom></Typography>
  //     </Box>

  //     <Box textAlign="right">
  //       <Button onClick={play} color="success" variant="contained" endIcon={<CampaignIcon />}>
  //         재생하기
  //       </Button>
  //     </Box>

  //     <Typography variant="h6" gutterBottom></Typography> 

  //     {/* <Accordion ref={accordionRef} textPanel1='안녕 내이름은 탐이야.' textPanel2='I have to work at least 10 years' /> */}



  //     <Typography variant="h3" gutterBottom></Typography>

  //     <Box textAlign="center">
  //       <Button onClick={() => navigate('join')} size="large" color="success" variant="contained" endIcon={<TouchAppOutlinedIcon />}>
  //         회원가입
  //       </Button>
  //     </Box>
  //   </React.Fragment>
  // );



  // const navigate = useNavigate();
  // const accordionRef = React.useRef();
  // const CommAlertRef = React.useRef();
  // const TtsPlayerRef = React.useRef();

  // // const requestAudioFile = async () => {
  // //   console.log(accordionRef.current.textPanel1);
  // //   const response = await axios.get(process.env.REACT_APP_API_URL + '/tts', {
  // //     params: {
  // //     text: accordionRef.current.textPanel2,
  // //     lang: 'en-US',
  // //     voice: 'male',
  // //     },
  // //     responseType : 'arraybuffer'
  // //   })
  // //   .then(async(res) => {
  // //     const audioContext = new AudioContext(window.AudioContext || window.webkitAudioContext);

  // //     const audioBuffer = await audioContext.decodeAudioData(res.data);

  // //     const source = audioContext.createBufferSource();
  // //     source.buffer = audioBuffer;
  // //     source.connect(audioContext.destination);
  // //     source.start();

  // //     source.onended = (event) => {
  // //       console.log('Video stopped either because 1) it was over, ' +
  // //           'or 2) no further data is available.');
  // //     };
  // //   })
  // //   .catch((err) => {
  // //     commAlertType.current ='Error'
  // //     commAlertMsg.current = '데이터 처리 실패. 다시 시도하세요.';
  // //     CommAlertRef.current.handleClickOpen();
  // //   });
  // // }

  // const openCommAlert = (type, msg) => {
  //   commAlertType.current = type;
  //   commAlertMsg.current = msg;
  //   CommAlertRef.current.handleClickOpen();
  // }

  // const play = () => {
  //   // const countdown = setInterval(() => {
  //   //   TtsPlayerRef.current.play();
  //   // }, 2000);
  //   //TtsPlayerRef.current.play();
  // } 

  // return (
  //   <>
  //   <Typography variant="h4" gutterBottom></Typography>
  //   <Box textAlign="center" sx={{ width: '100%' }}>
  //     <Typography variant="h4" gutterBottom>  
  //       Welcome!
  //     </Typography>
  //   </Box>
  //   <Box sx={{ width: '100%' }}>
  //     <Typography variant="h5" gutterBottom>
  //       youngjak.com에서 영어회화 실력을 향상시키세요.
  //     </Typography>
  //     <li><strong>랜덤 재생:</strong> 내가 저장한 문장 또는 제안되는 문장을 자동 재생해보세요.</li>
  //     <Typography variant="h3" gutterBottom></Typography>
  //   </Box>

  //   <Box textAlign="right">
  //     <Button onClick={play} color="success" variant="contained" endIcon={<CampaignIcon />}>
  //       재생하기
  //     </Button>
  //   </Box>

  //   <Typography variant="h6" gutterBottom></Typography> 

  //   <Accordion ref={accordionRef} textPanel1='안녕 내이름은 탐이야.' textPanel2='I have to work at least 10 years' />

  //   <Typography variant="h3" gutterBottom></Typography>

  //   <Box textAlign="center">
  //     <Button onClick={() => navigate('join')} size="large" color="success" variant="contained" endIcon={<TouchAppOutlinedIcon />}>
  //       회원가입
  //     </Button>
  //   </Box>
  //   <TtsPlayer ref={TtsPlayerRef} openCommAlert={openCommAlert} text='hello' lang='en-US' voice='FEMALE'/>
  //   <CommAlert ref={CommAlertRef} type={commAlertType} msg={commAlertMsg} />
  //   </>
  // );
}

export default React.forwardRef(Home);