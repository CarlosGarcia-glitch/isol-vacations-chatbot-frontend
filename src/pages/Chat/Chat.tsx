import { useEffect, useRef } from 'react';
import { useAppContext, useTranslations } from '../../contexts/AppContext';

import ChatbotForm from '../../components/ChatbotForm';
import ChatbotMessage, { IChat } from '../../components/ChatbotMessage';
import ChatbotIcon from '../../components/icons/ChatbotIcon';
import { AuthService } from '@/services/firebase';
import { LoginOutlined } from '@mui/icons-material';
import { chatService } from '@/services/chatService';
import './Chat.scss';

const Chat = () => {
  const t = useTranslations();
  const { language, setLanguage, chatHistory, setChatHistory } =
    useAppContext();
  const chatBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initChat = async () => {
      try {
        const exists = await chatService.existsChat();

        if (exists) {
          const history = await chatService.getChatHistory();
          setChatHistory((prev) => [...prev, ...history]);
        } else {
          const message = await chatService.startChat();
          setChatHistory((prev) => [...prev, { role: 'bot', message }]);
        }
      } catch (error) {
        console.error('Error initializing chat:', error);
      }
    };

    initChat();
  }, []);

  useEffect(() => {
    chatBodyRef.current?.scrollTo({
      top: chatBodyRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [chatHistory]);

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'es' : 'en';
    setLanguage(newLang);
  };

  const lastBotIndex = chatHistory?.map(m => m.role).lastIndexOf('bot');

  return (
    <div className="container">
      <div className="chatbot-popup">
        {/* Chatbot Header */}
        <div className="chat-header">
          <div className="header-info">
            <ChatbotIcon />
            <h2 className="logo-text">ISOL | chatbot</h2>
          </div>
          <div className="buttons-header">
            <div>
              <button
                onClick={toggleLanguage}
                className="material-symbols-outlined"
              >
                {language === 'es' ? 'language_spanish' : 'language_us'}
              </button>
            </div>
            <div>
              <button
                onClick={() => AuthService.logout()}
                className="material-symbols-outlined"
              >
                <LoginOutlined sx={{ height: 38 }} />
              </button>
            </div>
          </div>
        </div>

        {/* Chatbot Body */}
        <div ref={chatBodyRef} className="chat-body">
          {chatHistory.map((chat: IChat, index: number) => (
            <ChatbotMessage
              key={index}
              role={chat.role}
              message={chat.message}
              isLastMsg={chat.role === 'bot' && index === lastBotIndex}
            />
          ))}
        </div>

        {/* Chatbot Footer */}
        <div className="chat-footer">
          <ChatbotForm />
        </div>
      </div>
    </div>
  );
};

export default Chat;
