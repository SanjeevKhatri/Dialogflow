// components/popup/TermsContent.js
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

const TermsContent = () => {
    const { isDarkTheme } = useTheme();

    return (
        <ContentContainer>
            <Title isDarkTheme={isDarkTheme}>Terms and Conditions</Title>

            <Section>
                <SectionTitle isDarkTheme={isDarkTheme}>1. Acceptance of Terms</SectionTitle>
                <Paragraph isDarkTheme={isDarkTheme}>
                    By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </Paragraph>
            </Section>

            <Section>
                <SectionTitle isDarkTheme={isDarkTheme}>2. Use License</SectionTitle>
                <Paragraph isDarkTheme={isDarkTheme}>
                    Permission is granted to temporarily download one copy of the materials on Sanjeev's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
                </Paragraph>
            </Section>

            <Section>
                <SectionTitle isDarkTheme={isDarkTheme}>3. Disclaimer</SectionTitle>
                <Paragraph isDarkTheme={isDarkTheme}>
                    The materials on Sanjeev's website are provided on an 'as is' basis. Sanjeev makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                </Paragraph>
            </Section>

            <Section>
                <SectionTitle isDarkTheme={isDarkTheme}>4. Limitations</SectionTitle>
                <Paragraph isDarkTheme={isDarkTheme}>
                    In no event shall Sanjeev or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Sanjeev's website, even if Sanjeev or a Sanjeev authorized representative has been notified orally or in writing of the possibility of such damage.
                </Paragraph>
            </Section>

            <Section>
                <SectionTitle isDarkTheme={isDarkTheme}>5. Revisions and Errata</SectionTitle>
                <Paragraph isDarkTheme={isDarkTheme}>
                    The materials appearing on Sanjeev's website could include technical, typographical, or photographic errors. Sanjeev does not warrant that any of the materials on its website are accurate, complete or current. Sanjeev may make changes to the materials contained on its website at any time without notice.
                </Paragraph>
            </Section>

            <Section>
                <SectionTitle isDarkTheme={isDarkTheme}>6. Governing Law</SectionTitle>
                <Paragraph isDarkTheme={isDarkTheme}>
                    These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
                </Paragraph>
                <Paragraph isDarkTheme={isDarkTheme}>
                    Last updated: March 31, 2025
                </Paragraph>
            </Section>
        </ContentContainer>
    );
};

export default TermsContent;