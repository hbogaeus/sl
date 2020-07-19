import React from 'react';
import styled from 'styled-components';

const Content = styled.span`
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
`

const Icon: React.FC = ({ children }) => (
  <Content>{children}</Content>
)

export default Icon;