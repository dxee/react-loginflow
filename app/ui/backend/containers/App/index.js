import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import API from 'store/api/consts';
import { areRequestsPending } from 'store/selectors';
import { isLogged, selectUser, selectToken } from 'store/selectors/auth';
import { logout } from 'store/actions/auth';
import { localeChange } from 'store/actions/intl';
import { isIntlLoaded, selectLocale } from 'store/selectors/intl';

import ROT from 'ui/routes/consts';
import Nav from 'ui/backend/components/Nav';
import messages from './messages';
import Wrapper from './Wrapper';

class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    if (this.props.locale && !this.props.intlLoaded) {
      this.props.dispatch(localeChange(this.props.locale, ROT.MD.HOME));
    }
  }

  render() {
    return (
      <Wrapper>
        <Nav locale={this.props.locale} messages={messages} loggedIn={this.props.loggedIn} user={this.props.user} currentlySending={this.props.currentlySending} token={this.props.token} logout={this.props.logout} />
        {React.Children.toArray(this.props.children)}
      </Wrapper>
    );
  }
}

App.propTypes = {
  locale: React.PropTypes.string,
  loggedIn: React.PropTypes.bool,
  intlLoaded: React.PropTypes.bool,
  user: React.PropTypes.object,
  currentlySending: React.PropTypes.bool,
  token: React.PropTypes.string,
  logout: React.PropTypes.func,
  children: React.PropTypes.element.isRequired,
  dispatch: React.PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    logout: (token, locale) => dispatch(logout(token, locale)),

    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  locale: selectLocale(),
  loggedIn: isLogged(),
  user: selectUser(),
  currentlySending: areRequestsPending(API.REQKEY.GETLOCALE),
  token: selectToken(),
  intlLoaded: isIntlLoaded(ROT.MD.HOME),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(App);
