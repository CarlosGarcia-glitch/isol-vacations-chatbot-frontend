import React from 'react';
import ChatbotIcon from './icons/ChatbotIcon';

export interface IChat {
  role: string;
  message: string;
}

const ChatbotMessage = ({ role, message }: IChat) => {
  return (
    <div className={`message ${role}-message`}>
      {role === 'bot' && <ChatbotIcon />}
      <p className="message-text">{message}</p>
    </div>
  );
};

export default ChatbotMessage;
