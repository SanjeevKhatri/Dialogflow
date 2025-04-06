// App.js
import React from 'react';
import styled from 'styled-components';
import { HashRouter as Router, Routes, Route } from 'react-router-dom'; // Changed to HashRouter
import GlobalStyles from './GlobalStyles';
import BackgroundAnimation from './components/BackgroundAnimation';
import ProfileSection from './components/ProfileSection';
import SocialIcons from './components/SocialIcons';
import ChatButton from './components/ChatButton';
import ChatPrompt from './components/ChatPrompt';
import ChatHistory from './components/ChatHistory';
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

// Home component for the main page content
const Home = () => {
  return (
    <>
      <MainContainer>
        <ProfileSection />
        <SocialIcons />
      </MainContainer>
      <ChatButton />
    </>
  );
};

const AppContent = () => {
  const { isDarkTheme } = useTheme();

  return (
    <>
      <GlobalStyles isDarkTheme={isDarkTheme} />
      <ThemeTransition />
      <BackgroundAnimation />
      <PageContainer>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat-history" element={<ChatHistory />} />
          </Routes>
          <FooterSection />
        </Router>
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