// components/FooterSection.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';
import Modal from './Modal';
import PrivacyContent from './popup/PrivacyContent';
import TermsContent from './popup/TermsContent';
import ContactContent from './popup/ContactContent';

const FooterContainer = styled.footer`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 100%;
  border-top: 1px solid ${({ isDarkTheme }) =>
    isDarkTheme ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  background-color: ${({ isDarkTheme }) =>
    isDarkTheme ? 'var(--dark-background)' : 'var(--light-background)'};
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

const Copyright = styled.p`
    font-size: 0.9rem;
    color: ${({ isDarkTheme }) => isDarkTheme ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
    text-align: center;
    margin-bottom: 10px;
`;

const FooterLinks = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 10px;
`;

const FooterLink = styled.a`
    color: ${({ isDarkTheme }) => isDarkTheme ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'};
    text-decoration: none;
    transition: all 0.3s ease;
    position: relative;
    cursor: pointer;

    &:hover {
        color: ${({ isDarkTheme }) => isDarkTheme ? 'var(--dark-accent)' : 'var(--light-accent)'};
    }

    &::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 0;
        height: 2px;
        background-color: ${({ isDarkTheme }) =>
                isDarkTheme ? 'var(--dark-accent)' : 'var(--light-accent)'};
        transition: width 0.3s ease;
    }

    &:hover::after {
        width: 100%;
    }
`;

const FooterSection = () => {
    const { isDarkTheme } = useTheme();
    const currentYear = new Date().getFullYear();

    const [activeModal, setActiveModal] = useState(null);

    const openModal = (modalType) => {
        setActiveModal(modalType);
    };

    const closeModal = () => {
        setActiveModal(null);
    };

    return (
        <>
            <FooterContainer isDarkTheme={isDarkTheme}>
                <Copyright isDarkTheme={isDarkTheme}>
                    © {currentYear} Sanjeev. All rights reserved.
                </Copyright>
                <FooterLinks>
                    <FooterLink
                        isDarkTheme={isDarkTheme}
                        onClick={() => openModal('privacy')}
                    >
                        Privacy Policy
                    </FooterLink>
                    <FooterLink
                        isDarkTheme={isDarkTheme}
                        onClick={() => openModal('terms')}
                    >
                        Terms of Service
                    </FooterLink>
                    <FooterLink
                        isDarkTheme={isDarkTheme}
                        onClick={() => openModal('contact')}
                    >
                        Contact
                    </FooterLink>
                </FooterLinks>
            </FooterContainer>

            {/* Privacy Policy Modal */}
            <Modal isOpen={activeModal === 'privacy'} onClose={closeModal}>
                <PrivacyContent />
            </Modal>

            {/* Terms of Service Modal */}
            <Modal isOpen={activeModal === 'terms'} onClose={closeModal}>
                <TermsContent />
            </Modal>

            {/* Contact Modal */}
            <Modal isOpen={activeModal === 'contact'} onClose={closeModal}>
                <ContactContent />
            </Modal>
        </>
    );
};

export default FooterSection;