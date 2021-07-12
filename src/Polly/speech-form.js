import React, {useState} from 'react';
import TextArea from "../Forms/TextArea";
import SpeechText from "./speech-text";
import AWS from "aws-sdk";

import styled from 'styled-components'
import SelectOption from '../Forms/SelectOption';
import ToggleSwitch from '../Forms/ToggleSwitch';

import {languageCode} from "../utils/language-code";
import {accessKeyId, secretAccessKey, region} from "../utils/creds";


const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const DocumentRedirect = styled.a`
    margin-right: 0.5rem;
`;

const SpeechForm = (props)=>{
    AWS.config.accessKeyId = accessKeyId;
    AWS.config.secretAccessKey = secretAccessKey;
    AWS.config.region = region;

    const polly = new AWS.Polly();

    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [selectedVoice, setSelectedVoice] = useState([]);
    const [voiceOptions, setVoiceOptions] = useState([["Select Language","Select Language"]]);
    const [speechText, setSpeechText] = useState("");
    const [ssmlText, setSSMLText] = useState(``);

    const [textType, setTextType] = useState(true);

    const onSelectedLanguage = (e) => {
        setSelectedLanguage(e.target.value);

        let voiceArray = [];

        const params = {
            LanguageCode: e.target.value,
        };
        polly.describeVoices(params, function (err, data) {
            if (err) {
            console.log("error", err);
            }
            data.Voices.map((voice)=>{
                voiceArray.push([`${voice.Id}`, `${voice.Name} - ${voice.Gender}`])
            })
            setVoiceOptions(voiceArray);
            setSelectedVoice(voiceArray[0][0]);
        });
    }

    const onSelectedVoice = (e) => {
        setSelectedVoice(e.target.value);
    }

    const onChangeSpeechText = (e) => {
        if(!textType){
            setSSMLText(e.target.value)
        }
        setSpeechText(e.target.value);
    }

    const onChangeTextType = (e) => {
        setSSMLText(`<speak>${speechText}</speak>`)
        console.log("ssmlText", ssmlText)
        console.log("speechText", speechText)

        setTextType(e);
    }

    const onReset = () =>{
        setSSMLText(`<speak>${speechText}</speak>`)
        setSpeechText("")
    }

    return(
        <div className="row">
        <FormContainer className="container">
            <SelectOption 
                name="language"
                value={selectedLanguage}
                label="Select Language: "
                onChange={onSelectedLanguage}
                options={languageCode}
            />
             <SelectOption 
                name="voice"
                value={selectedVoice}
                onChange={onSelectedVoice}
                label="Select Voice: "
                options={voiceOptions}
            />
            <TextArea
                label={`Text format: ${textType ? "Text" : "SSML"}`}
                name="speech-text"
                value={textType? speechText : ssmlText}
                onChange={onChangeSpeechText}
                className=""
                containerClass=""
                labelClassname=""
                onReset={onReset}
                sideComponent={
                    <div className="d-flex align-items-center">
                        {!textType && 
                            <DocumentRedirect className="mr-3" href="https://docs.aws.amazon.com/polly/latest/dg/supportedtags.html" target="_blank"> Check SSML documentation</DocumentRedirect>
                        }
                        <ToggleSwitch id="textType" checked={ textType } onChange={ onChangeTextType} />
                    </div>
                }
            />
            <SpeechText
                id="speech-text"
                value={speechText}
                languageCode={selectedLanguage}
                voiceId={selectedVoice}
                textType={textType ? "text" : "ssml"}
                outputFormat="mp3"
                hiddenPlayer={false}
                accessKeyId={accessKeyId}
                secretAccessKey={secretAccessKey}
                region={region}
            />
        </FormContainer>
        </div>
    );
}

export default SpeechForm;