import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaTimes, FaPaperPlane } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

// Styled components
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
    display: flex;
    flex-direction: column;
    gap: 15px;
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

const Message = styled.div`
  max-width: 80%;
  padding: 10px 15px;
  border-radius: 18px;
  word-wrap: break-word;
  align-self: ${({ isUser }) => isUser ? 'flex-end' : 'flex-start'};
  background-color: ${({ isUser, isDarkTheme }) =>
    isUser
        ? (isDarkTheme ? 'var(--dark-accent)' : 'var(--light-accent)')
        : (isDarkTheme ? 'var(--dark-input-bg)' : 'var(--light-input-bg)')};
  color: ${({ isUser, isDarkTheme }) =>
    isUser
        ? (isDarkTheme ? '#121212' : '#ffffff')
        : (isDarkTheme ? 'var(--dark-text)' : 'var(--light-text)')};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const TypingIndicator = styled.div`
  display: flex;
  padding: 10px 15px;
  align-self: flex-start;
  
  span {
    width: 8px;
    height: 8px;
    margin: 0 2px;
    background-color: ${({ isDarkTheme }) =>
    isDarkTheme ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
    border-radius: 50%;
    display: inline-block;
    animation: bounce 1.5s infinite ease-in-out;
    
    &:nth-child(1) { animation-delay: 0s; }
    &:nth-child(2) { animation-delay: 0.2s; }
    &:nth-child(3) { animation-delay: 0.4s; }
  }
  
  @keyframes bounce {
    0%, 60%, 100% { transform: translateY(0); }
    30% { transform: translateY(-5px); }
  }
`;

const ChatModal = ({ onClose }) => {
    const { isDarkTheme } = useTheme();
    const [messages, setMessages] = useState([
        { id: 1, text: "How can I help you today? Feel free to ask me about my work, experience, or anything else you'd like to know.", isUser: false }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [error, setError] = useState(null);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // Scroll to bottom when messages change
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Focus input on mount
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const generateSessionId = () => {
        if (!sessionStorage.getItem('chatSessionId')) {
            const sessionId = `session-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
            sessionStorage.setItem('chatSessionId', sessionId);
            return sessionId;
        }
        return sessionStorage.getItem('chatSessionId');
    };

    const sendMessage = async () => {
        if (inputValue.trim() === '') return;

        // Log user message
        console.log(`User message: "${inputValue}"`);

        // Add user message to the chat
        const userMessage = { id: Date.now(), text: inputValue, isUser: true };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);
        setError(null);

        const sessionId = generateSessionId();

        try {
            // Log the request being sent
            console.log(`Sending request to backend with sessionId: ${sessionId}`);

            // Call the Python API
            const response = await fetch('https://sanjeevkhatri.com/api/dialogflow', {
            // const response = await fetch('http://localhost:8000/api/dialogflow', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: userMessage.text,
                    session_id: sessionId
                }),
            });

            // Check if the response is successful
            if (!response.ok) {
                throw new Error(`Network response error: ${response.status}`);
            }

            // Parse the response
            const data = await response.json();

            // Log the response from the backend
            console.log('Bot response:', data.response);

            // Add bot response after a short delay to feel more natural
            setTimeout(() => {
                setIsTyping(false);
                setMessages(prev => [...prev, {
                    id: Date.now(),
                    text: data.response,
                    isUser: false
                }]);
            }, 500);

        } catch (error) {
            // Log errors
            console.error('Error:', error);
            setIsTyping(false);
            setError(error.message);

            setMessages(prev => [...prev, {
                id: Date.now(),
                text: `Sorry, I'm having trouble connecting to my services right now. (Error: ${error.message})`,
                isUser: false
            }]);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

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
                    <h3>Chat with Virtual Sanjeev</h3>
                    <CloseButton isDarkTheme={isDarkTheme} onClick={onClose}>
                        <FaTimes />
                    </CloseButton>
                </ModalHeader>
                <ModalContent isDarkTheme={isDarkTheme}>
                    {messages.map((message) => (
                        <Message
                            key={message.id}
                            isUser={message.isUser}
                            isDarkTheme={isDarkTheme}
                        >
                            {message.text}
                        </Message>
                    ))}
                    {isTyping && (
                        <TypingIndicator isDarkTheme={isDarkTheme}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </TypingIndicator>
                    )}
                    <div ref={messagesEndRef} />
                </ModalContent>
                <ModalFooter isDarkTheme={isDarkTheme}>
                    <InputField
                        ref={inputRef}
                        isDarkTheme={isDarkTheme}
                        type="text"
                        placeholder="Type your message..."
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                    />
                    <SendButton isDarkTheme={isDarkTheme} onClick={sendMessage}>
                        <FaPaperPlane size={14} />
                    </SendButton>
                </ModalFooter>
            </ModalContainer>
        </ModalOverlay>
    );
};

export default ChatModal;
