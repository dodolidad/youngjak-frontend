import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import CampaignIcon from '@mui/icons-material/Campaign';
import TextField from '@mui/material/TextField';

// import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';

function Listen(props) {
  const navigate = useNavigate();
  const [textKr, setTextKr] = React.useState('안녕하세요. 재생하기 버튼을 클릭해보세요.');
  const [textEn, setTextEn] = React.useState('');
  const [textType, setTextType] = React.useState('MYTEXT');

  const trySetText = () => {
    axios.post(process.env.REACT_APP_API_URL + '/setText', {
      token: localStorage.getItem('token'),
      token1: localStorage.getItem('token1'),
      textKr: textKr,
      textEn : textEn,
    })
    .then((res) => {
      console.log(res);
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
      console.log(err);
      props.openCommAlert('Error', '데이터 처리 실패. 다시 시도하세요.');
    });
  }

  const trySetMyText = () => {
    axios.post(process.env.REACT_APP_API_URL + '/setMyText', {
      token: localStorage.getItem('token'),
      textKr: textKr,
      textEn : textEn,
    })
    .then((res) => {
      console.log(res);
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
      console.log(err);
      props.openCommAlert('Error', '데이터 처리 실패. 다시 시도하세요.');
    });
  }

  let writeButton;
  const token1 = localStorage.getItem('token1');
  if (token1 === null || token1 === '') {
  } else {
    writeButton = <Button onClick={ trySetText } color="success" variant="contained" endIcon={<CampaignIcon />}>
      신규등록
    </Button>
  }

  let myTextButton;
  const token = localStorage.getItem('token');
  if (token === null || token === '') {
  } else {
    myTextButton = <Button onClick={ trySetMyText } color="success" variant="contained" endIcon={<CampaignIcon />}>
      내 문장으로 저장
    </Button>
  }

  const play = () => {
    let apiPath = '';

    if(textType === 'SUGGEST') {
      apiPath = '/getSuggestTextOneRandom';
    }else if(textType === 'MYTEXT') {
      apiPath = '/getMyTextOneRandom';
    }else if(textType === 'ALL') {
      apiPath = '/getAllTextOneRandom';
    }

    axios.get(process.env.REACT_APP_API_URL + apiPath, {
      token: localStorage.getItem('token')
    })
    .then((res) => {
      console.log(res);
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
      console.log(err);
      props.openCommAlert('Error', '데이터 처리 실패. 다시 시도하세요.');
    });
  }

  return(
    <React.Fragment>
      <Typography variant="h4" gutterBottom></Typography>
      <Box sx={{ width: '100%' }}>
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
            value={textType}
            onChange={(e) => setTextType(e.target.value)}
            // label="Age"
          >
            <MenuItem value='SUGGEST'>제안</MenuItem>
            <MenuItem value='MYTEXT'>My Text</MenuItem>
            <MenuItem value='ALL'>All</MenuItem>
          </Select>
        </FormControl>

        <Button onClick={play} color="success" variant="contained" endIcon={<CampaignIcon />}>
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

      <Typography variant="h4" gutterBottom></Typography>

      <Box textAlign="right">
        {myTextButton}
        {writeButton}

      </Box>

    </React.Fragment>
  )
}

export default Listen;