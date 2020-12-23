import React from 'react';
import styled from 'styled-components';

interface SectionLayoutProps {
  children: React.ReactNode;
}

const SectionLayout: React.FC<SectionLayoutProps> = ({ children }) => {
  return <Section>{children}</Section>;
};

const Section = styled.section`
  position: relative;
`;
export default SectionLayout;
