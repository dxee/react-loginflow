import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectLocale, selectLocaleLoadedModules, selectSptLocales } from 'store/selectors/intl';
import { localeChange } from 'store/actions/intl';

import Toggle from 'ui/share/components/Toggle';
import Wrapper from './Wrapper';
import messages from './messages';

class LocaleToggle extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  onLocaleToggle = (locale) => {
    this.props.dispatch(localeChange(locale, this.props.localeModules));
  }

  render() {
    return (
      <Wrapper>
        <Toggle value={this.props.locale} values={this.props.sptLocales} messages={messages} onToggle={this.onLocaleToggle} />
      </Wrapper>
    );
  }
}

LocaleToggle.propTypes = {
  locale: React.PropTypes.string,
  localeModules: React.PropTypes.string,
  sptLocales: React.PropTypes.array,
  dispatch: React.PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  locale: selectLocale(),
  localeModules: selectLocaleLoadedModules(),
  sptLocales: selectSptLocales(),
});

export function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LocaleToggle);
