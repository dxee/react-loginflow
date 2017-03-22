import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';

import APICONSTS from 'store/api/consts';
import { areRequestsPending } from 'store/selectors';
import { selectLoginForm } from 'store/selectors/auth';
import { init } from 'store/actions/app';
import { changeLoginForm, login } from 'store/actions/auth';
import { localeChange } from 'store/actions/intl';
import { isIntlLoaded, selectLocale } from 'store/selectors/intl';

import ROT from 'ui/routes/consts';
import LoginForm from '../../components/LoginForm';
import ErrorMessage from 'ui/share/components/ErrorMessage';
import messages from './messages';
import Wrapper from './Wrapper';
import From from './Form';
import FormHeander from './FormHeader';
import FormHeanding from './FormHeading';

class Login extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    if (this.props.params.locale && this.props.params.locale !== this.props.locale && !this.props.intlLoaded) {
      this.props.dispatch(localeChange(this.props.params.locale, ROT.MD.LOGIN));
    }
    this.props.dispatch(init());
  }

  render() {
    const error = this.props.data.get('error');
    return (
      <Wrapper>
        <From>
          <FormHeander>
            <FormHeanding><FormattedMessage {...messages.login} /></FormHeanding>
            {error ? (<ErrorMessage error={error} />) : ''}
          </FormHeander>
          {/* While the form is sending, show the loading indicator,
            otherwise show "Log in" on the submit button */}
          <LoginForm locale={this.props.locale} messages={messages} currentlySending={this.props.currentlySending} data={this.props.data} changeForm={this.props.changeLoginForm} onSubmit={this.props.onSubmit} />
        </From>
      </Wrapper>
    );
  }
}

Login.propTypes = {
  locale: React.PropTypes.string,
  params: React.PropTypes.object,
  data: React.PropTypes.object,
  currentlySending: React.PropTypes.bool,
  changeLoginForm: React.PropTypes.func,
  onSubmit: React.PropTypes.func,
  intlLoaded: React.PropTypes.bool,
  dispatch: React.PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    changeLoginForm: (data) => dispatch(changeLoginForm(data)),
    onSubmit: (username, pwd, locale) => dispatch(login(username, pwd, locale)),
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  locale: selectLocale(),
  currentlySending: areRequestsPending(APICONSTS.REQKEY.LOGIN),
  data: selectLoginForm(),
  intlLoaded: isIntlLoaded(ROT.MD.LOGIN),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
