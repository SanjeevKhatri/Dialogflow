import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaHistory } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import ChatModal from './ChatModal';
import ChatHistory from './ChatHistory';

const FloatingButton = styled(motion.button)`
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: ${({ isDarkTheme }) =>
    isDarkTheme ? 'var(--dark-accent)' : 'var(--light-accent)'};
    color: ${({ isDarkTheme }) => isDarkTheme ? '#121212' : '#ffffff'};
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    z-index: 99;

    &:hover {
        transform: scale(1.05);
    }
`;

const ButtonsContainer = styled.div`
    position: fixed;
    bottom: 30px;
    right: 30px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    z-index: 99;
`;

const IconButton = styled(motion.button)`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: ${({ isDarkTheme }) =>
    isDarkTheme ? 'var(--dark-accent)' : 'var(--light-accent)'};
    color: ${({ isDarkTheme }) => isDarkTheme ? '#121212' : '#ffffff'};
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    cursor: pointer;

    &:hover {
        transform: scale(1.05);
    }
`;

const ChatButton = ({ onToggleChat, onToggleHistory }) => {
    const { isDarkTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);

    const toggleButtons = () => {
        setIsOpen(!isOpen);
    };

    return (
        <AnimatePresence>
            {isOpen ? (
                <ButtonsContainer>
                    <IconButton
                        isDarkTheme={isDarkTheme}
                        onClick={() => {
                            onToggleChat();
                            setIsOpen(false);
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ delay: 0.1 }}
                    >
                        <FaRobot />
                    </IconButton>
                    <IconButton
                        isDarkTheme={isDarkTheme}
                        onClick={() => {
                            onToggleHistory();
                            setIsOpen(false);
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                    >
                        <FaHistory />
                    </IconButton>
                    <FloatingButton
                        isDarkTheme={isDarkTheme}
                        onClick={toggleButtons}
                        whileTap={{ scale: 0.95 }}
                    >
                        <FaTimes />
                    </FloatingButton>
                </ButtonsContainer>
            ) : (
                <FloatingButton
                    isDarkTheme={isDarkTheme}
                    onClick={toggleButtons}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <FaRobot />
                </FloatingButton>
            )}
        </AnimatePresence>
    );
};

const ChatInterface = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);

    const handleToggleChat = () => {
        setIsModalOpen(!isModalOpen);
        if (isHistoryOpen) setIsHistoryOpen(false);
    };

    const handleToggleHistory = () => {
        setIsHistoryOpen(!isHistoryOpen);
        if (isModalOpen) setIsModalOpen(false);
    };

    return (
        <>
            <ChatButton
                onToggleChat={handleToggleChat}
                onToggleHistory={handleToggleHistory}
            />

            <AnimatePresence>
                {isModalOpen && <ChatModal onClose={() => setIsModalOpen(false)} />}
                {isHistoryOpen && <ChatHistory onClose={() => setIsHistoryOpen(false)} />}
            </AnimatePresence>
        </>
    );
};

export default ChatInterface;