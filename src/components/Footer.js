import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
// import { Nav, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink } from 'reactstrap';
import * as actions from '../actions';

class Footer extends Component {

  componentDidMount() {
    // console.log(this.props);
    // this.props.getUserInfo();
  }

  render() {
    return (
      <div className="footer-copyright text-center bg-dark py-3 text-white">© 2018 Copyright
      <a href="/"> CIPRA</a>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default compose(
  connect(mapStateToProps, actions)
)(Footer);
