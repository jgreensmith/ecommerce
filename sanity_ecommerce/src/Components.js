import React from 'react'
import styled, { css } from 'styled-components'


export const Color = styled.div`
    background-color: ${props => props.fillColor};
    width: 100%;
    height: 20px;
`