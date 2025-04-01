// src/components/ThemeTransition.js
import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useTheme } from '../context/ThemeContext';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const FullScreenOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ isDarkTheme }) => isDarkTheme ? '#121212' : '#f5f5f5'};
  z-index: 1000;
  pointer-events: none;
  animation: ${({ isAnimating }) => isAnimating ? fadeIn : fadeOut} 0.5s forwards;
  opacity: ${({ isAnimating }) => isAnimating ? 1 : 0};
`;

const ThemeTransition = () => {
    const { isDarkTheme } = useTheme();
    const [showOverlay, setShowOverlay] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        setShowOverlay(true);
        setIsAnimating(true);

        const timer = setTimeout(() => {
            setIsAnimating(false);
            setTimeout(() => setShowOverlay(false), 500);
        }, 500);

        return () => clearTimeout(timer);
    }, [isDarkTheme]);

    if (!showOverlay) return null;

    return <FullScreenOverlay isDarkTheme={isDarkTheme} isAnimating={isAnimating} />;
};

export default ThemeTransition;