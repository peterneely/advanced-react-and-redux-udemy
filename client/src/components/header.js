import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Header extends Component {

  render() {
    return (
      <nav className="navbar navbar-light">
      	<Link to="/" className="navbar-brand">Redux Auth</Link>
				<ul className="nav navbar-nav">
					{this._renderLinks()}
				</ul>
			</nav>
    );
  }

  _renderLinks() {
    if (this.props.isAuthenticated) {
      return (
        <li className="nav-item">
	  			<Link className="nav-link" to="/signout">Sign Out</Link>
	  		</li>
      );
    } else {
      return ([
        <li className="nav-item" key={1}>
        	<Link className="nav-link" to="/signin">Sign In</Link>
        </li>,
        <li className="nav-item" key={2}>
        	<Link className="nav-link" to="/signup">Sign Up</Link>
        </li>
      ]);
    }
  }
}

export default connect(mapStateToProps)(Header);

function mapStateToProps(state) {
  return { isAuthenticated: state.auth.authenticated };
}
