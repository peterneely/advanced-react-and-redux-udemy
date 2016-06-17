import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-light">
				<ul className="nav navbar-nav">
					<li className="nav-item">
						<Link to="/">Home</Link>
					</li>
					<li className="nav-item">
						<Link to="/resources">Resources</Link>
					</li>
					<li className="nav-item">
						{this._authButton()}
					</li>
				</ul>
			</nav>
    );
  };

  _authButton() {
    return (<button>Sign In</button>);
  };
}
