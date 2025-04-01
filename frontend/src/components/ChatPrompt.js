// src/components/ChatPrompt.js (with properly connected arrow)
import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';

const PromptContainer = styled.div`
    position: fixed;
    bottom: 130px;
    right: 30px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    z-index: 1;
`;

const PromptText = styled.p`
    color: ${({ isDarkTheme }) => isDarkTheme ? 'var(--dark-text)' : 'var(--light-text)'};
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 35px;
    text-align: center;
    background: ${({ isDarkTheme }) => isDarkTheme ? 'rgba(18, 18, 18, 0.85)' : 'rgba(255, 255, 255, 0.85)'};
    padding: 12px 18px;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    letter-spacing: 0.3px;
    border: 1px solid ${({ isDarkTheme }) => isDarkTheme ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
`;

const Arrow = styled.svg`
    position: absolute;
    right: 30px;
    bottom: -45px;
`;

const ChatPrompt = () => {
    const { isDarkTheme } = useTheme();

    // Define precise colors
    const primaryColor = isDarkTheme ? 'var(--dark-accent)' : 'var(--light-accent)';
    const secondaryColor = isDarkTheme ? '#E8B730' : '#E86230';

    return (
        <PromptContainer>
            <PromptText isDarkTheme={isDarkTheme}>
                Want to know more? Chat with Virtual me
            </PromptText>
            <Arrow
                width="60"
                height="90"
                viewBox="0 0 60 90"
            >
                <defs>
                    {/* Elegant gradient */}
                    <linearGradient id="elegantGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor={primaryColor} />
                        <stop offset="70%" stopColor={primaryColor} />
                        <stop offset="100%" stopColor={secondaryColor} />
                    </linearGradient>

                    {/* Subtle shadow */}
                    <filter id="subtleShadow" x="-10%" y="-10%" width="120%" height="120%">
                        <feDropShadow dx="1" dy="1" stdDeviation="1" floodOpacity="0.3" />
                    </filter>
                </defs>

                {/* Single connected path for the entire arrow */}
                <path
                    d="M30,10 L30,70 L15,55 M30,70 L45,55"
                    stroke="url(#elegantGradient)"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#subtleShadow)"
                />

                {/* Decorative top cap */}
                <circle cx="30" cy="10" r="3" fill={primaryColor} filter="url(#subtleShadow)" />
            </Arrow>
        </PromptContainer>
    );
};

export default ChatPrompt;