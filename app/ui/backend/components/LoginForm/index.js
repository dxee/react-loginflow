import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';

import LoadingButton from 'ui/share/components/LoadingButton';
import FormFieldWrapper from './FormFieldWrapper';
import FormSubmitWrapper from './FormSubmitWrapper';
import FormFieldIpt from './FormFieldIpt';
import FormFieldLbl from './FormFieldLbl';
import FormSubmitBtn from './FormSubmitBtn';

class LoginForm extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  submit = (event) => {
    event.preventDefault();
    this.props.onSubmit(
      this.props.data.get('username'),
      this.props.data.get('pwd'),
      this.props.locale
    );
    return false;
  }

  emitChange = (newFormState) => {
    this.props.changeForm(newFormState);
  }

  changeUsername = (event) => {
    this.emitChange({ username: event.target.value });
  }

  changePassword = (event) => {
    this.emitChange({ pwd: event.target.value });
  }

  render() {
    return (
      <form onSubmit={this.submit}>
        <FormFieldWrapper>
          <FormFieldIpt
            type="text"
            id="username"
            value={this.props.data.get('username')}
            placeholder={this.props.intl.formatMessage(this.props.messages.username)}
            onChange={this.changeUsername}
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
          <FormFieldLbl htmlFor="username">
            <FormattedMessage {...this.props.messages.username} />
          </FormFieldLbl>
        </FormFieldWrapper>
        <FormFieldWrapper>
          <FormFieldIpt
            id="password"
            type="password"
            value={this.props.data.get('password')}
            placeholder={this.props.intl.formatMessage(this.props.messages.pwd)}
            onChange={this.changePassword}
          />
          <FormFieldLbl htmlFor="password">
            <FormattedMessage {...this.props.messages.pwd} />
          </FormFieldLbl>
        </FormFieldWrapper>
        <FormSubmitWrapper>
          {this.props.currentlySending ? (
            <LoadingButton />
          ) : (
            <FormSubmitBtn type="submit">
              <FormattedMessage {...this.props.messages.login} />
            </FormSubmitBtn>
             )}
        </FormSubmitWrapper>
      </form>
    );
  }
}

LoginForm.propTypes = {
  locale: React.PropTypes.string,
  data: React.PropTypes.object,
  changeForm: React.PropTypes.func,
  onSubmit: React.PropTypes.func,
  currentlySending: React.PropTypes.bool,
  messages: React.PropTypes.object,
  intl: React.PropTypes.object,
};

export default injectIntl(LoginForm);
