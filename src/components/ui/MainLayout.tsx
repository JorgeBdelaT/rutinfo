import React from 'react';
import styled from 'styled-components';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return <Container>{children}</Container>;
};

const Container = styled.main`
  min-height: 100vh;

  section {
    padding: 0 25rem;
  }
`;

export default MainLayout;
