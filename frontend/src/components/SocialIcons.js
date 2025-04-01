// src/components/SocialIcons.js
import React from 'react';
import styled from 'styled-components';
import { FaLinkedin, FaFacebook, FaTwitter, FaInstagram, FaEnvelope } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const IconsContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
`;

const IconLink = styled.a`
  color: ${({ isDarkTheme }) => isDarkTheme ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)'};
  font-size: 24px;
  transition: all 0.3s ease;
  
  &:hover {
    color: ${({ isDarkTheme }) => isDarkTheme ? 'var(--dark-accent)' : 'var(--light-accent)'};
    transform: translateY(-3px);
  }
`;

const SocialIcons = () => {
  const { isDarkTheme } = useTheme();

  return (
    <IconsContainer>
      <IconLink isDarkTheme={isDarkTheme} href="#" aria-label="LinkedIn">
        <FaLinkedin />
      </IconLink>
      <IconLink isDarkTheme={isDarkTheme} href="#" aria-label="Facebook">
        <FaFacebook />
      </IconLink>
      <IconLink isDarkTheme={isDarkTheme} href="#" aria-label="Twitter">
        <FaTwitter />
      </IconLink>
      <IconLink isDarkTheme={isDarkTheme} href="#" aria-label="Instagram">
        <FaInstagram />
      </IconLink>
      <IconLink isDarkTheme={isDarkTheme} href="#" aria-label="Email">
        <FaEnvelope />
      </IconLink>
    </IconsContainer>
  );
};

export default SocialIcons;