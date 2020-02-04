import React from 'react';
import SettingsIcon from '../../svg/settings-icon.svg';
import SettingsMenu from './SettingsMenu';
import styles from './Settings.css';

class Settings extends React.Component {
  messageSpeed = this.props.messageSpeed;
  chosenTopics = this.props.chosenTopics;

  state = {
    menu: null,
    menuOff: true,
    iconColorClass: styles.iconNotClicked,
    icon: (
      <SettingsIcon
        className={`${styles.icon} ${styles.iconNotClicked}`}
        onClick={() => this.changeMenu()}
      />
    ),
    topics: null
  };

  changeMenu() {
    const { menuOff } = this.state;
    //only opening is handled, as the menu handles it's closing with
    //a listener itself
    if (menuOff) {
      this.openMenu();
    }
  }

  //opens the settings menu
  openMenu() {
    this.setState({
      menuOff: false
    });
  }

  handleMessageSpeed(s) {
    //messageSpeed will be passed back to the input element when rendered
    this.messageSpeed = s;

    this.props.setMessageSpeed(s);
  }

  handleChangeTopic(topic, i) {
    const { handleChangeTopic } = this.props;
    this.chosenTopics[i] = topic;

    handleChangeTopic(topic, i);
  }

  //closes the settings menu
  closeMenu() {
    //the icon is set with timeout, so it does not trigger it's onclick
    //event, if the icon was clicked to close the menu
    setTimeout(
      () =>
        this.setState({
          menuOff: true
        }),
      100
    );
  }

  render() {
    const { menuOff } = this.state;
    return (
      <div className={styles.settings}>
        {menuOff ? (
          <SettingsIcon
            className={`${styles.icon} ${styles.iconNotClicked}`}
            onClick={() => this.changeMenu()}
          />
        ) : (
          <SettingsIcon
            className={`${styles.icon} ${styles.iconClicked}`}
          />
        )}
        {menuOff ? null : (
          <SettingsMenu
            handleChangeTopic={(t, i) =>
              this.handleChangeTopic(t, i)
            }
            chosenTopics={this.chosenTopics}
            topics={this.props.topics}
            setMessageSpeed={s =>
              this.handleMessageSpeed(s)
            }
            handleOutOfFocus={() => this.closeMenu()}
            messageSpeed={this.messageSpeed}
          />
        )}
      </div>
    );
  }
}

export default Settings;
