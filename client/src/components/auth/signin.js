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
          <input {...password} type="password" className="form-control"/>
        </fieldset>
        {this._renderAlert()}
        <button action="submit" className="btn btn-primary">Sign In</button>
      </form>
    );
  }

  _handleSubmit({ email, password }) {
    this.props.signinUser({ email, password });
  }

  _renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }
}

export default reduxForm(createOptions(), mapStateToProps, actions)(Signin);

function createOptions() {
  return {
    form: 'signin',
    fields: ['email', 'password']
  };
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}
