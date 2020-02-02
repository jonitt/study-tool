import React from 'react';
import SettingsIcon from '../../svg/settings-icon.svg';
import SettingsMenu from './SettingsMenu';
import styles from './Settings.css';

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.messageSpeed = this.props.messageSpeed;
    this.chosenTopics = this.props.chosenTopics;

    this.state = {
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
  }

  changeMenu() {
    //only opening is handled, as the menu handles it's closing with
    //a listener itself
    if (this.state.menuOff) {
      this.openMenu();
    }
  }

  //opens the settings menu
  openMenu() {
    let menu = (
      <SettingsMenu
        handleChangeTopic={(t, i) =>
          this.handleChangeTopic(t, i)
        }
        chosenTopics={this.chosenTopics}
        topics={this.props.topics}
        setMessageSpeed={s => this.handleMessageSpeed(s)}
        handleOutOfFocus={() => this.closeMenu()}
        messageSpeed={this.messageSpeed}
      />
    );
    this.setState({
      menu: menu,
      menuOff: false,
      icon: (
        <SettingsIcon
          className={`${styles.icon} ${styles.iconNotClicked}`}
        />
      )
    });
  }

  handleMessageSpeed(s) {
    //messageSpeed will be passed back to the input element when rendered
    this.messageSpeed = s;

    this.props.setMessageSpeed(s);
  }

  handleChangeTopic(t, i) {
    this.chosenTopics[i] = t;

    this.props.handleChangeTopic(t, i);
  }

  //closes the settings menu
  closeMenu() {
    //the icon is set with timeout, so it does not trigger it's onclick
    //event, if the icon was clicked to close the menu
    setTimeout(
      () =>
        this.setState({
          menu: null,
          menuOff: true,
          icon: (
            <SettingsIcon
              className={`${styles.icon} ${styles.iconNotClicked}`}
              onClick={() => this.changeMenu()}
            />
          )
        }),
      100
    );
  }

  render() {
    return (
      <div className={styles.settings}>
        {this.state.icon}
        {this.state.menu}
      </div>
    );
  }
}

export default Settings;
