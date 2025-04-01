// src/components/ChatButton.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import ChatModal from './ChatModal';
import { FaComment } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const ButtonContainer = styled(motion.button)`
  position: fixed;
  z-index: 1;
  bottom: 30px;
  right: 30px;
  background-color: ${({ isDarkTheme }) => isDarkTheme ? 'var(--dark-accent)' : 'var(--light-accent)'};
  color: ${({ isDarkTheme }) => isDarkTheme ? '#121212' : '#ffffff'};
  border: none;
  border-radius: 50px;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 20px ${({ isDarkTheme }) => 
    isDarkTheme ? 'rgba(255, 165, 0, 0.3)' : 'rgba(245, 124, 0, 0.3)'};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px ${({ isDarkTheme }) => 
      isDarkTheme ? 'rgba(255, 165, 0, 0.4)' : 'rgba(245, 124, 0, 0.4)'};
  }
`;

const ChatButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isDarkTheme } = useTheme();

  return (
    <>
      <ButtonContainer
        isDarkTheme={isDarkTheme}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsModalOpen(true)}
      >
        <FaComment />
        Chat with Virtual Me
      </ButtonContainer>

      <AnimatePresence>
        {isModalOpen && <ChatModal onClose={() => setIsModalOpen(false)} />}
      </AnimatePresence>
    </>
  );
};

export default ChatButton;