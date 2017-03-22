import React from 'react';

import LoadingIndicator from '../LoadingIndicator';
import LoadingBtn from './LoadingBtn';

class LoadingButton extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <LoadingBtn href="#" disabled="true">
        <LoadingIndicator />
      </LoadingBtn>
    );
  }
}

export default LoadingButton;
