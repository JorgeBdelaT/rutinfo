import React from 'react';
import styled from 'styled-components';

interface SectionLayoutProps {
  children: React.ReactNode;
}

const SectionLayout: React.FC<SectionLayoutProps> = ({ children }) => {
  return <Section>{children}</Section>;
};

const Section = styled.section`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100vw;
`;
export default SectionLayout;
