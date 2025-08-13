import React, { useEffect, useState } from 'react';
import {
  useAlert,
  useAppContext,
  useTranslations,
} from '../contexts/AppContext';
import { chatService } from '@/services/chatService';

type ChatbotFormProps = {
  isThinking: boolean;
  setIsThinking: React.Dispatch<React.SetStateAction<boolean>>;
};

const ChatbotForm = ({ isThinking, setIsThinking }: ChatbotFormProps) => {
  const t = useTranslations();
  const { setChatHistory, language } = useAppContext();
  const [inputValue, setInputValue] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [placeholder, setPlaceholder] = useState<string>('');
  const { setAlert } = useAlert();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsThinking(true);
    const userMessage = file?.name ?? inputValue;
    setChatHistory((history) => [
      ...history,
      { role: 'user', message: userMessage },
    ]);

    try {
      const { response: botResponse } =
        await chatService.sendMessage(userMessage);
      setChatHistory((history) => [
        ...history,
        { role: 'bot', message: botResponse },
      ]);
    } catch (error) {
      console.error('Error sending message to agent:', error);
      setAlert(true, 'error', t.errors.ask_agent.alert);
      setChatHistory((history) => [
        ...history,
        {
          role: 'bot',
          message: t.errors.ask_agent.chat,
        },
      ]);
    } finally {
      setIsThinking(false);
    }

    setFile(null);
    setInputValue('');
  };

  const handleOnSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    setInputValue('');
  };

  const clearInput = () => {
    setFile(null);
    setInputValue('');
  };

  useEffect(() => {
    const text = file ? `${t.selected}${file.name}` : t.input.placeholder;
    setPlaceholder(text);
  }, [language, file]);

  return (
    <form onSubmit={onSubmit} className="chat-form">
      <input
        id="file"
        type="text"
        placeholder={placeholder}
        disabled={!!file || isThinking}
        className="message-input"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setInputValue(e.target.value);
        }}
        value={isThinking ? '' : inputValue}
      />

      <div className="buttons">
        {!!inputValue && !isThinking && (
          <button
            type="button"
            className="material-symbols-outlined button clear"
            onClick={clearInput}
          >
            close_small
          </button>
        )}
        <button
          type="submit"
          className="material-symbols-outlined button"
          disabled={!inputValue || isThinking}
        >
          send
        </button>
      </div>
    </form>
  );
};

export default ChatbotForm;
