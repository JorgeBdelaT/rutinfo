import React from 'react';
import styled from 'styled-components';

import {
  RutData,
  ActivityKeysType,
  ActivityType,
} from '../../types/RutInfoType';
import { WELCOME_MSG } from '../../utils/constants';

interface SingleRutInfoProps {
  data?: RutData;
}

const SingleRutInfo: React.FC<SingleRutInfoProps> = ({ data }) => {
  const mapActivityKeyToName = (key: string) => {
    switch (key) {
      case 'giro':
        return 'Giro:';
      case 'codigo':
        return 'Código:';
      case 'categoria':
        return 'Categoría:';
      case 'afecta':
        return 'Afecta:';
      default:
        return null;
    }
  };

  const mapActivityKeyToValue = (
    record: ActivityType,
    key: ActivityKeysType,
  ) => {
    switch (key) {
      case 'afecta':
        return record[key] ? 'SI' : 'NO';
      default:
        return record[key];
    }
  };

  const displayContent = () => {
    if (!data) {
      return <p>{WELCOME_MSG}</p>;
    }

    return (
      <>
        <InfoBox>
          <InfoLabel>Rut:</InfoLabel>
          <InfoValue>{data.rut}</InfoValue>
        </InfoBox>
        <InfoBox>
          <InfoLabel>Razón social:</InfoLabel>
          <InfoValue>{data.razon_social}</InfoValue>
        </InfoBox>
        <InfoBox>
          <InfoLabel>Actividades:</InfoLabel>
        </InfoBox>
        <Activities>
          {!data.actividades.length && <p>Sin actividades registradas</p>}
          {data.actividades.map((record) => {
            return (
              <Activity key={`record-${record.codigo}-de-${data.rut}`}>
                {Object.keys(record).map((_key) => {
                  const key = _key as ActivityKeysType;
                  return (
                    <ActivityItem key={`actividad-${key}-de-${data.rut}`}>
                      <InfoLabel>{mapActivityKeyToName(key)}</InfoLabel>
                      <InfoValue>
                        {mapActivityKeyToValue(record, key)}
                      </InfoValue>
                    </ActivityItem>
                  );
                })}
              </Activity>
            );
          })}
        </Activities>
      </>
    );
  };

  return <Container>{displayContent()}</Container>;
};

const Container = styled.div`
  align-self: stretch;
  background-color: var(--color-white);
  border-radius: 9px;
  box-shadow: 0px 5px 8px 0px rgba(212, 210, 212, 1);
  display: flex;
  flex: 2;
  flex-direction: column;
  margin: 2rem;
  padding: 4rem 5rem;

  @media screen and (max-width: 37.5em) {
    padding: 3rem 3rem;
  }
`;

const InfoBox = styled.div`
  align-items: center;
  display: flex;
  font-size: 2rem;
  justify-content: flex-start;

  :not(:last-of-type) {
    margin-bottom: 1.8rem;
  }
`;

const InfoLabel = styled.h4`
  font-weight: 600;
  margin-right: 1.2rem;
`;

const InfoValue = styled.p`
  color: var(--color-grey-dark-2);
  font-weight: 400;
`;

const Activities = styled(InfoBox)`
  align-items: flex-start;
  flex-direction: column;
  justify-content: flex-start;
  max-height: 25rem;
  overflow-y: auto;

  & > p {
    color: var(--color-grey-dark-2);
    font-weight: 400;
    margin-left: 3.6rem;
  }
`;

const Activity = styled.div`
  align-items: flex-start;
  background-color: var(--color-grey-light-2);
  border-radius: 9px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 2rem 0;
  width: 100%;

  :not(:last-of-type) {
    margin-bottom: 1.6rem;
  }

  :not(:first-of-type) {
    margin-top: 1.6rem;
  }
`;

const ActivityItem = styled(InfoBox)`
  font-size: 1.4rem;
  margin-left: 3.6rem;

  :not(:last-of-type) {
    margin-bottom: 1.6rem;
  }
`;

export default SingleRutInfo;
