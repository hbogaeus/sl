import React from 'react';
import styled from 'styled-components';
import Icon from './Icon';

const Content = styled.span`
  color: #019cd5;
  display: flex;
  padding: 0;
  width: 1.5rem;
  height: 1.5rem;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
`

export interface StarProps {
  filled: boolean
}

const StarIcon = ({ filled }: StarProps) => (
  <Content>
    {filled ? '★' : '☆'}
  </Content>
)

export default StarIcon;