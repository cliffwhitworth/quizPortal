import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signout extends Component {
  componentDidMount() {
    this.props.signout();
  }

  render() {
    return (
        <div className="jumbotron jumbotron-fluid mb-0">
          <div className="container">
            <h3>Signed Out!</h3>
            <p>Sorry to see you go.
            <Link to="/signin" className="btn btn-link">Sign In</Link>
            </p>
          </div>
        </div>
    );
  }
}

export default connect(null, actions)(Signout);
