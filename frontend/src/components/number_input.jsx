import React from 'react';

/*
props:
  value = initial value
  handleChange = handler for new value
  min = min value
  max = max value
  id = id
*/
class NumberInput extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.timer = null;
    this.value = props.value;
  }

  handleChange(e) {
    //value is changed with a timer, so the server does not get filled
    //with request while user changes the value
    let value = e.target.value;
    if (value < this.props.min || value > this.props.max) {
      return;
    }
    clearTimeout(this.timer);
    this.value = value;
    this.timer = setTimeout(
      () => this.props.handleChange(value),
      1000
    );
  }

  render() {
    return (
      <input
        type='number'
        onChange={this.handleChange}
        defaultValue={this.value}
        min={this.props.min}
        max={this.props.max}
        id={this.props.id}
      />
    );
  }
}

export default NumberInput;
