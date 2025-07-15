import { useTranslations } from '../contexts/AppContext';
import ChatbotIcon from './icons/ChatbotIcon';

export interface IChat {
  role: string;
  message: string;
}

const ChatbotMessage = ({ role, message }: IChat) => {
  const t = useTranslations();

  return (
    <div className={`message ${role}-message`}>
      {role === 'bot' && <ChatbotIcon />}
      <p className="message-text">
        {message === 'processing' ? t.processing : message}
      </p>
    </div>
  );
};

export default ChatbotMessage;
