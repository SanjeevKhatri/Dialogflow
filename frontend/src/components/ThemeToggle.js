// src/components/ThemeToggle.js
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const ToggleContainer = styled.div`
    position: fixed;
    right: 20px;
    top: 20px;
    z-index: 100;
`;

const ToggleTrack = styled.div`
  background: ${({ isDarkTheme }) =>
    isDarkTheme
        ? 'linear-gradient(to right, #2c3e50, #4a69bd)'
        : 'linear-gradient(to right, #e67e22, #f9ca24)'};
  border-radius: 30px;
  width: 80px;
  height: 40px;
  display: flex;
  align-items: center;
  padding: 5px;
  cursor: pointer;
  position: relative;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
`;

const SliderButton = styled(motion.div)`
  background: ${({ isDarkTheme }) =>
    isDarkTheme ? '#f1c40f' : '#ecf0f1'};
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  z-index: 2;
  color: ${({ isDarkTheme }) => isDarkTheme ? '#f57c00' : '#3498db'};
`;

const IconContainer = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 12px;
  color: white;
`;

const ThemeToggle = () => {
    const { isDarkTheme, toggleTheme } = useTheme();

    return (
        <ToggleContainer>
            <ToggleTrack
                isDarkTheme={isDarkTheme}
                onClick={toggleTheme}
            >
                <IconContainer>
                    <FaSun />
                    <FaMoon />
                </IconContainer>
                <SliderButton
                    isDarkTheme={isDarkTheme}
                    initial={false}
                    animate={{ x: isDarkTheme ? 40 : 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17
                    }}
                >
                    {isDarkTheme ? <FaMoon /> : <FaSun />}
                </SliderButton>
            </ToggleTrack>
        </ToggleContainer>
    );
};

export default ThemeToggle;