import React from 'react';
import styled from 'styled-components';

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <HeaderLogo href="/">Rut Info</HeaderLogo>
      <HeaderLink target="blank" href="https://github.com/JorgeBdelaT/rutinfo">
        Github
      </HeaderLink>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  align-items: center;
  background-color: var(--color-primary);
  box-shadow: 0px 5px 8px 0px rgba(212, 210, 212, 1);
  color: var(--color-white);
  display: flex;
  font-size: 1.8rem;
  justify-content: space-between;
  margin-bottom: 5rem;
  padding: 1rem 10rem;
  width: 100vw;
`;

const HeaderLink = styled.a`
  &,
  &:visited,
  &:link {
    color: var(--color-white);
    cursor: pointer;
    text-decoration: none;
    transition: all 0.2s;
  }

  :hover {
    color: var(--color-grey-light-4);
  }
`;

const HeaderLogo = styled(HeaderLink)`
  &,
  &:visited,
  &:link {
    font-size: 3.2rem;
    font-weight: 600;
    letter-spacing: 1px;
  }

  :hover {
    color: var(--color-grey-light-4);
  }
`;

export default Header;