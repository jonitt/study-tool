import React from "react";

class ChatMessage extends React.Component {
  constructor(props) {
    super(props);
    this.text = this.props.text;
    this.setClassName(this.props.color);
  }

  setClassName(color) {
    if(color === "green") {
      this.className = "chat_message_green";
    }
    else {
      this.className = "chat_message_white";
    }
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className={"chat_message " + this.className}>
        {this.text}
      </div>
    );
  }
}

export default ChatMessage;
