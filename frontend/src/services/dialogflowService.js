// src/services/dialogflowService.js
const API_URL = process.env.REACT_APP_API_URL || '';

export const sendMessageToDialogflow = async (message, sessionId) => {
    try {
        const response = await fetch(`${API_URL}/api/dialogflow`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message,
                session_id: sessionId
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error sending message to Dialogflow:', error);
        throw error;
    }
};