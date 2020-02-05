import { shallow } from 'enzyme';
import React from 'react';
import TopicSelect from '../../components/topic-select/TopicSelect';

describe('TopicSelect', () => {
  it('renders correctly', () => {
    shallow(<TopicSelect topics={[]} />);
  });

  it('should create option element for each topic', () => {
    const wrapper = shallow(
      <TopicSelect
        topics={[
          { code: 'a1', title: 'a1' },
          { code: 'a2', title: 'a2' },
          { code: 'a3', title: 'a3' },
          { code: 'a4', title: 'a4' },
        ]}
      />
    );
    expect(wrapper.find('option')).toHaveLength(4);
  });
});
