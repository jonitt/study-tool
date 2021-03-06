import React from 'react';
import styles from './ChatMessage.css';

const ChatMessage = props => {
  const { color, text } = props;
  return (
    <div className={color === 'green' ? styles.green : styles.white}>
      {text}
    </div>
  );
};

export default ChatMessage;
