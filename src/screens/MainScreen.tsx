import React, { useState } from 'react';

import { SectionLayout } from '../components/ui/';
import { SingleRutInput } from '../components/core/';
import { SwitchInput } from '../components/basics/';

const MainScreen: React.FC = () => {
  const [singleRutOption, setSingleRutOption] = useState(true);

  return (
    <SectionLayout>
      <SwitchInput
        label="Consultar solo un rut"
        id="single-rut-switch"
        onToggle={() => setSingleRutOption((c) => !c)}
        isOn={singleRutOption}
      />
      <SwitchInput
        label="Consultar multiples ruts"
        id="multiple-rut-switch"
        onToggle={() => setSingleRutOption((c) => !c)}
        isOn={!singleRutOption}
      />
      {singleRutOption && <SingleRutInput />}
      {!singleRutOption && <div>sube un excel con ruts</div>}
    </SectionLayout>
  );
};

export default MainScreen;
