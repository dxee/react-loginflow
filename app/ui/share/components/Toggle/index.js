import React from 'react';

import Select from './Select';
import ToggleOption from '../ToggleOption';

class Toggle extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  onSelectChange = (evt) => {
    evt.preventDefault();
    this.props.onToggle(evt.target.value);
  }
  render() {
    let content = (<option>--</option>);

    if (this.props.values) {
      content = this.props.values.map((value) => (
        <ToggleOption key={value} value={value} message={this.props.messages[value]} />
      ));
    }

    return (
      <Select value={this.props.value} onChange={this.onSelectChange}>
        {content}
      </Select>
    );
  }
}

Toggle.propTypes = {
  onToggle: React.PropTypes.func,
  values: React.PropTypes.array,
  value: React.PropTypes.string,
  messages: React.PropTypes.object,
};

export default Toggle;
