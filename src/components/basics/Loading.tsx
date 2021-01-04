import React from 'react';
import styled, { keyframes } from 'styled-components';

interface LoadingProps {
  size: number;
}

const Loading: React.FC<LoadingProps> = ({ size }) => {
  return <LoadingContainer size={size} />;
};

const loading = keyframes`
  0% {    
    transform: rotate(0deg);
  }
  100% {    
    transform: rotate(360deg);
  }
`;

interface LoadingContainerProps {
  size: number;
}

const LoadingContainer = styled.div<LoadingContainerProps>`
  animation: ${loading} 1.1s infinite linear;
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
  border-left: 2px solid #ffffff;
  border-right: 2px solid rgba(255, 255, 255, 0.2);
  border-top: 2px solid rgba(255, 255, 255, 0.2);
  position: relative;
  text-indent: -9999rem;
  transform: translateZ(0);

  &,
  &:after {
    border-radius: 50%;
    height: ${(props) => props.size}rem;
    width: ${(props) => props.size}rem;
  }
`;

export default Loading;
