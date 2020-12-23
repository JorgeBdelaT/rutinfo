import React, { useState } from 'react';
import styled from 'styled-components';

import { SectionLayout } from '../components/ui/';
import { SingleRutInput } from '../components/core/';
import { SwitchInput } from '../components/basics/';

const MainScreen: React.FC = () => {
  const [singleRutOption, setSingleRutOption] = useState(true);

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
      {singleRutOption && <SingleRutInput />}
      {!singleRutOption && <div>sube un excel con ruts</div>}
    </SectionLayout>
  );
};

const SwitchesContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
`;

const SwitchContainer = styled.div`
  background-color: var(--color-white);
  border-radius: 9px;
  flex: 1;
  margin: 2rem;
  padding: 4rem 5rem;
`;

export default MainScreen;
