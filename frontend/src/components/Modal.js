// components/Modal.js
import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  opacity: ${props => (props.isOpen ? '1' : '0')};
  visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
  transition: opacity 0.3s ease, visibility 0.3s ease;
`;

const ModalContent = styled.div`
  background-color: ${({ isDarkTheme }) =>
    isDarkTheme ? '#1a1a1a' : '#f5f5f5'}; /* Changed to be more distinct from main background */
  border-radius: 8px;
  max-width: 800px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  
  /* Scrollbar styling */
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${({ isDarkTheme }) =>
    isDarkTheme ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${({ isDarkTheme }) =>
    isDarkTheme ? 'var(--dark-accent)' : 'var(--light-accent)'};
    border-radius: 4px;
  }
`;

const CloseButtonContainer = styled.div`
  position: sticky;
  top: 0;
  right: 0;
  padding: 15px;
  text-align: right;
  z-index: 20;
  background-color: ${({ isDarkTheme }) =>
    isDarkTheme ? 'rgba(26, 26, 26, 0.9)' : 'rgba(245, 245, 245, 0.9)'};
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
`;

const CloseButton = styled.button`
  background: ${({ isDarkTheme }) => 
    isDarkTheme ? 'var(--dark-accent)' : 'var(--light-accent)'};
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  cursor: pointer;
  color: white;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
    opacity: 0.9;
  }
`;

const ModalWrapper = styled.div`
  padding-top: 10px; /* Add some space after the close button */
`;

const Modal = ({ isOpen, onClose, children }) => {
    const { isDarkTheme } = useTheme();
    const modalRef = useRef();

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        const handleClickOutside = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
            document.addEventListener('mousedown', handleClickOutside);
            // Prevent body scrolling when modal is open
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.removeEventListener('mousedown', handleClickOutside);
            // Restore body scrolling when modal is closed
            document.body.style.overflow = 'auto';
        };
    }, [isOpen, onClose]);

    return (
        <ModalOverlay isOpen={isOpen}>
            <ModalContent ref={modalRef} isDarkTheme={isDarkTheme}>
                <CloseButtonContainer isDarkTheme={isDarkTheme}>
                    <CloseButton onClick={onClose} isDarkTheme={isDarkTheme}>×</CloseButton>
                </CloseButtonContainer>
                <ModalWrapper>
                    {children}
                </ModalWrapper>
            </ModalContent>
        </ModalOverlay>
    );
};

export default Modal;