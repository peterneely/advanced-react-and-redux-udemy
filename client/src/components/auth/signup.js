import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {

  render() {
    const { handleSubmit, fields: { email, password, passwordConfirm } } = this.props;
    return (
      <form>
      	{this._renderField({...email, label: 'Email'})}
      	{this._renderField({...password, label: 'Password'})}
      	{this._renderField({...passwordConfirm, label: 'Confirm Password'})}
      	<button className="btn btn-primary">Sign up!</button>
      </form>
    );
  }

  _renderField(field) {
    return (
      <fieldset className="form-group">
    		<label>{`${field.label}:`}</label>
    		<input className="form-control" {...field} />
    		{field.touched && field.error && <div className="error">{field.error}</div>}
    	</fieldset>
    );
  }
}

export default reduxForm(createOptions(), null, actions)(Signup);

function createOptions() {
  return {
    form: 'signup',
    fields: ['email', 'password', 'passwordConfirm'],
    validate
  };

  function validate(formProps) {
    const errors = {};
    if (!formProps.email) errors.email = 'Please enter an email';
    if (!formProps.password) errors.password = 'Please enter a password';
    if (!formProps.passwordConfirm) errors.passwordConfirm = 'Please confirm your password';
    if (formProps.password != formProps.passwordConfirm) errors.password = 'Passwords must match';
    return errors;
  }
}
