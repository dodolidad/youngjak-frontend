import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TouchAppOutlinedIcon from '@mui/icons-material/TouchAppOutlined';
import { useNavigate } from "react-router-dom";
import CampaignIcon from '@mui/icons-material/Campaign';
import TextField from '@mui/material/TextField';

// import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function Home(props, ref) {
  const navigate = useNavigate();
  const [textKr, setTextKr] = React.useState('안녕하세요. 재생하기 버튼을 클릭해보세요.');
  const [textEn, setTextEn] = React.useState('');
  const [textType, setTextType] = React.useState('SUGGEST');

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

        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          {/* <InputLabel id="demo-simple-select-standard-label">Age</InputLabel> */}
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={textType}
            onChange={(e) => setTextType(e.target.value)}
            // label="Age"
          >
            <MenuItem value='SUGGEST'>제안</MenuItem>
            <MenuItem value='MYTEXT' disabled>My Text</MenuItem>
            <MenuItem value='ALL'>All</MenuItem>
          </Select>
        </FormControl>

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
        defaultValue={textKr}
        onChange={(e) => setTextKr(e.target.value)}
      />

      <Typography variant="h4" gutterBottom></Typography>

      <TextField
          label="영어"
          fullWidth
          multiline
          minRows="2"
          defaultValue={textEn}
          onChange={(e) => setTextEn(e.target.value)}
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