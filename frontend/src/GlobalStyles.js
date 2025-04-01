// src/GlobalStyles.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    /* Dark Theme Variables */
    --dark-bg: #121212;
    --dark-text: #ffffff;
    --dark-text-secondary: rgba(255, 255, 255, 0.7);
    --dark-accent: #ffa500;
    --dark-component-bg: #1e1e1e;
    --dark-input-bg: #333333;
    --dark-border: #333333;
    
    /* Light Theme Variables */
    --light-bg: #f5f5f5;
    --light-text: #333333;
    --light-text-secondary: rgba(0, 0, 0, 0.7);
    --light-accent: #f57c00;
    --light-component-bg: #ffffff;
    --light-input-bg: #eeeeee;
    --light-border: #dddddd;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  body {
    font-family: ui-sans-serif, system-ui, sans-serif;
    background-color: ${({ isDarkTheme }) => isDarkTheme ? 'var(--dark-bg)' : 'var(--light-bg)'};
    color: ${({ isDarkTheme }) => isDarkTheme ? 'var(--dark-text)' : 'var(--light-text)'};
    height: 100vh;
    overflow: hidden;
  }
`;

export default GlobalStyles;