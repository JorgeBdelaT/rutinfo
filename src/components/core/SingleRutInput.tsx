import React, { useState, useEffect } from 'react';
import { validate as validateRut, format as formatRut } from 'rut.js';
import styled from 'styled-components';

import { useRutInfo, useNotifications } from '../../hooks';
import { INVALID_RUT_MSG } from '../../utils/constants';
import { Button } from '../../components/basics';
import SingleRutInfo from './SingleRutInfo';

const SingleRutInput: React.FC = () => {
  const { addNotification } = useNotifications();

  const [rut, setRut] = useState('');
  const [requestRutInfo, { data, loading, error }] = useRutInfo();

  useEffect(() => {
    if (data) {
      setRut('');
    }
  }, [data, setRut]);

  const handleClick = async (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();
    if (!validateRut(rut)) {
      addNotification({ message: INVALID_RUT_MSG, type: 'error' });
      setRut('');
      return;
    }

    requestRutInfo(rut);
    return null;
  };

  return (
    <Container>
      <Form onSubmit={handleClick}>
        <HiddenInput type="submit" />
        <Label htmlFor="rut-input">Rut a consultar</Label>
        <Input
          id="rut-input"
          value={rut}
          onChange={(e) => setRut(formatRut(e.target.value))}
          placeholder="Ingresa un rut"
        />
        <Button
          text="Consultar"
          onClick={handleClick}
          loading={loading}
          disabled={loading || !!error}
        />
      </Form>
      <SingleRutInfo data={data} />
    </Container>
  );
};

const Container = styled.div`
  align-items: flex-start;
  display: flex;
  justify-content: flex-start;
  width: 100%;

  @media screen and (max-width: 31.25em) {
    align-items: stretch;
    flex-direction: column;
  }
`;

const Form = styled.form`
  align-items: flex-start;
  background-color: var(--color-white);
  border-radius: 9px;
  box-shadow: 0px 5px 8px 0px rgba(212, 210, 212, 1);
  display: flex;
  flex: 1;
  flex-direction: column;
  font-size: 1.8rem;
  justify-content: flex-start;
  margin: 2rem;
  padding: 4rem 5rem;

  @media screen and (max-width: 60em) {
    flex: 2;
  }
  @media screen and (max-width: 37.5em) {
    padding: 3rem 3rem;
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const Input = styled.input`
  background-color: var(--color-grey-light-1);
  border: 1px solid var(--color-grey-light-4);
  border-radius: 9999px;
  font-family: inherit;
  font-size: inherit;
  margin-bottom: 2rem;
  outline: none;
  padding: 1.5rem 2.2rem;
  transition: border 0.3s;
  width: 100%;

  :focus {
    border: 1px solid var(--color-primary);
  }
`;

const Label = styled.label`
  display: flex;
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 2.5rem;
`;

export default SingleRutInput;
