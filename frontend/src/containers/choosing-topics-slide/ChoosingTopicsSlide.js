import React from 'react';
import TopicSelect from '../../components/topic-select/TopicSelect';
import TopicListing from './TopicListing';
import styles from './ChoosingTopicsSlide.css';

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
      allowSubmit: false
    };
  }

  componentDidUpdate(prevProps) {
    const { hidden, handleStart } = this.props;
    //disable Start-button for a while when class is changed to prevent
    //user from clicking the button by accident
    if (prevProps.hidden != hidden) {
      setTimeout(
        () =>
          this.setState({
            allowSubmit: true
          }),
        600
      );
      //this needs to be triggered by preivous flag being submitted
    }
  }

  render() {
    const {
      hidden,
      topics,
      chosenTopicIndexes,
      handleChoosingTopic,
      handleStart
    } = this.props;
    const { allowSubmit } = this.state;
    return (
      <div
        className={hidden ? styles.hidden : styles.slide}
      >
        <div className={styles.paragraph1}>
          What would you like to learn about?
          <br />
          <hr className={styles.line} />
        </div>
        <br />
        <div className={styles.paragraph2}>
          Topic 1
          <br />
          <TopicListing
            handleChoosingTopic={t =>
              handleChoosingTopic(t, 0)
            }
            topics={topics}
            chosenTopicIndex={chosenTopicIndexes[0]}
          />
        </div>
        <br />
        <div className={styles.paragraph2}>
          Topic 2 (optional)
          <br />
          <TopicListing
            handleChoosingTopic={t =>
              handleChoosingTopic(t, 1)
            }
            topics={topics}
            chosenTopicIndex={chosenTopicIndexes[1]}
          />
        </div>
        <br />
        <div
          className={styles.submitter}
          onClick={() =>
            allowSubmit ? handleStart() : null
          }
        >
          Start
        </div>
      </div>
    );
  }
}

export default ChoosingTopicsSlide;
