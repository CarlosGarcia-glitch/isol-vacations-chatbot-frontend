import { useEffect, useRef } from 'react';

import { useTranslations } from '../contexts/AppContext';
import ChatbotIcon from './icons/ChatbotIcon';

export interface IChat {
  role: string;
  message: string;
}

const ChatbotMessage = ({ role, message }: IChat) => {
  const t = useTranslations();

  const fullText: string = message === 'processing' ? t.processing : message;
  const element = useRef<HTMLDivElement>(null);
  let index: number = 0;

  useEffect(() => {
    function typeWriter() {
      if (role === 'bot') {
        if (index < fullText.length) {
          if (element?.current) {
            element.current.textContent += fullText.charAt(index);
          }
          index++;
          setTimeout(typeWriter, 20);
        }
      } else {
        if (element?.current) {
          element.current.textContent = fullText;
        }
      }
    }

    typeWriter();
  }, []);

  return (
    <div className={`message ${role}-message`}>
      {role === 'bot' && <ChatbotIcon />}
      <p ref={element} className="message-text" />
    </div>
  );
};

export default ChatbotMessage;
