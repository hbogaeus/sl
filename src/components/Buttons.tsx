import React, { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  margin: 0;
  outline: 0;
  padding: 0;
  opacity: ${p => p.disabled ? 0.4 : 1.0};
  transition: opacity 250ms;
`

export const FilledButton = styled(Button)`
  border-radius: 2px;
  background-color: #ffffff;
  border: solid 1px rgb(227,227,227);
  box-shadow: 0 1px 2px rgba(0,0,0,.025);
`

export const OutlinedButton = styled(Button)`
  background-color: transparent;
`;