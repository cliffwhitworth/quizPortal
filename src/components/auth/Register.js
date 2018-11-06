import React, { Component } from 'react'
// import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Register extends Component {
  onSubmit = formProps => (e) => {
    e.preventDefault();
    let formProps = { "email": e.target.Email.value, "password": e.target.Password.value };
    this.props.register(formProps, () => {
      this.props.history.push('/feature');
    });

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
    // <button>Sign Up!</button>
    // </form>
  };

  render () {
    return (
      <div className="jumbotron jumbotron-fluid mb-0">
          <div className="container">
              <h3>Register</h3>
              <div>&nbsp;</div>
              <form onSubmit={this.onSubmit()}>
                  <div>
                      <label htmlFor="firstName">First Name</label>
                      <input type="text" className="form-control col-lg-8 col-md-10 col-sm-12 col-xs-12" name="firstName" />
                  </div>
                  <div>
                      <label htmlFor="lastName">Last Name</label>
                      <input type="text" className="form-control col-lg-8 col-md-10 col-sm-12 col-xs-12" name="lastName" />
                  </div>
                  <div>
                      <label htmlFor="Email">Email</label>
                      <input type="text" className="form-control col-lg-8 col-md-10 col-sm-12 col-xs-12" name="Email" />
                  </div>
                  <div>
                      <label htmlFor="password">Password</label>
                      <input type="password" className="form-control col-lg-8 col-md-10 col-sm-12 col-xs-12" name="password"  />
                  </div>
                  <br />
                  <div className="form-group">
                      <div>{this.props.errorMessage}</div>
                      <button className="btn btn-primary">Register</button>
                      <Link to="/" className="btn btn-link">Cancel</Link>
                  </div>
              </form>
          </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.errorMessage };
}

export default compose(
  connect(mapStateToProps, actions)
)(Register);
