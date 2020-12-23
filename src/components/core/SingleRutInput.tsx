import React, { useState } from 'react';
import { validate as validateRut, format as formatRut } from 'rut.js';
import styled from 'styled-components';

import { useRutInfo, useNotifications } from '../../hooks';
import { INVALID_RUT_MSG } from '../../utils/constants';
import { Button } from '../../components/basics';

const SingleRutInput: React.FC = () => {
  const { addNotification } = useNotifications();

  const [rut, setRut] = useState('');
  const [requestRutInfo, { data, loading, error }] = useRutInfo();

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
        <Label>Rut a consultar</Label>
        <Input
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
      <DataContainer>
        {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        {!data && <p>Consulta un rut para obtener información de la persona</p>}
      </DataContainer>
    </Container>
  );
};

const Container = styled.div`
  align-items: flex-start;
  display: flex;
  justify-content: flex-start;
`;

const Form = styled.form`
  align-items: flex-start;
  background-color: var(--color-white);
  border-radius: 9px;
  display: flex;
  flex: 1;
  flex-direction: column;
  font-size: 1.8rem;
  justify-content: flex-start;
  margin: 2rem;
  max-width: 33%;
  padding: 4rem 5rem;
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

const DataContainer = styled.div`
  background-color: var(--color-white);
  border-radius: 9px;
  display: flex;
  flex: 2;
  margin: 2rem;
  padding: 4rem 5rem;
`;

export default SingleRutInput;
