// components/popup/PrivacyContent.js
import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

const ContentContainer = styled.div`
  padding: 40px;
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
  color: ${({ isDarkTheme }) => isDarkTheme ? 'var(--dark-text)' : 'var(--light-text)'};
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Section = styled.div`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: ${({ isDarkTheme }) => isDarkTheme ? 'var(--dark-text)' : 'var(--light-text)'};
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const Paragraph = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 15px;
  color: ${({ isDarkTheme }) => isDarkTheme ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
`;

const PrivacyContent = () => {
    const { isDarkTheme } = useTheme();

    return (
        <ContentContainer>
            <Title isDarkTheme={isDarkTheme}>Privacy Policy</Title>

            <Section>
                <SectionTitle isDarkTheme={isDarkTheme}>1. Information We Collect</SectionTitle>
                <Paragraph isDarkTheme={isDarkTheme}>
                    We collect information you provide directly to us when you use our services. This may include personal information such as your name, email address, and any other information you choose to provide.
                </Paragraph>
            </Section>

            <Section>
                <SectionTitle isDarkTheme={isDarkTheme}>2. How We Use Your Information</SectionTitle>
                <Paragraph isDarkTheme={isDarkTheme}>
                    We use the information we collect to provide, maintain, and improve our services, to develop new features, and to protect our users. We may also use the information to communicate with you about products, services, and events.
                </Paragraph>
            </Section>

            <Section>
                <SectionTitle isDarkTheme={isDarkTheme}>3. Sharing Your Information</SectionTitle>
                <Paragraph isDarkTheme={isDarkTheme}>
                    We do not share your personal information with third parties except as described in this privacy policy. We may share information with vendors and service providers who need access to such information to carry out work on our behalf.
                </Paragraph>
            </Section>

            <Section>
                <SectionTitle isDarkTheme={isDarkTheme}>4. Data Security</SectionTitle>
                <Paragraph isDarkTheme={isDarkTheme}>
                    We take measures to help protect information about you from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction. However, no security measures are 100% foolproof.
                </Paragraph>
            </Section>

            <Section>
                <SectionTitle isDarkTheme={isDarkTheme}>5. Contact Information</SectionTitle>
                <Paragraph isDarkTheme={isDarkTheme}>
                    If you have any questions about this Privacy Policy, please contact us at privacy@sanjeev.com.
                </Paragraph>
            </Section>

            <Section>
                <SectionTitle isDarkTheme={isDarkTheme}>6. Changes to this Policy</SectionTitle>
                <Paragraph isDarkTheme={isDarkTheme}>
                    We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page. You are advised to review this privacy policy periodically for any changes.
                </Paragraph>
                <Paragraph isDarkTheme={isDarkTheme}>
                    Last updated: March 31, 2025
                </Paragraph>
            </Section>
        </ContentContainer>
    );
};

export default PrivacyContent;