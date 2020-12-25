/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef } from 'react';
import styled from 'styled-components';

import { useNotifications } from '../../hooks';
import { INVALID_FILE_MSG } from '../../utils/constants';
import { Button } from '../basics';

const MultiRut: React.FC = () => {
  const { addNotification } = useNotifications();
  const inputRef = useRef<any>();
  const [file, setFile] = useState<File>();
  // const [loading, setLoading] = useState(true);

  const handleClick = (e: React.MouseEvent | React.FormEvent) => {
    e.preventDefault();
    inputRef.current!.click();
  };

  const handleFileChange = (e: any) => {
    const target = e.target as HTMLInputElement;
    const { validity } = target;

    if (!validity.valid) {
      addNotification({ type: 'error', message: INVALID_FILE_MSG });
      return;
    }

    const uploadedFile = target.files![0];
    setFile(uploadedFile);
  };

  const displayFileName = () => {
    if (!file) return null;

    return <FileName>{file.name}</FileName>;
  };

  return (
    <Container>
      <Form>
        <HiddenInput
          ref={inputRef}
          accept=".xlsx, .xls, .csv"
          type="file"
          onChange={handleFileChange}
        />
        <Label>Sube un excel con ruts a consultar</Label>
        {displayFileName()}
        <Button
          text="Elegir archivo"
          onClick={handleClick}
          // loading={loading}
          // disabled={loading}
        />
        <Button
          text="Consultar"
          onClick={handleClick}
          // loading={loading}
          disabled={!file}
        />
      </Form>
    </Container>
  );
};

const Container = styled.div`
  align-items: flex-start;
  display: flex;
  justify-content: flex-start;
  width: 100%;

  /* @media screen and (max-width: 31.25em) {
    align-items: stretch;
    flex-direction: column;
  } */
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

  & > button {
    :not(:last-child) {
      margin-bottom: 2rem;
    }
  }

  /* @media screen and (max-width: 60em) {
    flex: 2;
  }
  @media screen and (max-width: 37.5em) {
    padding: 3rem 3rem;
  } */
`;

const HiddenInput = styled.input`
  display: none;
`;

const Label = styled.label`
  display: flex;
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 2.5rem;
`;

const FileName = styled.h4`
  display: flex;
  font-size: 2rem;
  font-weight: 400;
  margin-bottom: 2.5rem;
  margin-top: -1rem;
  padding-left: 3rem;
  color: var(--color-grey-dark-3);
`;

export default MultiRut;
