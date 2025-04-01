// src/components/ChatModal.js
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ isDarkTheme }) => 
    isDarkTheme ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.3)'};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const ModalContainer = styled(motion.div)`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 350px;
  height: 450px;
  background-color: ${({ isDarkTheme }) => 
    isDarkTheme ? 'var(--dark-component-bg)' : 'var(--light-component-bg)'};
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px ${({ isDarkTheme }) => 
    isDarkTheme ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.2)'};
  display: flex;
  flex-direction: column;
  z-index: 101;
`;

const ModalHeader = styled.div`
  background-color: ${({ isDarkTheme }) => 
    isDarkTheme ? 'var(--dark-accent)' : 'var(--light-accent)'};
  color: ${({ isDarkTheme }) => isDarkTheme ? '#121212' : '#ffffff'};
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ isDarkTheme }) => isDarkTheme ? '#121212' : '#ffffff'};
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  color: ${({ isDarkTheme }) => 
    isDarkTheme ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
`;

const ModalFooter = styled.div`
  border-top: 1px solid ${({ isDarkTheme }) => 
    isDarkTheme ? 'var(--dark-border)' : 'var(--light-border)'};
  padding: 15px;
  display: flex;
`;

const InputField = styled.input`
  flex: 1;
  padding: 10px 15px;
  border-radius: 50px;
  border: none;
  background-color: ${({ isDarkTheme }) => 
    isDarkTheme ? 'var(--dark-input-bg)' : 'var(--light-input-bg)'};
  color: ${({ isDarkTheme }) => 
    isDarkTheme ? 'var(--dark-text)' : 'var(--light-text)'};
  outline: none;
  
  &:focus {
    box-shadow: 0 0 0 2px ${({ isDarkTheme }) => 
      isDarkTheme ? 'var(--dark-accent)' : 'var(--light-accent)'};
  }
`;

const SendButton = styled.button`
  margin-left: 10px;
  background-color: ${({ isDarkTheme }) => 
    isDarkTheme ? 'var(--dark-accent)' : 'var(--light-accent)'};
  color: ${({ isDarkTheme }) => isDarkTheme ? '#121212' : '#ffffff'};
  border: none;
  border-radius: 50px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const ChatModal = ({ onClose }) => {
  const { isDarkTheme } = useTheme();

  return (
    <ModalOverlay
      isDarkTheme={isDarkTheme}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <ModalContainer
        isDarkTheme={isDarkTheme}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ type: 'spring', damping: 25 }}
        onClick={(e) => e.stopPropagation()}
      >
        <ModalHeader isDarkTheme={isDarkTheme}>
          <h3>Chat with Sanjeev</h3>
          <CloseButton isDarkTheme={isDarkTheme} onClick={onClose}>
            <FaTimes />
          </CloseButton>
        </ModalHeader>
        <ModalContent isDarkTheme={isDarkTheme}>
          <p>
            How can I help you today? Feel free to ask me about my work, experience,
            or anything else you'd like to know.
          </p>
        </ModalContent>
        <ModalFooter isDarkTheme={isDarkTheme}>
          <InputField
            isDarkTheme={isDarkTheme}
            type="text"
            placeholder="Type your message..."
          />
          <SendButton isDarkTheme={isDarkTheme}>→</SendButton>
        </ModalFooter>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default ChatModal;