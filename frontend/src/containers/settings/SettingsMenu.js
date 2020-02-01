import React from 'react';
import TopicSelect from '../../components/topic-select/TopicSelect';
import NumberInput from '../../components/number-input/NumberInput';

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
        className='settings_menu'
        ref={node => (this.node = node)}
      >
        <div className='settings_menu_choose_topic'>
          <label className='settings_menu_label'>
            Choose topic 1
          </label>
          <TopicSelect
            handleChange={t => this.handleChangeTopic(t, 0)}
            value={this.props.chosenTopics[0]}
            topics={this.props.topics}
            id='settings_menu_choose_topic_select_1'
          />
        </div>
        <div className='settings_menu_choose_topic'>
          <label className='settings_menu_label'>
            Choose topic 2
          </label>
          <TopicSelect
            handleChange={t => this.handleChangeTopic(t, 1)}
            value={this.props.chosenTopics[1]}
            topics={this.props.topics}
            id='settings_menu_choose_topic_select_2'
          />
        </div>
        <div className='settings_menu_message_speed'>
          <label
            className='settings_menu_label'
            htmlFor='settings_menu_message_speed_numberinput'
          >
            Message speed (s)
          </label>
          <NumberInput
            value={this.props.messageSpeed}
            min='1'
            max='6000'
            id='settings_menu_message_speed_numberinput'
            handleChange={s => this.handleMessageSpeed(s)}
          />
        </div>
      </div>
    );
  }
}

/*
<div className="settings_menu_add_line">
  <label className="settings_menu_label" htmlFor="settings_menu_add_line_textinput">Add line</label>
  <input type="text" id="settings_menu_add_line_textinput" placeholder="Add line to topic..." />
  <select id="settings_menu_add_line_select">
   <option value="1 st topic">1 st topic</option>
   <option value="2 nd topic">2 nd topic</option>
  </select>
</div>
*/

export default SettingsMenu;
