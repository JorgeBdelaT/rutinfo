/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';

import { useNotifications, useLoadRuts, useMultiRutInfo } from '../../../hooks';
import {
  FILE_SUCCESSFULLY_UPLOADED,
  REQUEST_ERROR_MSG,
  RUT_TABLE_COLUMNS,
} from '../../../utils/constants';
import { Button } from '../../basics';
import DisplayRutsToRequest from './DisplayRutsToRequest';
import RutTable from './RutTable';

const MultiRut: React.FC = () => {
  const { addNotification } = useNotifications();
  const inputRef = useRef<any>();
  const { file, ruts, handleFileUpload } = useLoadRuts();
  const [rutsToRequest, setRutsToRequest] = useState<string[]>();
  const [displayLabel, setDisplayLabel] = useState(true);
  const [prepareRequest, { data, loading, error }] = useMultiRutInfo();

  const handleUploadFileClick = (e: React.MouseEvent | React.FormEvent) => {
    e.preventDefault();
    inputRef.current!.click();
    setDisplayLabel(true);
  };

  const handleRequestClick = (e: React.MouseEvent | React.FormEvent) => {
    e.preventDefault();
    prepareRequest(rutsToRequest!);
    setDisplayLabel(false);
    setRutsToRequest([]);
  };

  useEffect(() => {
    if (ruts) {
      setRutsToRequest(ruts);
      addNotification({ type: 'success', message: FILE_SUCCESSFULLY_UPLOADED });
    }
  }, [ruts]);

  useEffect(() => {
    if (error) {
      addNotification({ type: 'error', message: REQUEST_ERROR_MSG });
    }
  }, [error]);

  const displayFileName = () => {
    if (!file || !displayLabel) return null;

    return <FileName>{file.name}</FileName>;
  };

  const getTableData = useCallback(() => {
    if (!data) return [];

    return data.map((record) => {
      return {
        rut: record.rut,
        razon_social: !record.error ? record.razon_social : record.error,
      };
    });
  }, [data]);

  return (
    <>
      <Container>
        <Form>
          <HiddenInput
            ref={inputRef}
            accept=".xlsx, .xls, .csv"
            type="file"
            onChange={handleFileUpload}
          />
          <Label>Sube un excel con ruts a consultar</Label>
          {displayFileName()}
          <Button
            text="Elegir archivo"
            onClick={handleUploadFileClick}
            disabled={loading}
          />
          <Button
            text="Consultar"
            onClick={handleRequestClick}
            loading={loading}
            disabled={!file || !rutsToRequest?.length || loading}
          />
        </Form>
        <DisplayRutsToRequest ruts={rutsToRequest} setRuts={setRutsToRequest} />
      </Container>
      <Container>
        {data && <RutTable data={getTableData()} columns={RUT_TABLE_COLUMNS} />}
      </Container>
    </>
  );
};

const Container = styled.div`
  align-items: stretch;
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
      margin-bottom: 3rem;
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
  margin-bottom: 3rem;
`;

const FileName = styled.h4`
  color: var(--color-grey-dark-3);
  display: flex;
  font-size: 2rem;
  font-weight: 400;
  margin-bottom: 3rem;
  margin-top: -1rem;
  padding-left: 3rem;
`;

export default MultiRut;
