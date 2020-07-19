import React from 'react';
import styled from 'styled-components';

const Content = styled.span`
  color: #019cd5;
`

export interface StarProps {
  filled: boolean
}

const Star = ({ filled }: StarProps) => {
  return (
    <Content>
      {filled ? '★' : '☆'}
    </Content>
  )
}

export default Star;