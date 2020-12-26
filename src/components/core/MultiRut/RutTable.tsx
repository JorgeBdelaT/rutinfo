import React from 'react';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';

interface RutTableProps {
  data: {
    [key: string]: string;
  }[];
  columns: { name: string; selector: string }[];
}

const RutTable: React.FC<RutTableProps> = ({ data, columns }) => {
  return (
    <Container>
      <DataTable
        pagination
        highlightOnHover
        title="Ruts consultados"
        columns={columns}
        data={data}
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
`;

export default RutTable;
