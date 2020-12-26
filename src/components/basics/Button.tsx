/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import styled from 'styled-components';

import Loading from './Loading';

interface ButtonProps {
  disabled?: boolean;
  loading?: boolean;
  onClick: (e: any) => void;
  style?: React.CSSProperties;
  text: string;
}

const Button: React.FC<ButtonProps> = ({
  disabled = false,
  loading = false,
  onClick,
  style = {},
  text,
}) => {
  const displayLoading = () => {
    if (loading) {
      return (
        <LoadingBox>
          <Loading size={2} />
        </LoadingBox>
      );
    }
    return null;
  };
  return (
    <ButtonContanier onClick={onClick} disabled={disabled} style={style}>
      {displayLoading()}
      {text}
    </ButtonContanier>
  );
};

interface ButtonContanierProps {
  disabled: boolean;
}

const ButtonContanier = styled.button<ButtonContanierProps>`
  align-items: center;
  background-color: var(
    ${(props) => (props.disabled ? '--color-grey-light-4' : '--color-primary')}
  );
  border: none;
  border-radius: 9999px;
  color: var(
    ${(props) => (props.disabled ? '--color-grey-dark-2' : '--color-white')}
  );
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  display: flex;
  font-family: inherit;
  font-size: 1.8rem;
  font-weight: 600;
  justify-content: center;
  outline: none;
  padding: 1.5rem;
  transition: all 0.3s;
  width: 100%;

  :hover,
  :focus {
    background-color: var(
      ${(props) =>
        props.disabled ? '--color-grey-light-4' : '--color-primary-light'}
    );
  }

  :active {
    transform: scale(${(props) => (props.disabled ? 1 : 0.95)});
  }
`;

const LoadingBox = styled.div`
  margin-right: 1rem;
`;

export default Button;
