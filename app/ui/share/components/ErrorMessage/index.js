import React from 'react';

import Wrapper from './Wrapper';
import P from './P';

class ErrorMessage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return this.props.error ? (
      <Wrapper>
        <P>
          {this.props.error.msg} [{this.props.error.code}]
        </P>
      </Wrapper>
    ) : (<div></div>);
  }
}

ErrorMessage.propTypes = {
  error: React.PropTypes.object,
};

export default ErrorMessage;
