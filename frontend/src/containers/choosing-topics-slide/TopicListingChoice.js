import React from 'react';
import styles from './TopicListingChoice.css';

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
    const { chosen } = this.props;
    return (
      <div
        className={chosen ? styles.choiceClicked : styles.choice}
        onClick={this.handleClick}
      >
        {this.props.text}
      </div>
    );
  }
}

export default TopicListingChoice;
