import React, { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

const Content = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  margin: 0;
  outline: 0;
  padding: 0.4rem;
  background-color: #ffffff;
  border: solid 1px rgb(227,227,227);
  box-shadow: 0 1px 2px rgba(0,0,0,.025);
  border-radius: 2px;
  opacity: ${p => p.disabled ? 0.4 : 1.0};
  transition: opacity 250ms;
`

const Button: React.FC<React.HTMLProps<HTMLButtonElement>> = ({ children, disabled, onClick }) => (
  <Content disabled={disabled} onClick={onClick}>{children}</Content>
)

export default Button;