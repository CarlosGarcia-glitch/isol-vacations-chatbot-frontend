import React, { useEffect, useRef, useState } from 'react';

import ChatbotMessage, { IChat } from './components/ChatbotMessage';
import ChatbotIcon from './components/icons/ChatbotIcon';
import ChatbotForm from './components/ChatbotForm';

function App() {
  const [file, setFile] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<IChat[]>([]);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
    setChatHistory((history) => [...history, { role: 'user', message: file }]);
    setTimeout(() => {
      setChatHistory((history) => [
        ...history,
        {
          role: 'bot',
          message:
            'Estamos procesando tu archivo, te enviaremos una respuesta al terminar.',
        },
      ]);
    }, 600);
    setFile('');
  };

  return (
    <div className="container">
      <div className="chatbot-popup">
        {/* Chatbot Header */}
        <div className="chat-header">
          <div className="header-info">
            <ChatbotIcon />
            <h2 className="logo-text">chatbot</h2>
          </div>
          <button className="material-symbols-outlined">
            keyboard_arrow_down
          </button>
        </div>

        {/* Chatbot Body */}
        <div ref={chatBodyRef} className="chat-body">
          <div className="message bot-message">
            <ChatbotIcon />
            <p className="message-text">
              Hola 👋 <br />
              Para válidar tu identidad, por favor, sube una foto de tu INE u
              otro documento ofial.
            </p>
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
}

export default App;
