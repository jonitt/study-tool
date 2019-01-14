import React from "react";

/*
props:
  text: text content

*/
class TopicListingChoice extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.handleClick(this);
  }

  render() {
    return(
      <div className={this.props.class} onClick={this.handleClick}>
        {this.props.text}
      </div>
    );
  }
}

export default TopicListingChoice;
