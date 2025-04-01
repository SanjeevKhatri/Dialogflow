// App.js
import React from 'react';
import styled from 'styled-components';
import GlobalStyles from './GlobalStyles';
import BackgroundAnimation from './components/BackgroundAnimation';
import ProfileSection from './components/ProfileSection';
import SocialIcons from './components/SocialIcons';
import ChatButton from './components/ChatButton';
import ChatPrompt from './components/ChatPrompt'; // Import the ChatPrompt component
import Navbar from './components/Navbar';
import FooterSection from './components/FooterSection';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import ThemeTransition from './components/ThemeTransition';

const PageContainer = styled.div`
  position: relative;
  min-height: 100vh;
  padding-bottom: 100px; /* Height of the footer */
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 100px); /* Adjust for footer */
  padding: 20px;
`;

const AppContent = () => {
  const { isDarkTheme } = useTheme();

  return (
    <>
      <GlobalStyles isDarkTheme={isDarkTheme} />
      <ThemeTransition />
      <BackgroundAnimation />
      <PageContainer>
        <Navbar />
        <MainContainer>
          <ProfileSection />
          <SocialIcons />
        </MainContainer>
        <ChatButton />
        <FooterSection />
      </PageContainer>
    </>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;