import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';

import { selectLocale, selectMsgs, selectKey } from 'store/selectors/intl';

export class LanProvider extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    addLocaleData(en);
    addLocaleData(zh);
  }
  render() {
    return (
      <IntlProvider locale={this.props.locale} key={this.props.key} messages={this.props.msgs} >
        {React.Children.only(this.props.children)}
      </IntlProvider>
    );
  }
}

LanProvider.propTypes = {
  locale: React.PropTypes.string,
  key: React.PropTypes.string,
  msgs: React.PropTypes.object,
  children: React.PropTypes.element.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  locale: selectLocale(),
  key: selectKey(),
  msgs: selectMsgs(),
});

export default connect(mapStateToProps, mapDispatchToProps)(LanProvider);

