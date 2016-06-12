import React, { Component } from 'react';

export default class CommentBox extends Component {
  constructor(props) {
    super(props);

    this.state = { comment: '' };
  }

  render() {
    return (
      <form onSubmit={this._handleSubmit.bind(this)} className="comment-box">
    		<textarea value={this.state.comment} onChange={this._handleChange.bind(this)} />
    		<button>Submit Comment</button>
    	</form>
    );
  };

  _handleChange(event) {
    this.setState({ comment: event.target.value });
  }

  _handleSubmit(event) {
    event.preventDefault();
    this.setState({ comment: '' });
  }
}
