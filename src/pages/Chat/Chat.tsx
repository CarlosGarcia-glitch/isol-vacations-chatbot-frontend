import { useEffect, useRef } from 'react';
import { useAppContext, useTranslations } from '../../contexts/AppContext';

//Components
import ChatbotForm from '../../components/ChatbotForm';
import ChatbotMessage, { IChat } from '../../components/ChatbotMessage';
import ChatbotIcon from '../../components/icons/ChatbotIcon';
import { AuthService } from '@/services/firebase';
import { LoginOutlined } from '@mui/icons-material';
import './Chat.scss';

const Chat = () => {
  const t = useTranslations();
  const { language, setLanguage, chatHistory, setChatHistory } =
    useAppContext();
  const chatBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function startChat() {
      fetch(
        'https://agent-demo-785177279845.us-central1.run.app/api/v1/chat/start',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        },
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const message = data.message;
          setChatHistory([...chatHistory, { role: 'bot', message }]);
        })
        .catch((error) => {
          console.error('Error fetching chat history:', error);
        });
    }

    function existsChat() {
      fetch(
        'https://agent-demo-785177279845.us-central1.run.app/api/v1/chat/exists?conversationId=chat_31dac0ee',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
        .then((response) => response.json())
        .then((data) => {
          if (data === true) {
            getChatHistory();
          } else {
            startChat();
          }
        })
        .catch((error) => {
          console.error('Error fetching chat history:', error);
        });
    }

    function getChatHistory() {
      fetch(
        'https://agent-demo-785177279845.us-central1.run.app/api/v1/chat/history?conversationId=chat_31dac0ee',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
        .then((response) => response.json())
        .then((data) => {
          const { messageHistory } = data;
          const messages = messageHistory
            .map((message: { role: 'USER' | 'ASSISTANT'; content: string }) => {
              return {
                role: message.role === 'USER' ? 'user' : 'bot',
                message: message.content,
              };
            })
            .slice(1);
          setChatHistory([...chatHistory, ...messages]);
        })
        .catch((error) => {
          console.error('Error fetching chat history:', error);
        });
    }
    existsChat();
  }, []);

  useEffect(() => {
    // smooth auto scroll
    chatBodyRef.current?.scrollTo({
      top: chatBodyRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [chatHistory]);

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
          {/* <div className="message bot-message">
            <ChatbotIcon />
            <p className="message-text">{t.greeting}</p>
          </div> */}
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
          <ChatbotForm />
        </div>
      </div>
    </div>
  );
};

export default Chat;
