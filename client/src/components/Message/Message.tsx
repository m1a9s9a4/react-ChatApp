import React from 'react';

import './Message.css';

import ReactEmoji from 'react-emoji';

export interface IMessage {
  user: string;
  text: string;
}

interface Props {
  message: IMessage;
  name: string;
}

const Message: React.FC<Props> = ({message: {user, text}, name}) => {
  let isSentByCurrentUser = false;
  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          <p className="sentText">{trimmedName}</p>
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
          </div>
        </div>
      )
      :
      (
        <div className="messageContainer justifyStart">
          <div className="messageBox backgroundLight">
            <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
          </div>
          <p className="sentTex　pl-10">{trimmedName}</p>
        </div>
      )
  )
}

export default Message;