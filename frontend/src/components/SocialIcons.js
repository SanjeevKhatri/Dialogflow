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
      <IconLink isDarkTheme={isDarkTheme} href="https://www.linkedin.com/in/sanjeevkhatri29" aria-label="LinkedIn">
        <FaLinkedin />
      </IconLink>
      <IconLink isDarkTheme={isDarkTheme} href="https://www.facebook.com/Pestilenc3" aria-label="Facebook">
        <FaFacebook />
      </IconLink>
      <IconLink isDarkTheme={isDarkTheme} href="https://twitter.com/Mr_Sanzeev" aria-label="Twitter">
        <FaTwitter />
      </IconLink>
      <IconLink isDarkTheme={isDarkTheme} href="https://www.instagram.com/sanzeev_official" aria-label="Instagram">
        <FaInstagram />
      </IconLink>
      <IconLink isDarkTheme={isDarkTheme} href="mailto:sanjeevkhatri29@gmail.com?Subject=From%20sanjeevkhatri.com.np" aria-label="Email">
        <FaEnvelope />
      </IconLink>
    </IconsContainer>
  );
};

export default SocialIcons;