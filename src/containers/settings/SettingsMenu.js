import React from 'react';
import TopicSelect from '../../components/topic-select/TopicSelect';
import NumberInput from '../../components/number-input/NumberInput';
import styles from './SettingsMenu.css';

class SettingsMenu extends React.Component {
  constructor(props) {
    super(props);

    this.handleOutOfFocus = this.handleOutOfFocus.bind(this);
  }

  handleOutOfFocus(e) {
    const { handleOutOfFocus } = this.props;
    //if user clicked inside element, do nothing
    if (this.node.contains(e.target)) {
      return;
    }

    handleOutOfFocus();
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleOutOfFocus, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleOutOfFocus, false);
  }

  render() {
    const {
      setMessageSpeed,
      handleChangeTopic,
      messageSpeed,
      chosenTopics,
      topics,
    } = this.props;
    return (
      <div className={styles.menu} ref={node => (this.node = node)}>
        <div>
          <label className={styles.label}>Choose topic 1</label>
          <TopicSelect
            handleChange={t => handleChangeTopic(t, 0)}
            value={chosenTopics[0]}
            topics={topics}
            className={styles.select1}
          />
        </div>
        <div className='settings_menu_choose_topic'>
          <label className={styles.label}>Choose topic 2</label>
          <TopicSelect
            handleChange={t => handleChangeTopic(t, 1)}
            value={chosenTopics[1]}
            topics={topics}
            className={styles.select2}
          />
        </div>
        <div>
          <label
            className={styles.label}
            htmlFor='settings_menu_message_speed_numberinput'
          >
            Message speed (s)
          </label>
          <NumberInput
            value={messageSpeed}
            min='1'
            max='6000'
            id='settings_menu_message_speed_numberinput'
            className={styles.input}
            handleChange={s => setMessageSpeed(s)}
          />
        </div>
      </div>
    );
  }
}

export default SettingsMenu;
