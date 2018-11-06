import React, { Component } from 'react';
// import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signin extends Component {

  componentDidMount() {
    // console.log(this.props);
  }

  onSubmit = formProps => e => {
    e.preventDefault();
    let formProps = { "Username": e.target.username.value, "Password": e.target.password.value };
    this.props.signin(formProps, () => {
      this.props.history.push('/dashboard');
    });
  };

  render() {

    // <form onSubmit={this.onSubmit()}>
    // <fieldset>
    //   <label>Email: <br />
    //   <input type="text" name="Email" />
    //   </label>
    // </fieldset>
    // <fieldset>
    //   <label>Password: <br />
    //   <input type="password" name="Password" />
    //   </label>
    // </fieldset>
    // <div>{this.props.errorMessage}</div>
    // <button>Sign In!</button>
    // </form>

    return (
          <div className="jumbotron jumbotron-fluid mb-0">
              <div className="container">
                  <h3>Sign In</h3>
                  <div>&nbsp;</div>
                  <form name="form" onSubmit={this.onSubmit()}>
                      <div>
                          <label htmlFor="username">Email / Username</label>
                          <input type="text" className="form-control col-lg-8 col-md-10 col-sm-12 col-xs-12" name="username" />

                      </div>
                      <div>
                          <label htmlFor="password">Password</label>
                          <input type="password" className="form-control col-lg-8 col-md-10 col-sm-12 col-xs-12" name="password"  />
                      </div>
                      <br />
                      <div className="form-group">
                          <div>{this.props.errorMessage}</div>
                          <button className="btn btn-primary">Sign In</button>
                          <Link to="/register" className="btn btn-link">Register</Link>
                      </div>
                  </form>
              </div>
          </div>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.errorMessage };
}

export default compose(
  connect(mapStateToProps, actions)
)(Signin);
