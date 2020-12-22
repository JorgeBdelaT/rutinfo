import React from 'react';

import { MainScreen } from './screens';
import { MainLayout, Header } from './components/ui/';

const App: React.FC = () => {
  return (
    <MainLayout>
      <Header />
      <MainScreen />
    </MainLayout>
  );
};

export default App;
