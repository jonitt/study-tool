import React from 'react';
import ChatMessage from './chat_message.jsx';

class ChatMessages extends React.Component {
  constructor(props) {
    super(props);

    this.messageWillBeFromTopic = 1;
    this.state = {
      messages: [
        <ChatMessage
          color='green'
          text='The text will appear from here and move towards the top.'
          key={this.generateKey()}
        />
      ]
    };
  }

  componentDidMount() {
    //add new messages according to set speed
    if (this.props.messagesOn) {
      this.timer = setInterval(
        () => this.addNewMessage(),
        this.props.speed
      );
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  componentDidUpdate() {
    if (this.props.messagesOn) {
      clearInterval(this.timer);
      this.timer = setInterval(
        () => this.addNewMessage(),
        this.props.speed
      );
    }
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
    let key = this.generateKey();
    let message = (
      <ChatMessage color={color} text={text} key={key} />
    );
    return message;
  }

  //create random key
  generateKey() {
    return Math.random()
      .toString(36)
      .substr(2, 16);
  }

  render() {
    return (
      <div className='chat_messages'>
        {this.state.messages}
      </div>
    );
  }
}

export default ChatMessages;
