import React from "react";
import styled from 'styled-components';

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  border-bottom: solid 1px rgb(227, 227, 227);
  /* background-color: #ffffff; */
  background-color: #019cd5;
  box-shadow: 0 1px 2px rgba(0, 0, 0, .025);
`

const Header = () => (
  <Content />
)

export default Header;