import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TouchAppOutlinedIcon from '@mui/icons-material/TouchAppOutlined';

export default function Home(props) {
  return (
    <>
    <Box textAlign="center" sx={{ width: '100%' }}>
      <Typography variant="h2" gutterBottom>  
          Welcome!
        </Typography>
    </Box>
    <Box sx={{ width: '100%' }}>
      <Typography variant="h2" gutterBottom>
        h2. Heading
      </Typography>
      <Typography variant="h3" gutterBottom>
        h3. Heading
      </Typography>
      <Typography variant="h4" gutterBottom>
        h4. Heading
      </Typography>
      <Typography variant="h5" gutterBottom>
        h5. Heading
      </Typography>
      <Typography variant="h6" gutterBottom>
        h6. Heading
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
        blanditiis tenetur
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
        blanditiis tenetur
      </Typography>
      <Typography variant="body1" gutterBottom>
        body1. Lorem ipsum dolor sit amet, 
      </Typography>
      <Typography variant="body2" gutterBottom>
        body2. Lorem ipsum dolor sit am
      </Typography>
      <Typography variant="button" display="block" gutterBottom>
        button text
      </Typography>
      <Typography variant="caption" display="block" gutterBottom>
        caption text
      </Typography>
      <Typography variant="overline" display="block" gutterBottom>
        overline text
      </Typography>
    </Box>
    <Box textAlign="center">
      <Button size="large" color="success" variant="contained" endIcon={<TouchAppOutlinedIcon />}>
        회원가입
      </Button>
    </Box>
    </>
  );
}
