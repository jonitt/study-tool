import React from 'react';
import TopicSelect from '../../components/topic-select/TopicSelect';
import NumberInput from '../../components/number-input/NumberInput';
import styles from './SettingsMenu.css';

class SettingsMenu extends React.Component {
  constructor(props) {
    super(props);

    this.handleOutOfFocus = this.handleOutOfFocus.bind(
      this
    );
  }

  handleOutOfFocus(e) {
    //if user clicked inside element, do nothing
    if (this.node.contains(e.target)) {
      return;
    }

    this.props.handleOutOfFocus();
  }

  componentWillMount() {
    document.addEventListener(
      'mousedown',
      this.handleOutOfFocus,
      false
    );
  }

  componentWillUnmount() {
    document.removeEventListener(
      'mousedown',
      this.handleOutOfFocus,
      false
    );
  }

  handleChangeTopic(t, i) {
    this.props.handleChangeTopic(t, i);
  }

  handleMessageSpeed(s) {
    this.props.setMessageSpeed(s);
  }

  render() {
    return (
      <div
        className={styles.menu}
        ref={node => (this.node = node)}
      >
        <div className='settings_menu_choose_topic'>
          <label className={styles.label}>
            Choose topic 1
          </label>
          <TopicSelect
            handleChange={t => this.handleChangeTopic(t, 0)}
            value={this.props.chosenTopics[0]}
            topics={this.props.topics}
            className={styles.select1}
          />
        </div>
        <div className='settings_menu_choose_topic'>
          <label className={styles.label}>
            Choose topic 2
          </label>
          <TopicSelect
            handleChange={t => this.handleChangeTopic(t, 1)}
            value={this.props.chosenTopics[1]}
            topics={this.props.topics}
            className={styles.select2}
          />
        </div>
        <div className='settings_menu_message_speed'>
          <label
            className={styles.label}
            htmlFor='settings_menu_message_speed_numberinput'
          >
            Message speed (s)
          </label>
          <NumberInput
            value={this.props.messageSpeed}
            min='1'
            max='6000'
            id='settings_menu_message_speed_numberinput'
            className={styles.input}
            handleChange={s => this.handleMessageSpeed(s)}
          />
        </div>
      </div>
    );
  }
}

export default SettingsMenu;
