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

    this.timer = null;
    this.value = props.value;
  }

  handleChange = e => {
    //value is changed with a timer, so there won't be too many requests
    let value = e.target.value;
    if (value < this.props.min || value > this.props.max) {
      return;
    }
    clearTimeout(this.timer);
    this.value = value;
    this.timer = setTimeout(() => this.props.handleChange(value), 1000);
  };

  render() {
    const { min, max, id } = this.props;
    return (
      <input
        type='number'
        onChange={this.handleChange}
        defaultValue={this.value}
        min={min}
        max={max}
        id={id}
      />
    );
  }
}

export default NumberInput;
