import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class CommentBox extends Component {
  constructor(props) {
    super(props);

    this.state = { comment: '' };
  }

  render() {
    return (
      <form onSubmit={this._handleSubmit.bind(this)} className="comment-box">
      <h4>Add a comment</h4>
        <textarea value={this.state.comment} onChange={this._handleChange.bind(this)} />
        <div>
          <button>Submit Comment</button>
        </div>
      </form>
    );
  };

  _handleChange(event) {
    this.setState({ comment: event.target.value });
  }

  _handleSubmit(event) {
    event.preventDefault();
    this.props.saveComment(this.state.comment);
    this.setState({ comment: '' });
  }
}

export default connect(null, actions)(CommentBox);
