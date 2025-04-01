// App.js
import React from 'react';
import styled from 'styled-components';
import GlobalStyles from './GlobalStyles';
import BackgroundAnimation from './components/BackgroundAnimation';
import ProfileSection from './components/ProfileSection';
import SocialIcons from './components/SocialIcons';
import ChatButton from './components/ChatButton';
import Navbar from './components/Navbar';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import ThemeTransition from './components/ThemeTransition';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
`;

const AppContent = () => {
  const { isDarkTheme } = useTheme();

  return (
    <>
      <GlobalStyles isDarkTheme={isDarkTheme} />
      <ThemeTransition />
      <BackgroundAnimation />
      <Navbar />
      <MainContainer>
        <ProfileSection />
        <SocialIcons />
      </MainContainer>
      <ChatButton />
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