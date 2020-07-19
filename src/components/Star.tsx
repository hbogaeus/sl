import React from 'react';
import styled from 'styled-components';
import Icon from './Icon';

const Content = styled.span`
  color: #019cd5;
`

export interface StarProps {
  filled: boolean
}

const Star = ({ filled }: StarProps) => {
  return (
    <Icon>
      {filled ? '★' : '☆'}
    </Icon>
  )
}

export default Star;