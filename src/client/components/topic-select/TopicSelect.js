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
    topics: null,
  };

  firstToUpper(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  handleChange = e => {
    const //
      { handleChange } = this.props,
      value = e.target.value;
    this.setState({
      selected: value,
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
