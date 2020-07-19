import styled, { keyframes } from 'styled-components';
const donutSpin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  position: relative;

  &::after {
    content: '';
    position: absolute;
    right: -0.75rem;
    border: 2px solid rgba(0, 0, 0, 0.1);
    border-left-color: #019cd5;
    border-radius: 50%;
    width: 1.5rem;
    height: 1.5rem;

    animation: ${donutSpin} 1s linear infinite;
  }
`;

export default Spinner;