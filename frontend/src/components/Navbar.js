// src/components/Navbar.js
import React, { useState } from 'react';
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

const NavLinks = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const NavLink = styled.a`
  color: ${({ isDarkTheme, isActive }) => 
    isActive
      ? isDarkTheme 
        ? 'var(--dark-accent)' 
        : 'var(--light-accent)'
      : isDarkTheme 
        ? 'rgba(255, 255, 255, 0.8)' 
        : 'rgba(0, 0, 0, 0.8)'};
  text-decoration: none;
  transition: all 0.3s ease;
  font-weight: ${({ isActive }) => isActive ? 'bold' : 'normal'};
  position: relative;
  
  &:hover {
    color: ${({ isDarkTheme }) => isDarkTheme ? 'var(--dark-accent)' : 'var(--light-accent)'};
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: ${({ isActive }) => isActive ? '100%' : '0'};
    height: 2px;
    background-color: ${({ isDarkTheme }) => 
      isDarkTheme ? 'var(--dark-accent)' : 'var(--light-accent)'};
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
`;

const Navbar = () => {
  const { isDarkTheme } = useTheme();
  const [activeLink, setActiveLink] = useState('home');

  const handleLinkClick = (linkName, event) => {
    if (linkName === 'contact') {
      // Open email client with specified email address
      window.location.href = 'mailto:sanjeevkhatri29@gmail.com';
    } else {
      setActiveLink(linkName);
    }
  };

  return (
    <NavContainer>
      <NavLinks>
        <NavLink
          isDarkTheme={isDarkTheme}
          href="/"
          isActive={activeLink === 'home'}
          onClick={(e) => handleLinkClick('home', e)}
        >
          Home
        </NavLink>

        <NavLink
          isDarkTheme={isDarkTheme}
          href="/contact"
          isActive={activeLink === 'contact'}
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('contact', e);
          }}
        >
          Contact Me
        </NavLink>

        <ThemeToggle />
      </NavLinks>
    </NavContainer>
  );
};

export default Navbar;