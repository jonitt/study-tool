import React from 'react';
import styles from './TopicSelect.css';
import { generateKey } from '../../utils/generateKey';

/*
props:
  topics = topic names
  value = initial selected topic
  handleChange = handler for value change
*/
class TopicSelect extends React.Component {
  state = {
    selected: this.props.value,
    topics: null
  };

  componentDidMount() {
    this.addTopics(this.props.topics);
  }

  componentDidUpdate(prevProps) {
    const { topics } = this.props;
    if (
      prevProps.topics.length != this.props.topics.length
    ) {
      this.addTopics(topics);
    }
  }

  firstToUpper(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  addTopics(topicNames) {
    let topics = topicNames.map(t => (
      <option key={generateKey()} value={t}>
        {t}
      </option>
    ));
    this.setState({
      topics: topics
    });
  }

  handleChange = e => {
    const //
      { handleChange } = this.props,
      value = e.target.value;
    this.setState({
      selected: value
    });
    handleChange(value);
  };

  render() {
    const { topics, id } = this.props;
    const { selected } = this.state;
    return (
      <select
        value={selected}
        id={id}
        onChange={this.handleChange}
        className={styles.select}
      >
        {topics.map(t => (
          <option key={generateKey()} value={t.code}>
            {t.title}
          </option>
        ))}
      </select>
    );
  }
}

export default TopicSelect;
