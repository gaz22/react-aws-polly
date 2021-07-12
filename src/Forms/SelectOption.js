import React from 'react';
import styled from 'styled-components'

const SelectOptionContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    width: 100%;
    margin-bottom: 1.2rem;
`;

const SelectContainer = styled.select`
    padding: 15px;
    border-radius: 5px;
    width: 180px;
`;


const SelectOption = ({options, label, defaultOption, ...others}) =>{
   
    return(
        <SelectOptionContainer className="answer-drop">
            <label>{label}
                <SelectContainer {...others}>
                    {options.map(([value, name])=>{
                        return(
                            <option value={value}>{name}</option>
                        )
                    })}
                </SelectContainer>
            </label>
        </SelectOptionContainer>
    );
};

export default SelectOption;