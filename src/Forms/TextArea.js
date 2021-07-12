import React from 'react';
import styled from 'styled-components'

const TextAreaContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;    
`;

const TextContainer = styled.textarea`
    border-radius: 5px;
    border: 1px solid #777777;
    padding: 15px;
    width: 70%;
    min-height: 122px;
    margin-bottom: 1rem;
`;

const Label = styled.label`
   margin-bottom: 1rem;
   margin-right: 1.5rem;
`;

const ToggleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 70%;
    margin-bottom: 2rem;
`;

const Button = styled.button`
    margin-bottom: 2rem;
`;

const TextArea = ({ label, onReset, sideComponent,type="text", labelClassname, ...otherProps})=>{

    return(
        <TextAreaContainer>
            <ToggleContainer>
                <Label className={labelClassname}>{label}</Label>
                {sideComponent}
            </ToggleContainer>
            <TextContainer type={type} {...otherProps}/>
            <Button onClick={onReset} className="btn btn-danger">Reset text</Button>
        </TextAreaContainer>
    )
};

export default TextArea;