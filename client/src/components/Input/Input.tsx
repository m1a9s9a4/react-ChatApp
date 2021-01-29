import React from 'react';

import './Input.css';

interface Props {
  message: string;
  setMessage: (mes: string) => void;
  sendMessage: (event: React.FormEvent) => void;
}

const Input: React.FC<Props> = ({message, setMessage, sendMessage}) => {
  return (
    <form className="form">
      <input
        type="text"
        className="input"
        placeholder="text here"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyPress={(event) => event.key === 'Enter' ? sendMessage(event) : null }
      />
      <button className="sendButton" onClick={(event) => sendMessage(event)}>Send</button>
    </form>
  )
}

export default Input;