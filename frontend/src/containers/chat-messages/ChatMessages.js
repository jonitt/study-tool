import React from 'react';
import ChatMessage from './ChatMessage';
import styles from './ChatMessages.css';

class ChatMessages extends React.Component {
  constructor(props) {
    super(props);

    this.messageWillBeFromTopic = 1;
    this.state = {
      messages: [
        {
          color: 'green',
          text:
            'The text will appear from here and moves towards the top.'
        }
      ]
    };
  }

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

  addNewMessage() {
    let url = this.props.server;
    if (Math.random() >= 0.5) {
      url += this.props.chosenTopics[0];
      this.messageWillBeFromTopic = 1;
    } else {
      url += this.props.chosenTopics[1];
      this.messageWillBeFromTopic = 2;
    }
    fetch(url)
      .then(res => res.text()) //JSON.stringify(res))
      .then(res => this.setupNewMessage(res));
  }

  //add new meesage to this.state.messages
  setupNewMessage(text) {
    //pop from messages, if there is too many
    if (this.state.messages.length > 50) {
      this.state.messages.pop();
    }
    //add new message to start of array and update
    let message = this.createNewMessage(text);
    this.state.messages.unshift(message);
    this.setState({
      messages: this.state.messages
    });
  }

  createNewMessage(text) {
    //decide color of message
    let color = 'white';
    if (this.messageWillBeFromTopic == 1) {
      color = 'green';
      this.messageWillBeFromTopic = 2;
    } else {
      this.messageWillBeFromTopic = 1;
    }
    let message = { color: color, text: text };
    return message;
  }

  //create random key
  generateKey() {
    return Math.random()
      .toString(36)
      .substr(2, 16);
  }

  render() {
    const { messages } = this.state;
    return (
      <div className={styles.chatMessages}>
        {messages.map((m, i) => (
          <ChatMessage
            color={m.color}
            text={m.text}
            key={this.generateKey()}
          />
        ))}
      </div>
    );
  }
}

export default ChatMessages;
