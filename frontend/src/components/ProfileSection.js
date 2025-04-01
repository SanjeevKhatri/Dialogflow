// ProfileSection.js
import React from 'react';
import styled from 'styled-components';
import profileImage from '../assets/profile.jpg';
import { useTheme } from '../context/ThemeContext';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  //align-items: center;
  //justify-content: center;
  //text-align: center;
  padding: 0 20px;
`;

const ProfileImage = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 20px;
  box-shadow: 0 0 20px ${({ isDarkTheme }) => 
    isDarkTheme ? 'rgba(255, 165, 0, 0.3)' : 'rgba(245, 124, 0, 0.3)'};
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 10px;
  font-weight: 700;
  color: ${({ isDarkTheme }) => isDarkTheme ? 'var(--dark-text)' : 'var(--light-text)'};
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: ${({ isDarkTheme }) => isDarkTheme ? 'var(--dark-accent)' : 'var(--light-accent)'};
  font-weight: 600;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const Bio = styled.p`
  max-width: 600px;
  margin-bottom: 30px;
  color: ${({ isDarkTheme }) => isDarkTheme ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
  line-height: 1.6;
`;

const ProfileSection = () => {
  const { isDarkTheme } = useTheme();

  return (
    <ProfileContainer>
      <ProfileImage isDarkTheme={isDarkTheme}>
        <img src={profileImage} alt="Sanjeev" />
      </ProfileImage>
      <Title isDarkTheme={isDarkTheme}>Hi, I'm Sanjeev</Title>
      <Subtitle isDarkTheme={isDarkTheme}>Principal Application Engineer at Discover Financial Services</Subtitle>
      <Bio isDarkTheme={isDarkTheme}>
        The wizard behind the code, turning caffeine into bug-free (mostly) magic.
        Architecting solutions, optimizing performance, and making sure the app
        doesn't crash—on most days. If it works flawlessly, you're welcome. If it
        doesn't...have you tried turning it off and on again?
      </Bio>
    </ProfileContainer>
  );
};

export default ProfileSection;