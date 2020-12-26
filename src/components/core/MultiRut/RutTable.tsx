import React from 'react';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';

import { useNotifications, useDownloadRuts } from '../../../hooks';
import { TableKeysType } from '../../../types/RutInfoType';
import { DOWNLOAD_FAILED } from '../../../utils/constants';
import { Button } from '../../basics';

interface RutTableProps {
  data: {
    [key in TableKeysType]: string;
  }[];
  columns: { name: string; selector: string }[];
}

const RutTable: React.FC<RutTableProps> = ({ data, columns }) => {
  const [
    triggerDownload,
    { loading: downloaLoading, error: downloadError },
  ] = useDownloadRuts(data);
  const { addNotification } = useNotifications();

  if (downloadError) {
    addNotification({ type: 'error', message: DOWNLOAD_FAILED });
  }

  return (
    <Container>
      <DataTable
        pagination
        highlightOnHover
        title="Ruts consultados"
        columns={columns}
        data={data}
      />
      <Button
        text="Descargar Excel"
        onClick={triggerDownload}
        loading={downloaLoading}
        disabled={!data || downloaLoading}
      />
    </Container>
  );
};

const Container = styled.div`
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

  .rdt_TableHeader > div {
    color: var(--color-primary);
    font-family: inherit;
    font-size: 2rem;
    font-weight: 600;
  }

  & > button {
    margin-top: 3rem;
  }
`;

export default RutTable;
