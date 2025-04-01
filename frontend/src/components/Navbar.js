// src/components/Navbar.js
import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`;

const Logo = styled.div`
  font-weight: bold;
  font-size: 1.5rem;
  color: ${({ isDarkTheme }) => isDarkTheme ? 'var(--dark-accent)' : 'var(--light-accent)'};
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const NavLink = styled.a`
  color: ${({ isDarkTheme }) => isDarkTheme ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'};
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    color: ${({ isDarkTheme }) => isDarkTheme ? 'var(--dark-accent)' : 'var(--light-accent)'};
  }
`;

const Navbar = () => {
  const { isDarkTheme } = useTheme();

  return (
    <NavContainer>
      {/*<Logo isDarkTheme={isDarkTheme}>Sanjeev</Logo>*/}
      <NavLinks>
        <NavLink isDarkTheme={isDarkTheme} href="#">Home</NavLink>
        <NavLink isDarkTheme={isDarkTheme} href="#">Contact Me</NavLink>
        <ThemeToggle />
      </NavLinks>
    </NavContainer>
  );
};

export default Navbar;