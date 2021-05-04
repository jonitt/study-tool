import { shallow, mount } from 'enzyme';
import React from 'react';
import ChatMessages from '../../containers/chat-messages/ChatMessages';
import ChatMessage from '../../containers/chat-messages/ChatMessage';

describe('ChatMessages', () => {
  it('renders correctly', () => {
    shallow(<ChatMessages />);
  });

  it('should display one message by default', () => {
    const wrapper = shallow(<ChatMessages />);
    //instance = wrapper.instance();
    //instance.createNewMessage('something');
    expect(wrapper.find(ChatMessage)).toHaveLength(1);
  });

  it('renders multiple messages', () => {
    const wrapper = shallow(<ChatMessages />);
    wrapper.setState({
      messages: [
        { text: 'test1', color: 'green' },
        { text: 'test2', color: 'green' },
        { text: 'test3', color: 'white' },
      ],
    });
    expect(wrapper.find(ChatMessage)).toHaveLength(3);
  });
});
