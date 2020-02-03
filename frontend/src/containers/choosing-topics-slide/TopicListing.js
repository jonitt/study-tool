import React from 'react';
import TopicListingChoice from './TopicListingChoice.js';
import styles from './TopicListing.css';
import { generateKey } from '../../utils/generateKey';

/*
props:
  topics: topic names
  class: className
  heading: text to be displayed over the topics
  chosenTopicIndex: index of chosen topic in given list of topics
*/
class TopicListing extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      topics: [], //list of topic components
      chosenTopicIndex: -1 //index of chosen topic
    };
  }

  componentWillMount() {
    this.initiateListing();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.topics.length != this.props.topics.length
    ) {
      this.initiateListing();
    }
  }

  initiateListing = () => {
    const { topics, chosenTopicIndex } = this.props;
    this.highlightTopic(parseInt(chosenTopicIndex), topics);
  };

  //remove old choice and set new choice
  handleChoosingTopic = chosenIndex => {
    const { handleChoosingTopic, topics } = this.props;
    this.highlightTopic(chosenIndex);

    handleChoosingTopic(topics[chosenIndex].code);
  };

  //mark topic as chosen
  highlightTopic = index =>
    this.setState({
      chosenTopicIndex: index
    });

  render() {
    const { topics } = this.props;
    const { chosenTopicIndex } = this.state;
    return (
      <div className={styles.listing}>
        {this.state.topics}
        {topics.map((t, i) => (
          <TopicListingChoice
            index={i}
            chosen={i == chosenTopicIndex}
            text={t.title}
            handleClick={i => this.handleChoosingTopic(i)}
            key={generateKey()}
          />
        ))}
      </div>
    );
  }
}

export default TopicListing;
