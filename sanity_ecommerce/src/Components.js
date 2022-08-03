import React from 'react'
import styled, { css } from 'styled-components'


export const Color = styled.div`
    background-color: ${props => props.fillColor};
    width: 100%;
    height: 35px;
`
export const Button = styled.button`
    width: 100%;
    padding: 0;
    box-sizing: border-box;
    border-color: inherit;
    border-radius: 10px;
    &:hover {
        cursor: pointer;
        border: 2px solid #28c3d1
    }
    &:focus {
        border: 5px solid #28c3d1

    }
    
    
`