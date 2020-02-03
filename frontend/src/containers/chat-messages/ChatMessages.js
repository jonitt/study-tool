import React from 'react';
import ChatMessage from './ChatMessage';
import styles from './ChatMessages.css';
import { generateKey } from '../../utils/generateKey';

class ChatMessages extends React.Component {
  messageWillBeFromTopic = 0;

  state = {
    messages: [
      {
        color: 'green',
        text:
          'The text will appear from here and moves towards the top.'
      }
    ]
  };

  componentDidMount() {
    const { messagesOn } = this.props;
    //add new messages according to set speed
    if (messagesOn) {
      this.setMessageTimer();
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  componentDidUpdate() {
    const { messagesOn } = this.props;
    if (messagesOn) {
      clearInterval(this.timer);
      this.setMessageTimer();
    }
  }

  setMessageTimer() {
    const { speed } = this.props;
    this.timer = setInterval(
      () => this.addNewMessage(),
      speed
    );
  }

  /**
   * Adds a new bullet point message to the messages box
   */
  addNewMessage() {
    const { getBulletPoint } = this.props;
    if (Math.random() >= 0.5) {
      this.messageWillBeFromTopic = 0;
    } else {
      this.messageWillBeFromTopic = 1;
    }
    /*
    fetch(url)
      .then(res => res.text()) //JSON.stringify(res))
      .then(res => this.setupNewMessage(res));
    */
    this.setupNewMessage(
      getBulletPoint(this.messageWillBeFromTopic)
    );
  }

  //add new meesage to this.state.messages
  setupNewMessage(text) {
    let { messages } = this.state;
    //pop from messages, if there is too many
    if (messages.length > 50) {
      messages.pop();
    }
    //add new message to start of array and update
    const message = this.createNewMessage(text);
    messages.unshift(message);
    this.setState({
      messages: messages
    });
  }

  createNewMessage(text) {
    //decide color of message
    let color = 'white';
    if (this.messageWillBeFromTopic == 0) {
      color = 'green';
      this.messageWillBeFromTopic = 1;
    } else {
      this.messageWillBeFromTopic = 0;
    }
    let message = { color: color, text: text };
    return message;
  }

  render() {
    const { messages } = this.state;
    return (
      <div className={styles.chatMessages}>
        {messages.map((m, i) => (
          <ChatMessage
            color={m.color}
            text={m.text}
            key={generateKey()}
          />
        ))}
      </div>
    );
  }
}

export default ChatMessages;
