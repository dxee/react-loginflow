import React from 'react';

import LoadingButton from 'ui/share/components/LoadingButton';
import LocaleToggle from 'ui/backend/containers/LocaleToggle';
import Wrapper from './Wrapper';
import NavWrapper from './NavWrapper';
import NavLogoWrapper from './NavLogoWrapper';
import LinkBtnNav from './LinkBtnNav';
import BtnNav from './BtnNav';
import H1Logo from './H1Logo';
import { FormattedMessage } from 'react-intl';

class Nav extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  logout = (evt) => {
    evt.preventDefault();
    this.props.logout(this.props.token, this.props.locale);
    return false;
  }

  render() {
    const loginUrl = `/login/${this.props.locale}`;
    const navButtons = this.props.loggedIn ? (
      <div>
        {
          this.props.currentlySending ? (<LoadingButton />) : (<BtnNav href="#" onClick={this.logout}><FormattedMessage {...this.props.messages.logout} />&nbsp;[{this.props.user ? this.props.user.username : ''}]</BtnNav>)
        }
      </div>
      ) : (
        <div>
          <LinkBtnNav to={loginUrl}><FormattedMessage {...this.props.messages.login} /></LinkBtnNav>
        </div>
      );

    return (
      <Wrapper>
        <NavWrapper>
          <NavLogoWrapper to="/"><H1Logo><FormattedMessage {...this.props.messages.appname} /></H1Logo></NavLogoWrapper>
          <div>
            <LocaleToggle />
          </div>
          { navButtons }
        </NavWrapper>
      </Wrapper>
    );
  }
}

Nav.propTypes = {
  locale: React.PropTypes.string,
  loggedIn: React.PropTypes.bool,
  user: React.PropTypes.object,
  currentlySending: React.PropTypes.bool,
  token: React.PropTypes.string,
  logout: React.PropTypes.func,
  messages: React.PropTypes.object,
};

export default Nav;
