import React from 'react';

import { useTranslations } from '../contexts/AppContext';

const ChatbotForm = ({
  handleOnChange,
  handleOnSubmit,
  file,
}: {
  file: string;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnSubmit: () => void;
}) => {
  const t = useTranslations();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleOnSubmit();
  };

  return (
    <form onSubmit={onSubmit} className="chat-form">
      <label className="selected-file">
        <input
          id="document"
          type="file"
          name="document"
          accept="image/png,image/jpeg,image/jpg,image/webp,application/pdf"
          required
          style={{ display: 'none' }}
          onChange={handleOnChange}
        />
        <p className="file-name">
          {file ? (
            <>
              {t.selected} <b>{file}</b>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined">cloud_upload</span>
              <span dangerouslySetInnerHTML={{ __html: t.input.placehonder }} />
            </>
          )}
        </p>
        {file && <button className="material-symbols-outlined">upload</button>}
      </label>
    </form>
  );
};

export default ChatbotForm;
