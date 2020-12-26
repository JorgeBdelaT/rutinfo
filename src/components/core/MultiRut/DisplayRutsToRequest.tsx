import React from 'react';
import styled from 'styled-components';

interface DisplayRutsToRequestProps {
  ruts?: string[];
  setRuts?: React.Dispatch<React.SetStateAction<string[] | undefined>>;
}

const DisplayRutsToRequest: React.FC<DisplayRutsToRequestProps> = ({
  ruts,
  setRuts,
}) => {
  const displayContent = () => {
    if (!ruts || !ruts.length) {
      return <p>Selecciona un archivo para visualizar los ruts a consultar</p>;
    }

    return (
      <>
        <Label>Ruts a consultar</Label>
        <ValuesContainer>
          {ruts.map((rut) => {
            return (
              <Value key={rut}>
                <p>{rut}</p>
                {setRuts && (
                  <Icon
                    onClick={() =>
                      setRuts!(ruts.filter((_rut) => _rut !== rut))
                    }
                  >
                    &times;
                  </Icon>
                )}
              </Value>
            );
          })}
        </ValuesContainer>
      </>
    );
  };

  return <Container>{displayContent()}</Container>;
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
`;

const Label = styled.h4`
  font-weight: 600;
  margin-bottom: 2rem;
`;

const ValuesContainer = styled.div`
  max-height: 30rem;
  overflow-y: auto;
  width: 100%;
`;

const Value = styled.div`
  align-items: center;
  background-color: var(--color-grey-light-4);
  border-radius: 999px;
  color: var(--color-grey-dark-1);
  display: flex;
  font-weight: 400;
  justify-content: space-between;
  padding: 0.8rem 3.4rem;
  padding-right: 1rem;
  transition: all 0.3s;
  width: 100%;

  :not(:last-of-type) {
    margin-bottom: 1.6rem;
  }

  :hover {
    background-color: var(--color-grey-light-3);

    & > a {
      opacity: 1;
    }
  }
`;

const Icon = styled.a`
  align-items: center;
  border: 2px solid var(--color-grey-light-4);
  border-radius: 100%;
  color: var(--color-grey-light-4);
  cursor: pointer;
  display: flex;
  font-weight: bold;
  height: 3rem;
  justify-content: center;
  opacity: 0;
  transition: all 0.3s;
  width: 3rem;

  :hover {
    border: 2px solid var(--color-grey-dark-3);
    color: var(--color-grey-dark-3);
    transform: scale(1.1);
  }

  :active {
    transform: scale(0.95);
  }
`;

export default DisplayRutsToRequest;
