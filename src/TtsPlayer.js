import * as React from 'react';
import axios from 'axios';

function TtsPlayer(props, ref) {
  const audioCtx = new AudioContext(window.AudioContext || window.webkitAudioContext);
  let source;
  const [text, setText] = React.useState('');
  const [lang, setLang] = React.useState('');
  const [voice, setVoice] = React.useState('');
  
  React.useImperativeHandle(ref, () => ({
    play
  }));

  const play = async (text, lang, voice) => {
    console.log(source);
    const response = await axios.get(process.env.REACT_APP_API_URL + '/tts', {
      params: {
        text: text,
        lang: lang,
        voice: voice,
      },
      responseType : 'arraybuffer'
    })
    .then(async(res) => {
      source = audioCtx.createBufferSource();

      audioCtx.decodeAudioData(
        res.data,
        (buffer) => {
          source.buffer = buffer;
  
          source.connect(audioCtx.destination);
        },
        (err) => {
          props.openCommAlert('Error', '데이터 처리 실패. 다시 시도하세요.');
        }
      );
      
      source.start(0);
    })
    .catch((err) => {
      props.openCommAlert('Error', '데이터 처리 실패. 다시 시도하세요.');
    });
  }

  return(
    <>
    </>
  );
}

export default React.forwardRef(TtsPlayer);