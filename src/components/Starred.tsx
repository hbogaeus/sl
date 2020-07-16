import React from 'react';
import styled from 'styled-components';
import { Station } from '../domain';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const NoStarredMessage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`

const Star = styled.span`
  color: #019cd5;
`

export interface StarredProps {
  locations: Station[]
}

const Starred = ({ locations }: StarredProps) => {
  return (
    <Content>
      {locations.length == 0 ?
        (
          <NoStarredMessage>
            <span>No <Star>★</Star> trips yet.</span>
          </NoStarredMessage>
        ) :
        (
          <span>Starred Locations</span>
        )}

    </Content>
  )
}

export default Starred;