import React, { useState, useEffect } from "react";
import styled from 'styled-components'
import AWS from "aws-sdk";

const AudioContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
`;

const ButtonContainer = styled.button`
  width: 20%;
  margin-bottom: 1rem;
`;

const SpeechText = (props) => {

  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  const onPlayVoice = async ()=>{

    AWS.config.accessKeyId = props.accessKeyId;
    AWS.config.secretAccessKey = props.secretAccessKey;
    AWS.config.region = props.region;
  
    const polly = new AWS.Polly();
  
    const params = {
      OutputFormat: props.outputFormat,
      Text: props.value,
      TextType: props.textType,
      LanguageCode: props.languageCode,
      VoiceId: props.voiceId,
    };
  
      setError(false);
      setErrorMessage("");

      polly.synthesizeSpeech(params, function (err, data) {
        if (err) {
          console.log("error", err);
          setError(true);
          setErrorMessage(err.message);
        }
        console.log("data", data)
        if(data){
        var uInt8Array = new Uint8Array(data.AudioStream);
        var arrayBuffer = uInt8Array.buffer;
        var blob = new Blob([arrayBuffer]);

        var audio = document.getElementById(props.id);
        var url = URL.createObjectURL(blob);

        setError(false);
        setErrorMessage("");

        audio.src = url;
        audio.play();
      }
      });
  }

  return (
    <AudioContainer>
      <ButtonContainer className="btn btn-primary" onClick={onPlayVoice} disabled={props.disabled}>Play</ButtonContainer>
      <audio id={props.id} controls hidden={props.hiddenPlayer}>
        <source id="audioSource" type="audio/mp3" src="" />
      </audio>
    </AudioContainer>
  );
};

export default SpeechText;
