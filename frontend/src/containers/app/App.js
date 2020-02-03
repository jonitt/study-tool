//Author: Joni Tuhkanen
//this is the main app

import React, { Component } from 'react';
import IntroductionSlide from '../introduction-slide/IntroductionSlide';
import ChoosingTopicsSlide from '../choosing-topics-slide/ChoosingTopicsSlide';
import ChatMessages from '../chat-messages/ChatMessages';
import SettingsIcon from '../../svg/settings-icon.svg';
import Settings from '../settings/Settings';
import * as CountriesApi from '../../api/countries';
import { Topics } from '../../utils/data/topics';
import styles from './App.css';
import * as topicHandler from '../../utils/topicsHandler';

class App extends Component {
  state = {
    topicsSlideHidden: true,
    messagesOn: false,
    messageSpeed: '4000',
    chosenTopics: ['countries-capitals', ''],
    countriesData: null
  };

  componentDidMount() {
    CountriesApi.fetchCountries().then(res =>
      this.setState({ countriesData: res })
    );
  }

  /**
   * Show the topic's choosing page
   */
  showTopicsSlide() {
    this.setState({
      topicsSlideHidden: false
    });
  }

  /**
   * Handles starting the message flow of the program
   */
  handleStart() {
    let { chosenTopics } = this.state;

    if (chosenTopics[1].length < 1) {
      chosenTopics[1] = chosenTopics[0];
    }

    this.setState({
      messagesOn: true,
      topicsSlideHidden: true,
      chosenTopics: chosenTopics
    });
  }

  /**
   * Frequency of new bullet points arriving
   * @param {int} speed new speed in ms
   */
  setMessageSpeed(speed) {
    this.setState({
      messageSpeed: speed * 1000 + ''
    });
  }

  /**
   * Change topic to show bullet points from
   * @param {string} t topic's code
   * @param {int} i Showed topic 1 (i = 0) or 2 (i = 1)
   */
  handleChangeTopic(t, i) {
    let { chosenTopics } = this.state;
    chosenTopics[i] = t;
    this.setState({
      chosenTopics: chosenTopics
    });
  }

  getBulletPoint(topicIndex) {
    const //
      { countriesData, chosenTopics } = this.state,
      topic = Topics.find(
        t => t.code === chosenTopics[topicIndex]
      );
      
    return topicHandler.getCountriesBulletPoint(
      topic,
      countriesData
    );
  }

  render() {
    const {
      messageSpeed,
      chosenTopics,
      messagesOn,
      topicsSlideHidden
    } = this.state;
    return (
      <div className={styles.app}>
        <IntroductionSlide
          handleContinue={() => this.showTopicsSlide()}
        />
        <ChoosingTopicsSlide
          handleChoosingTopic={(t, i) =>
            this.handleChangeTopic(t, i)
          }
          hidden={topicsSlideHidden}
          topics={Topics}
          chosenTopicIndexes={[0, -1]}
          handleStart={() => this.handleStart()}
        />
        <Settings
          topics={Topics}
          messageSpeed={parseInt(messageSpeed) / 1000}
          chosenTopics={chosenTopics}
          setMessageSpeed={s => this.setMessageSpeed(s)}
          handleChangeTopic={(t, i) =>
            this.handleChangeTopic(t, i)
          }
        />
        <ChatMessages
          speed={messageSpeed}
          chosenTopics={chosenTopics}
          messagesOn={messagesOn}
          getBulletPoint={topicIndex =>
            this.getBulletPoint(topicIndex)
          }
        />
        <div className={styles.footer}>
          Joni Tuhkanen
          <br />
          joni.tuhkanen@protonmail.com
        </div>
      </div>
    );
  }
}

export default App;
