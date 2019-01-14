import React from "react";
import TopicListingChoice from "./topic_listing_choice.jsx";

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

  componentWIllMount() {
    this-initiateListing();
  }

  componentDidUpdate(prevProps) {
    if(prevProps.topics.length != this.props.topics.length) {
      this.initiateListing();
    }
  }

  initiateListing() {
    this.highlightTopic(parseInt(this.props.chosenTopicIndex), this.addTopics(this.props.topics));
  }

  //unhighligy old choice and highlight new chosen
  handleChoosingTopic(chosen) {
    //remove highlight from previous chosen topic
    let oldChosenIndex = this.state.chosenTopicIndex;
    if(oldChosenIndex >= 0 && oldChosenIndex < this.state.topics.length) {
      this.state.topics[oldChosenIndex] = <TopicListingChoice index={oldChosenIndex} class="topic_listing_choice" text={this.props.topics[oldChosenIndex]} handleClick={(c) => this.handleChoosingTopic(c)} key={this.generateKey()} />
    }
    //highlight new choice
    let index = chosen.props.index;
    this.highlightTopic(index, this.state.topics);

    this.props.handleChoosingTopic(chosen.props.text);
  }

  //mark topic as chosen
  //index is index of chosen topic in given list of topics
  //topics is a component list of the topics
  highlightTopic(index, topics) {
    if(index >= 0 && index < topics.length) {
      topics[index] = <TopicListingChoice index={index} class="topic_listing_choice topic_listing_choice_clicked" text={this.props.topics[index]} handleClick={(c) => this.handleChoosingTopic(c)} key={this.generateKey()} />;

      this.setState({
        topics: topics,
        chosenTopicIndex: index
      });
    }
  }

  addTopics(topicNames) {
    let index = 0;
    let topics = topicNames.map(
      name => {
        return <TopicListingChoice index={index++} class="topic_listing_choice" text={name} handleClick={(c) => this.handleChoosingTopic(c)} key={this.generateKey()} />;
      }
    );
    this.setState({
      topics: topics
    });
    return topics;
  }

  //create random key
  generateKey() {
    return Math.random().toString(36).substr(2, 16);
  }

  render() {
    return(
      <div className="topic_listing">
        {this.state.topics}
      </div>
    );
  }
}

export default TopicListing;
