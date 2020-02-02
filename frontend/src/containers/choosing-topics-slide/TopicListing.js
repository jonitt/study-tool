import React from 'react';
import TopicListingChoice from './TopicListingChoice.js';
import styles from './TopicListing.css'

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
  handleChoosingTopic = chosen => {
    const { handleChoosingTopic } = this.props;
    let index = chosen.props.index;
    this.highlightTopic(index);

    handleChoosingTopic(chosen.props.text);
  };

  //mark topic as chosen
  highlightTopic = index =>
    this.setState({
      chosenTopicIndex: index
    });

  //create random key
  generateKey = () =>
    Math.random()
      .toString(36)
      .substr(2, 16);

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
            handleClick={c => this.handleChoosingTopic(c)}
            key={this.generateKey()}
          />
        ))}
      </div>
    );
  }
}

export default TopicListing;
