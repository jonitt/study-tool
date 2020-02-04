import React from 'react';
import styles from './IntroductionSlide.css';

class IntroductionSlide extends React.Component {
  state = {
    submitted: false
  };

  handleClick = () => {
    this.props.handleContinue();

    this.setState({
      submitted: true
    });
  };

  render() {
    const { submitted } = this.state;
    return (
      <div
        className={submitted ? styles.hidden : styles.slide}
      >
        <div className='introduction_slide_text'>
          <h1 className={styles.paragraph1}>
            Effortless study tool helps you&nbsp;
            <br />
            with learning through repetition -&nbsp;
            <br />
            without needing any interaction!&nbsp;
          </h1>
          <br />
          <p className={styles.paragraph2}>
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
          <p className={styles.paragraph3}>
            To start learning, simply choose up to&nbsp;
            <br />
            two topics and you are good to go!
          </p>
          <br />
          <hr className={styles.line} />
          <br />
          <div
            onClick={this.handleClick}
            className={styles.submitter}
          >
            Continue ≫
          </div>
        </div>
      </div>
    );
  }
}

export default IntroductionSlide;
