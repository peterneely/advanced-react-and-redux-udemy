import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signin extends Component {

  render() {
    const { handleSubmit, fields: { email, password } } = this.props;

    return (
      <form onSubmit={handleSubmit(this._handleSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email:</label>
          <input {...email} className="form-control"/>
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <input {...password} className="form-control"/>
        </fieldset>
        <button action="submit" className="btn btn-primary">Sign In</button>
      </form>
    );
  }

  _handleSubmit({ email, password }) {
    console.log(email, password);
    this.props.signinUser({ email, password });
  }
}

export default reduxForm(createOptions(), null, actions)(Signin);

function createOptions() {
  return {
    form: 'signin',
    fields: ['email', 'password']
  };
}
