import React, { useState } from 'react';
import styled from 'styled-components';

import { SectionLayout } from '../components/ui/';
import { SingleRut, MultiRut } from '../components/core/';
import { SwitchInput } from '../components/basics/';

const MainScreen: React.FC = () => {
  const [singleRutOption, setSingleRutOption] = useState(false);

  return (
    <SectionLayout>
      <SwitchesContainer>
        <SwitchContainer>
          <SwitchInput
            label="Consultar solo un rut"
            id="single-rut-switch"
            onToggle={() => setSingleRutOption((c) => !c)}
            isOn={singleRutOption}
          />
        </SwitchContainer>
        <SwitchContainer>
          <SwitchInput
            label="Consultar multiples ruts"
            id="multiple-rut-switch"
            onToggle={() => setSingleRutOption((c) => !c)}
            isOn={!singleRutOption}
          />
        </SwitchContainer>
      </SwitchesContainer>
      {singleRutOption && <SingleRut />}
      {!singleRutOption && <MultiRut />}
    </SectionLayout>
  );
};

const SwitchesContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;

  @media screen and (max-width: 31.25em) {
    align-items: stretch;
    flex-direction: column;
  }
`;

const SwitchContainer = styled.div`
  background-color: var(--color-white);
  border-radius: 9px;
  box-shadow: 0px 5px 8px 0px rgba(212, 210, 212, 1);
  flex: 1;
  margin: 2rem;
  padding: 4rem 5rem;

  @media screen and (max-width: 37.5em) {
    padding: 3rem 3rem;
  }
`;

export default MainScreen;
