import React from 'react';
import { injectIntl, intlShape } from 'react-intl';

class ToggleOption extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (<option value={this.props.value}>
      {this.props.message ? this.props.intl.formatMessage(this.props.message) : this.props.value}
    </option>
    );
  }
}

ToggleOption.propTypes = {
  value: React.PropTypes.string.isRequired,
  message: React.PropTypes.object,
  intl: intlShape.isRequired,
};

export default injectIntl(ToggleOption);
