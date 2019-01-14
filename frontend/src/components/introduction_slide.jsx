import React from "react";

class IntroductionSlide extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      class: "introduction_slide"
    }
  }

  handleClick() {
    this.props.handleContinue();

    this.setState({
      class: "hidden"
    });
  }

  render() {
    return(
      <div className={this.state.class}>
        <div className="introduction_slide_text">
          <h1 className="introduction_slide_paragraph_1">
            Effortless study tool helps you&nbsp;
            <br />
            with learning through repetition -&nbsp;
            <br />
            without needing any interaction!&nbsp;
          </h1>
          <br />
          <p className="introduction_slide_paragraph_2">
            Effortless study tool shows short&nbsp;
            <br />
            bullet points from your chosen&nbsp;
            <br />
            topic in an endless loop. Same&nbsp;
            <br />
            messages will be repeated at multiple&nbsp;
            <br />
            times, so the program does not need&nbsp;
            <br />
            your continuous attention.
          </p>
          <br />
          <p className="introduction_slide_paragraph_3">
            To start learning, simply choose up to&nbsp;
            <br />
            two topics and you are good to go!
          </p>
          <br />
          <hr className="introduction_slide_line" />
          <br />
          <div onClick={this.handleClick} className="div_button introduction_slide_submitter">
            Continue ≫
          </div>
        </div>
      </div>
    );
  }
}

export default IntroductionSlide;
