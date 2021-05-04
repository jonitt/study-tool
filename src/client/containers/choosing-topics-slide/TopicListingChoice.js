import React from 'react';
import styles from './TopicListingChoice.css';

const TopicListingChoice = props => {
  const { chosen, handleClick, text, index } = props;
  return (
    <div
      className={chosen ? styles.choiceClicked : styles.choice}
      onClick={() => handleClick(index)}
    >
      {text}
    </div>
  );
};

export default TopicListingChoice;
