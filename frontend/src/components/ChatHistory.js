import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaTimes, FaArrowLeft } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

// Styled components
const HistoryContainer = styled(motion.div)`
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 450px;
    height: 550px;
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

const Header = styled.div`
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

const BackButton = styled(CloseButton)`
    margin-right: 10px;
`;

const Content = styled.div`
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    color: ${({ isDarkTheme }) =>
    isDarkTheme ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const SessionItem = styled.div`
    padding: 15px;
    border-radius: 10px;
    background-color: ${({ isDarkTheme }) =>
    isDarkTheme ? 'var(--dark-input-bg)' : 'var(--light-input-bg)'};
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }
`;

const SessionHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
`;

const SessionTitle = styled.h4`
    margin: 0;
    color: ${({ isDarkTheme }) =>
    isDarkTheme ? 'var(--dark-text)' : 'var(--light-text)'};
`;

const MessageCount = styled.span`
    font-size: 0.9em;
    color: ${({ isDarkTheme }) =>
    isDarkTheme ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
`;

const LastActivity = styled.div`
    font-size: 0.8em;
    color: ${({ isDarkTheme }) =>
    isDarkTheme ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
`;

const MessageItem = styled.div`
    margin-bottom: 20px;
`;

const MessagePair = styled.div`
    margin-bottom: 15px;
`;

const UserMessage = styled.div`
    max-width: 80%;
    padding: 10px 15px;
    border-radius: 18px;
    word-wrap: break-word;
    align-self: flex-end;
    margin-left: auto;
    background-color: ${({ isDarkTheme }) =>
    isDarkTheme ? 'var(--dark-accent)' : 'var(--light-accent)'};
    color: ${({ isDarkTheme }) => isDarkTheme ? '#121212' : '#ffffff'};
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    margin-bottom: 8px;
`;

const BotMessage = styled.div`
    max-width: 80%;
    padding: 10px 15px;
    border-radius: 18px;
    word-wrap: break-word;
    align-self: flex-start;
    background-color: ${({ isDarkTheme }) =>
    isDarkTheme ? 'var(--dark-input-bg)' : 'var(--light-input-bg)'};
    color: ${({ isDarkTheme }) =>
    isDarkTheme ? 'var(--dark-text)' : 'var(--light-text)'};
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const MessageTime = styled.div`
    font-size: 0.7em;
    text-align: right;
    margin-top: 2px;
    color: ${({ isDarkTheme }) =>
    isDarkTheme ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
`;

const EmptyState = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: ${({ isDarkTheme }) =>
    isDarkTheme ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
    text-align: center;
`;

const LoadingState = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
`;

const ChatHistory = ({ onClose }) => {
    const { isDarkTheme } = useTheme();
    const [sessions, setSessions] = useState([]);
    const [currentSession, setCurrentSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchSessions();
    }, []);

    const fetchSessions = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8000/api/chat-history');
            const result = await response.json();

            if (result.success) {
                setSessions(result.data);
            } else {
                setError(result.error || 'Failed to fetch chat history');
            }
        } catch (err) {
            setError('Error connecting to server');
            console.error('Error fetching sessions:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchSessionDetails = async (sessionId) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8000/api/chat-session?session_id=${sessionId}`);
            const result = await response.json();

            if (result.success) {
                setCurrentSession(result.data);
            } else {
                setError(result.error || 'Failed to fetch session details');
            }
        } catch (err) {
            setError('Error connecting to server');
            console.error('Error fetching session details:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        setCurrentSession(null);
        setError(null);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString();
    };

    return (
        <HistoryContainer
            isDarkTheme={isDarkTheme}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: 'spring', damping: 25 }}
        >
            <Header isDarkTheme={isDarkTheme}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {currentSession && (
                        <BackButton isDarkTheme={isDarkTheme} onClick={handleBack}>
                            <FaArrowLeft />
                        </BackButton>
                    )}
                    <h3>{currentSession ? 'Chat Session' : 'Chat History'}</h3>
                </div>
                <CloseButton isDarkTheme={isDarkTheme} onClick={onClose}>
                    <FaTimes />
                </CloseButton>
            </Header>

            <Content isDarkTheme={isDarkTheme}>
                {loading ? (
                    <LoadingState>Loading...</LoadingState>
                ) : error ? (
                    <EmptyState isDarkTheme={isDarkTheme}>
                        <p>Error: {error}</p>
                    </EmptyState>
                ) : currentSession ? (
                    // Detailed session view
                    <>
                        <div>
                            <h4>Session: {currentSession.session_id}</h4>
                            <p>Created: {formatDate(currentSession.created_at)}</p>
                        </div>

                        {currentSession.messages.length > 0 ? (
                            currentSession.messages.map((item) => (
                                <MessagePair key={item.id}>
                                    <UserMessage isDarkTheme={isDarkTheme}>
                                        {item.message}
                                        <MessageTime isDarkTheme={isDarkTheme}>
                                            {formatDate(item.timestamp)}
                                        </MessageTime>
                                    </UserMessage>
                                    <BotMessage isDarkTheme={isDarkTheme}>
                                        {item.response}
                                    </BotMessage>
                                </MessagePair>
                            ))
                        ) : (
                            <EmptyState isDarkTheme={isDarkTheme}>
                                <p>No messages in this session.</p>
                            </EmptyState>
                        )}
                    </>
                ) : (
                    // Sessions list view
                    <>
                        {sessions.length > 0 ? (
                            sessions.map((session) => (
                                <SessionItem
                                    key={session.session_id}
                                    isDarkTheme={isDarkTheme}
                                    onClick={() => fetchSessionDetails(session.session_id)}
                                >
                                    <SessionHeader>
                                        <SessionTitle isDarkTheme={isDarkTheme}>
                                            Session {session.session_id.substring(0, 10)}...
                                        </SessionTitle>
                                        <MessageCount isDarkTheme={isDarkTheme}>
                                            {session.message_count} messages
                                        </MessageCount>
                                    </SessionHeader>
                                    <LastActivity isDarkTheme={isDarkTheme}>
                                        Last active: {formatDate(session.last_activity)}
                                    </LastActivity>
                                </SessionItem>
                            ))
                        ) : (
                            <EmptyState isDarkTheme={isDarkTheme}>
                                <p>No chat sessions found.</p>
                            </EmptyState>
                        )}
                    </>
                )}
            </Content>
        </HistoryContainer>
    );
};

export default ChatHistory;