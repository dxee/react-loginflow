import React from 'react';

import Wrapper from './Wrapper';

class Auth extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Wrapper>
        {this.props.children}
      </Wrapper>
    );
  }
}

Auth.propTypes = {
  children: React.PropTypes.element.isRequired,
};

export default Auth;
