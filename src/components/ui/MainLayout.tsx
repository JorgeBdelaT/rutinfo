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
    padding: 10rem 25rem;

    @media screen and (max-width: 87.5em) {
      padding: 10rem 12rem;
    }
    @media screen and (max-width: 56.25em) {
      padding: 10rem 8rem;
    }
    @media screen and (max-width: 37.5em) {
      padding: 10rem 2rem;
    }
  }
`;

export default MainLayout;
