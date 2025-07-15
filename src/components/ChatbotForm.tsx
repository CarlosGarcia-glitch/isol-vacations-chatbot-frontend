import React from 'react';

const ChatbotForm = ({
  handleOnChange,
  handleOnSubmit,
  file,
}: {
  file: string;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnSubmit: () => void;
}) => {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleOnSubmit();
  };
  return (
    <form onSubmit={onSubmit} action="#" className="chat-form">
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
              Selected: <b>{file}</b>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined">cloud_upload</span>
              <b>Click to upload</b> or drag and drop
            </>
          )}
        </p>
        {file && <button className="material-symbols-outlined">upload</button>}
      </label>
    </form>
  );
};

export default ChatbotForm;
