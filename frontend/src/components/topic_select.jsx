import React from "react";

/*
peops:
  topics = topic names
  value = initial selected topic
  handleChange = handler for value change
*/
class TopicSelect extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    console.log(this.props.value);
    this.state = {
      selected: this.firstToUpper(this.props.value).replace("_", " "),
      topics: null
    }
  }

  componentDidMount() {
    this.addTopics(this.props.topics);
  }

  componentDidUpdate(prevProps) {
    if(prevProps.topics.length != this.props.topics.length) {
      this.addTopics(this.props.topics);
    }
  }

  firstToUpper(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  addTopics(topicNames) {
    let topics = topicNames.map(
      t =>
      <option key={this.generateKey()} value={t}>{t}</option>
    );
    this.setState({
      topics: topics
    });
  }

  //create random key
  generateKey() {
    return Math.random().toString(36).substr(2, 16);
  }

  handleChange(e) {
    let value = e.target.value;
    this.setState({
      selected: value
    });
    this.props.handleChange(value);
  }

  render() {
    return(
      <select value={this.state.selected} id={this.props.id} onChange={this.handleChange}>
        {this.state.topics}
      </select>
    );
  }
}

export default TopicSelect;
