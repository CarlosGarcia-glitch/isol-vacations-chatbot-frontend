import { useEffect, useRef, useState } from 'react';
import { useAppContext, useTranslations } from '../contexts/AppContext';

//Components
import ChatbotForm from '../components/ChatbotForm';
import ChatbotMessage, { IChat } from '../components/ChatbotMessage';
import ChatbotIcon from '../components/icons/ChatbotIcon';

type Props = {};

const Chat = (props: Props) => {
  const t = useTranslations();
  const { language, setLanguage } = useAppContext();

  const [file, setFile] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<IChat[]>([]);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // smooth auto scroll
    chatBodyRef.current?.scrollTo({
      top: chatBodyRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [chatHistory]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFile(file.name);
  };

  const handleOnSubmit = () => {
    setChatHistory((history) => [
      ...history,
      { role: 'user', message: file },
      {
        role: 'bot',
        message: 'processing',
      },
    ]);
    setFile('');
  };

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'es' : 'en';
    setLanguage(newLang);
  };

  return (
    <div className="container">
      <div className="chatbot-popup">
        {/* Chatbot Header */}
        <div className="chat-header">
          <div className="header-info">
            <ChatbotIcon />
            <h2 className="logo-text">ISOL | chatbot</h2>
          </div>
          <button
            onClick={toggleLanguage}
            className="material-symbols-outlined"
          >
            {language === 'es' ? 'language_spanish' : 'language_us'}
          </button>
        </div>

        {/* Chatbot Body */}
        <div ref={chatBodyRef} className="chat-body">
          <div className="message bot-message">
            <ChatbotIcon />
            <p className="message-text">{t.greeting}</p>
          </div>
          {chatHistory.map((chat: IChat, index: number) => (
            <ChatbotMessage
              key={index}
              role={chat.role}
              message={chat.message}
            />
          ))}
        </div>

        {/*  Chatbot Footer */}
        <div className="chat-footer">
          <ChatbotForm
            handleOnChange={handleOnChange}
            handleOnSubmit={handleOnSubmit}
            file={file}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
