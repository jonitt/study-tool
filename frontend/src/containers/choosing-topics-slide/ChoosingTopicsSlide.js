import React from 'react';
import TopicSelect from '../../components/topic-select/TopicSelect';
import TopicListing from './TopicListing';

/*
props:
  chosenTopicIndexes = indexes of topics in given array
  topics: topic names as list
  handleChoosingTopic(t, i) = handler of choosing topic, t = name, i = index
*/
class ChoosingTopicsSlide extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      topics: this.props.topics,
      startHandler: () => {} //start is revented by default to prevent accidental pressing of start button
    };
  }

  componentDidUpdate(prevProps) {
    //disable Start-button for a while when class is changed to prevent
    //user from clicking the button by accident
    if (prevProps.class != this.props.class) {
      setTimeout(
        () =>
          this.setState({
            startHandler: () => this.props.handleStart()
          }),
        800
      );
      //this needs to be triggered by preivous flag being submitted
    }
  }

  handleStart() {
    this.state.startHandler();
  }

  render() {
    return (
      <div className={this.props.class}>
        <div className='choosing_topics_slide_paragraph_1'>
          What would you like to learn about?
          <br />
          <hr className='choosing_topics_slide_line' />
        </div>
        <br />
        <div className='choosing_topics_slide_paragraph_2'>
          Topic 1
          <br />
          <TopicListing
            handleChoosingTopic={t =>
              this.props.handleChoosingTopic(t, 0)
            }
            topics={this.props.topics}
            chosenTopicIndex={
              this.props.chosenTopicIndexes[0]
            }
          />
        </div>
        <br />
        <div className='choosing_topics_slide_paragraph_2'>
          Topic 2 (optional)
          <br />
          <TopicListing
            handleChoosingTopic={t =>
              this.props.handleChoosingTopic(t, 1)
            }
            topics={this.props.topics}
            chosenTopicIndex={
              this.props.chosenTopicIndexes[1]
            }
          />
        </div>
        <br />
        <div
          className='div_button choosing_topics_slide_submitter'
          onClick={() => this.handleStart()}
        >
          Start
        </div>
      </div>
    );
  }
}

export default ChoosingTopicsSlide;
