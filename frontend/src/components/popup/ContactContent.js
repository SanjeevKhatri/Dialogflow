// components/popup/ContactContent.js
import React, { useState } from 'react';
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

const Paragraph = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 30px;
  color: ${({ isDarkTheme }) => isDarkTheme ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 1rem;
  color: ${({ isDarkTheme }) => isDarkTheme ? 'var(--dark-text)' : 'var(--light-text)'};
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid ${({ isDarkTheme }) =>
    isDarkTheme ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'};
  border-radius: 4px;
  background-color: ${({ isDarkTheme }) =>
    isDarkTheme ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)'};
  color: ${({ isDarkTheme }) => isDarkTheme ? 'var(--dark-text)' : 'var(--light-text)'};
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid ${({ isDarkTheme }) =>
    isDarkTheme ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'};
  border-radius: 4px;
  background-color: ${({ isDarkTheme }) =>
    isDarkTheme ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)'};
  color: ${({ isDarkTheme }) => isDarkTheme ? 'var(--dark-text)' : 'var(--light-text)'};
  min-height: 150px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: ${({ isDarkTheme }) =>
    isDarkTheme ? 'var(--dark-accent)' : 'var(--light-accent)'};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: ${({ isDarkTheme }) =>
    isDarkTheme ? 'rgba(255, 165, 0, 0.8)' : 'rgba(245, 124, 0, 0.8)'};
  }
`;

const SuccessMessage = styled.div`
  padding: 15px;
  margin-top: 20px;
  background-color: rgba(75, 181, 67, 0.2);
  border: 1px solid rgba(75, 181, 67, 0.5);
  border-radius: 4px;
  color: ${({ isDarkTheme }) => isDarkTheme ? '#7affa7' : '#2e8b57'};
`;

const ContactContent = () => {
    const { isDarkTheme } = useTheme();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real application, you would send the form data to your backend
        console.log('Form submitted:', formData);
        setSubmitted(true);

        // Reset form after submission
        setFormData({
            name: '',
            email: '',
            message: ''
        });

        // Hide success message after 5 seconds
        setTimeout(() => {
            setSubmitted(false);
        }, 5000);
    };

    return (
        <ContentContainer>
            <Title isDarkTheme={isDarkTheme}>Contact Me</Title>
            <Paragraph isDarkTheme={isDarkTheme}>
                Have a question or want to work together? Fill out the form below and I'll get back to you as soon as possible.
            </Paragraph>

            <form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label isDarkTheme={isDarkTheme}>Name</Label>
                    <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        isDarkTheme={isDarkTheme}
                    />
                </FormGroup>

                <FormGroup>
                    <Label isDarkTheme={isDarkTheme}>Email</Label>
                    <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        isDarkTheme={isDarkTheme}
                    />
                </FormGroup>

                <FormGroup>
                    <Label isDarkTheme={isDarkTheme}>Message</Label>
                    <TextArea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        isDarkTheme={isDarkTheme}
                    />
                </FormGroup>

                <Button type="submit" isDarkTheme={isDarkTheme}>Send Message</Button>
            </form>

            {submitted && (
                <SuccessMessage isDarkTheme={isDarkTheme}>
                    Thank you for your message! I'll get back to you soon.
                </SuccessMessage>
            )}
        </ContentContainer>
    );
};

export default ContactContent;