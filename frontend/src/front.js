//Author: Joni Tuhkanen
//this is the main app
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import IntroductionSlide from './components/introduction_slide.jsx';
import ChoosingTopicsSlide from './components/choosing_topics_slide.jsx';
import ChatMessage from './components/chat_message.jsx';
import ChatMessages from './components/chat_messages.jsx';
import Styles from './styles/style.css';
import SettingsIcon from './svg/settings-icon.svg';
import Settings from './components/settings.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.server = 'https://studytool.herokuapp.com/'; //http://localhost:3000/

    this.state = {
      topicsSlideClass: 'hidden',
      messagesOn: false,
      topics: [''],
      messageSpeed: '4000',
      chosenTopics: ['chinese_numbers', '']
    };
  }

  componentDidMount() {
    this.fetchTopics();
  }

  fetchTopics() {
    fetch(this.server + 'topics')
      .then(res => res.text())
      .then(res =>
        this.setState({
          topics: JSON.parse(res)
        })
      );
  }

  showTopicsSlide() {
    this.setState({
      topicsSlideClass: 'choosing_topics_slide'
    });
  }

  handleStart() {
    if (this.state.chosenTopics[1].length < 1) {
      this.state.chosenTopics[1] = this.state.chosenTopics[0];
    }
    this.setState({
      messagesOn: true,
      topicsSlideClass: 'hidden',
      chosenTopics: this.state.chosenTopics
    });
  }

  setMessageSpeed(speed) {
    this.setState({
      messageSpeed: speed * 1000 + ''
    });
  }

  handleChangeTopic(t, i) {
    console.log('new topic:' + t);
    this.state.chosenTopics[i] = t
      .trim()
      .replace(' ', '_')
      .toLowerCase();
    this.setState({
      chosenTopics: this.state.chosenTopics
    });
  }

  render() {
    return (
      <div className='app'>
        <IntroductionSlide
          handleContinue={() => this.showTopicsSlide()}
        />
        <ChoosingTopicsSlide
          handleChoosingTopic={(t, i) =>
            this.handleChangeTopic(t, i)
          }
          class={this.state.topicsSlideClass}
          topics={this.state.topics}
          chosenTopicIndexes={[0, -1]}
          handleStart={() => this.handleStart()}
        />
        <Settings
          topics={this.state.topics}
          messageSpeed={
            parseInt(this.state.messageSpeed) / 1000
          }
          chosenTopics={this.state.chosenTopics}
          setMessageSpeed={s => this.setMessageSpeed(s)}
          handleChangeTopic={(t, i) =>
            this.handleChangeTopic(t, i)
          }
        />
        <ChatMessages
          speed={this.state.messageSpeed}
          chosenTopics={this.state.chosenTopics}
          messagesOn={this.state.messagesOn}
          server={this.server}
        />
        <div className='footer_base'>
          Joni Tuhkanen
          <br />
          jonituhkanen@outlook.com
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
